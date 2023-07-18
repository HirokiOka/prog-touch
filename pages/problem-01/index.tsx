import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import p5Types from 'p5';
import problemPic from 'public/problem_01.png';
import Sketch from 'components/Sketch';
import CodePane from 'components/CodePane';
import React, { useState, SyntheticEvent } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getProblemData } from '../../utils/getProblemData';


//よくない感
function getCurrentTimestamp(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const width = 160;
  const height = 120;
  const { props } = await getProblemData(context, 'problem_01.json', width, height);
  return { props };
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
                      onClick={async () => { 
                        if (isExecutable) setPrevCode(instanceSource);
                        if (optionType === 'policy' && typeof sessionStorage !== "undefined" &&
                          (Object.values(sessionStorage).includes(choiceText) === false)) {
                          sessionStorage.setItem(sessionStorage.length.toString(), `${choiceText}`);
                          const curretDate = getCurrentTimestamp();
                          const userName = 'test';
                          const bodyData = {
                            'userName': userName,
                            'clickedTime': curretDate,
                            'choice': choiceText
                          };
                          const res = await fetch('/api/click',{
                            method: 'POST',
                            body: JSON.stringify(bodyData)
                            });
                          const data = await res.json();
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
                  width="160"
                  height="120"
                  alt="Image of problem 01"
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
            {typeof sessionStorage !== "undefined" ?
              <ol className="list-decimal list-inside">
                {Object.entries(sessionStorage).sort((a: any, b: any) => a[0] - b[0]).map((e, i) =>  {
                  return (
                      <li key={i} className="text-white m-2 py-1 px-4 rounded-full bg-yellow-500 w-1/2">{e[1]}</li>
                  );
                })}
            </ol>
            : ''}
          </TabPanel>
        </Tabs>


        <button 
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-1 rounded"
          onClick={() => {
            if (sessionStorage.length !== 0) {
              const delIndex = sessionStorage.length - 1;
              sessionStorage.removeItem(delIndex.toString());
            }
            history.back();
          }}>
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
