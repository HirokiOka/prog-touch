import Link from 'next/link';
import Image from 'next/image';
import p5Types from 'p5';
import { GetServerSideProps } from 'next';
import problemPic from 'public/problem_03.png';
import Sketch from 'components/Sketch';
import CodePane from 'components/CodePane';
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getProblemData } from '../../utils/getProblemData';


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const width = 400;
  const height = 400;
  const { props } = await getProblemData(context, 'problem_03.json', width, height);
  return { props };
};

export default function ProblemThree(data: any) {
  const [prevCode, setPrevCode] = useState("");
  const optionType = data.optionType;
  const sourceCode =  data.sourceCode;
  const instanceSource = data.instanceSource;
  const documentUrl = data.documentUrl;
  const suggestion = data.suggestion;
  let message = data.message;
  const tabIndex = data.tabIndex;
  const isExecutable = data.isExecutable;

  const handleClick = () => {
    history.back();
  };
  const onProgress = () => {
    if (isExecutable) setPrevCode(instanceSource);
  };

  const targetCode = isExecutable ? instanceSource : prevCode;

  let errorMessage: string = '';
  const s = (p5: p5Types, canvasParentRef: Element) => {
    try {
      if (isExecutable) {
        eval(instanceSource);
      } else {
        eval(prevCode);
      }
    } catch (e: any) {
      errorMessage = e.toString();
      message += '\n' + errorMessage;
      eval(targetCode);
    }
  };
  const d = (p5: p5Types) => {
  };

  const SketchComponent = () => {
    return (
      <Sketch
        setup={s}
        draw={d}
      />
    );
  }


  return (
      <main className="px-6 text-sm lg:text-base">
        <Tabs defaultIndex={tabIndex}>
          <TabList>
            <Tab>Code</Tab>
            <Tab>Problem</Tab>
            <Tab>Document</Tab>
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
                return (
                <li key={i} className="mt-2 mb-4">
                {optionType === 'policy' ? (
                  <Link href={`/problem-03/?problemState=${c.next}`} onClick={onProgress}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full text-sm">{i+1}: {c.text}
                  </Link>
                    ) : (
                  <Link href={`/problem-03/?problemState=${c.next}`} onClick={onProgress}
                      className="bg-purple-500 hover:bg-purple-700 text-white font-sans py-1 px-4 rounded-full text-sm">{i+1}: {c.text}
                  </Link>
                    )}
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
                  alt="Image of problem (Section2-q2)"
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
        </Tabs>


        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-1 rounded" onClick={handleClick}>一手戻る</button>
        <button className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link href="/">問題一覧へ</Link></button>

      </main>
  );
}
