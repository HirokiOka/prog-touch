import * as fs from 'fs';
import * as path from 'path';
import Link from 'next/link';
import Image from 'next/image';
//import p5Types from 'p5';
import { GetServerSideProps } from 'next';
import problemPic from 'public/sec2_2.png';
//import Sketch from 'components/Sketch';
//import CodePane from 'components/CodePane';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let problemState = 'start';
  if (context.query.problemState !== undefined) {
    problemState = context.query.problemState;
  }

  const dataPath = path.join(process.cwd(), 'public', 'data', 'problem01_v2.json');
  const jsonData = fs.readFileSync(dataPath).toString();
  const data = JSON.parse(jsonData);
  const problemData = data[problemState];

  return {
    props : {
      problem: data.problem,
      choices: problemData.choices,
    },
  };
};

export default function ProblemOne(data: any) {
  const sourceCode =  data.sourceCode;
  const handleClick = () => {
    history.back();
  };


  return (
      <main className="font-mono px-6 text-sm lg:text-base">
        <Tabs>
          <TabList>
            <Tab>Code</Tab>
            <Tab>Problem</Tab>
          </TabList>

          <TabPanel>
            <p>出力: </p>

            {/*
            <div className="md:w-2/3 mt-2">
              <p className="bg-yellow-300 rounded p-2">[質問]: {data.question}</p>
            </div>
            */}
            <ul className="m-2 list-decimal list-inside">方針:
              {data.choices.map((c: any, i: number) => {
                return (
                  <li key={i}><Link href={`/problem-01-v2/?problemState=${c.next}`} className="text-blue-500 hover:underline text-sm">{c.text}</Link></li>
                );
              })}
            </ul>
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
                  {/* <SketchComponent  /> */}
                </div>
              </div>
            </div>

          </TabPanel>
        </Tabs>


        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-1 rounded" onClick={handleClick}>一手戻る</button>
        <button className="m-1 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link href="/">問題一覧へ</Link></button>

      </main>
  );
}
