import * as fs from 'fs';
import * as path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import p5Types from 'p5';
import { GetServerSideProps } from 'next';
import problemPic from 'public/problem_01.png';
import Sketch from 'components/Sketch';
import CodePane from 'components/CodePane';
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { parseScript } from 'esprima';
import { replace } from 'estraverse';
import { generate } from 'escodegen';

const replacedNode = {
  "type": "ExpressionStatement",
  "expression": {
    "type": "CallExpression",
    "callee": {
      "type": "MemberExpression",
      "computed": false,
      "object": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "p5.createCanvas"
        },
        "arguments": [
          {
            "type": "Literal",
            "value": 160,
            "raw": "160"
          },
          {
            "type": "Literal",
            "value": 120,
            "raw": "120"
          }
        ]
      },
      "property": {
        "type": "Identifier",
        "name": "parent"
      }
    },
    "arguments": [
      {
        "type": "Identifier",
        "name": "canvasParentRef"
      }
    ]
  }
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let problemState = 'start';
  if (context.query.problemState !== undefined) {
    problemState = context.query.problemState;
  }

  const problemDataPath = path.join(process.cwd(), 'public', 'data', 'problem_01.json');
  const p5MethodsPath = path.join(process.cwd(), 'public', 'data', 'p5_methods.json');

  const p5Methods = JSON.parse(fs.readFileSync(p5MethodsPath).toString());
  const problemData = JSON.parse(fs.readFileSync(problemDataPath).toString());
  const problemDataContent = problemData[problemState];

  const sourceCode = problemDataContent.sourceCode;
  const ast: any = parseScript(sourceCode);

  replace(ast, {
    enter: function(node: any) {
      if (node.type === 'CallExpression') {
        const functionName = node.callee.name;
        if (p5Methods.includes(functionName)) node.callee.name = 'p5.' + functionName;
        return node;
      } else if (node.type === 'ExpressionStatement' && node.expression.callee.name === 'createCanvas') {
        return replacedNode;
      }
    }
  });

  ast.body = ast.body[0].body.body;

  const instanceSource: string = ast !== '' ? generate(ast) : '';
  const documentUrl = problemDataContent.documentUrl ?? ''; 
  const suggestion = problemDataContent.suggestion ?? '';
  const message = problemDataContent.message ?? '';
  const tabIndex = problemDataContent.tabIndex ?? 0;
  const isExecutable = problemDataContent.isExecutable ?? true;

  return {
    props : {
      problem: problemData.problem,
      optionType: problemDataContent.optionType,
      suggestion: suggestion,
      isExecutable: isExecutable,
      documentUrl: documentUrl,
      sourceCode: sourceCode,
      message: message,
      tabIndex: tabIndex,
      instanceSource: instanceSource,
      choices: problemDataContent.choices,
    },
  };
};


export default function ProblemOne(data: any) {

  const [prevCode, setPrevCode] = useState("");
  const optionType = data.optionType;
  const sourceCode =  data.sourceCode;
  const instanceSource = data.instanceSource;
  const documentUrl = data.documentUrl;
  const suggestion = data.suggestion;
  let message = data.message;
  const tabIndex = data.tabIndex;
  const isExecutable = data.isExecutable;
  const choicedText = '';


  const handleClick = () => {
    history.back();
  };

  const targetCode = isExecutable ? instanceSource : prevCode;

  let errorMessage: string = '';
  const s = (p5: p5Types, canvasParentRef: Element) => {
    const width = 160;
    const height = 120;
    try {
      eval(instanceSource);
    } catch (e: any) {
      errorMessage = e.toString();
      message += '\n' + errorMessage;
      eval(targetCode);
    }
  };
  const d = (p5: p5Types) => {
  };

  const SketchComponent = React.memo(function SketchMemo() {
    return (
      <Sketch
        setup={s}
        draw={d}
      />
    );
  });


  return (
      <main className="px-6 text-sm lg:text-base">
        <Tabs defaultIndex={tabIndex}>
          <TabList>
            <Tab>Code</Tab>
            <Tab>Problem</Tab>
            <Tab>Document</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanel>

            {message ? 
              <p className="rounded bg-red-100 p-2 w-2/3">{message}</p>
              : ''}
            {suggestion ? 
              <p className="rounded bg-blue-100 p-2">Q. {suggestion}</p>
              : ''}

            <ul className="m-1 p-1 list-inside list-none">  
              {data.choices.map((c: any, i: number) => {
                const choiceText: string = c.text;
                const choiceNext: string = c.next;
                const linkClass = optionType === 'policy' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-purple-500 hover:bg-purple-700 text-white font-sans';
                
                return (
                  <li key={i} className="mt-2 mb-4">
                    <Link 
                      href={`/problem-01/?problemState=${choiceNext}`} 
                      onClick={() => { 
                        if (isExecutable) setPrevCode(instanceSource);
                        if (optionType === 'policy' && sessionStorage != null &&
                          (Object.values(sessionStorage).includes(choiceText) === false)) {
                          sessionStorage.setItem(sessionStorage.length.toString(), `${choiceText}`);
                          console.log(sessionStorage);
                          }
                        }}
                      className={`${linkClass} text-white py-1 px-4 rounded-full text-sm`}>
                      {i+1}: {choiceText}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="p-2 rounded border border-gray-500">
              <p>出力: </p>
              <SketchComponent />
              <CodePane code={sourceCode} diffLines={[]} />
            </div>


          </TabPanel>

          <TabPanel>
            <div className="md:w-2/3">
              <p className="bg-gray-300 rounded p-2 my-2">[問題]: {data.problem}</p>
              <div className="grid grid-cols-2 md:grid-cols-4">
                <div>
                <p>正解：</p>
                <Image
                  src={problemPic}
                  alt="Image of problem (Section2-2)"
                />
                </div>
                <div>
                  <p>出力: </p>
                  <SketchComponent />
                </div>
              </div>
            </div>

          </TabPanel>

          <TabPanel>
            {documentUrl ? 
              <iframe id="inlineFrameExample"
                title="p5 document"
                width="320"
                height="480"
                src={documentUrl}>
              </iframe>
              : ''}
          </TabPanel>

          <TabPanel>
            <ol className="list-decimal list-inside">
              {Object.entries(sessionStorage).sort((a: any, b: any) => a[0] - b[0]).map((e, i) =>  {
                return (
                    <li key={i} className="text-white m-2 py-1 px-4 rounded-full bg-yellow-500 w-1/2">{e[1]}</li>
                );
              })}
            </ol>
          </TabPanel>
        </Tabs>


        <button 
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-1 rounded"
          onClick={handleClick}>
          一手戻る
        </button>
        <button
          className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/" onClick={() => { sessionStorage.clear(); }}>
            問題一覧へ
            </Link>
        </button>

      </main>
  );
}
