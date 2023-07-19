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

type SourceProps = {
  instanceSource: string;
  targetCode: string;
};

type ProblemInfo = {
  problemText: string;
  instanceSource: string;
};


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const width = 160;
  const height = 120;
  const { props } = await getProblemData(context, 'problem_01.json', width, height);
  return { props };
};

const SketchComponent = React.memo<SourceProps>(({ instanceSource, targetCode }) => {
  const s = (p5: p5Types, canvasParentRef: Element) => {
    const width = 160;
    const height = 120;
    try {
      eval(instanceSource);
    } catch (e: any) {
      eval(targetCode);
    }
  };
  const d = (p5: p5Types) => {
  };
  return (
    <Sketch
      setup={s}
      draw={d}
    />
  );
});


const ProblemTab: React.FC<ProblemInfo> = ({ problemText, instanceSource }) => {
  return (
    <div className="md:w-2/3">
      <p className="bg-gray-300 rounded p-2 my-2">[問題]: {problemText}</p>
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
          <SketchComponent
            instanceSource={instanceSource}
            targetCode={instanceSource}
          />
        </div>
      </div>
    </div>
  );
};

const DocumentTab: React.FC<{ documentUrl: string }> = ({ documentUrl }) => {
  return (
    <>
      {documentUrl ? 
        <iframe id="inlineFrameExample"
          title="p5 document"
          width="320"
          height="480"
          src={documentUrl}>
        </iframe>
        : ''}
      </>
    );
};

const HistoryTab = () => {
  return (
    <>
      {typeof sessionStorage !== undefined ?
        <ol className="list-decimal list-inside">
          {Object.entries(sessionStorage).sort((a: any, b: any) => a[0] - b[0]).map((e, i) =>  {
            const policyData = JSON.parse(e[1]);
            const policyText = policyData['choice'];
            const policyType = policyData['type'];
            const classType = (policyType === 'policy') ? 'bg-blue-500 hover:bg-blue-700' : 'bg-purple-500 hover:bg-purple-700 text-white font-sans';
            return (
                <li key={i} className={`${classType} text-white my-1 py-1 px-4 rounded-full text-sm w-1/2`}>
                  {policyData['choice']}
                </li>
            );
          })}
        </ol>
      : ''}
      </>
    );
};

const TransitionButtons = () => {
  return (
    <>
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
    </>
  );
};

interface ProblemProps {
  problemData: {
    message: string;
    suggestion: string;
    choices: string[];
    optionType: string;
    isExecutable: boolean;
    instanceSource: string;
    sourceCode: string;
    targetCode: string;
  },
  onClick: (choiceText: string, optionType: string) => void;
}

const SolutionTab: React.FC<ProblemProps> =  ({ problemData, onClick }) => {
  return (
    <>
      {problemData.message ? 
        <p className="rounded bg-red-100 p-2 w-2/3">{problemData.message}</p>
        : ''}
      {problemData.suggestion ? 
        <p className="rounded bg-blue-100 p-2">Q. {problemData.suggestion}</p>
        : ''}

      <ul className="m-1 p-1 list-inside list-none">  
        {problemData.choices.map((c, i) => {
          const choiceNext: string =  c.next;
          const choiceText: string =  c.text;
          const linkClass = problemData.optionType === 'policy' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-purple-500 hover:bg-purple-700 text-white font-sans';
          return (
            <li key={i} className="mt-2 mb-4">
              <Link 
                href={`/problem-01/?problemState=${choiceNext}`} 
                onClick={() => onClick(choiceText, problemData.optionType)}
                className={`${linkClass} text-white py-1 px-4 rounded-full text-sm`}>
                {i+1}: {choiceText}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-2 rounded border border-gray-500">
        <p>出力: </p>
        <SketchComponent
          instanceSource={problemData.instanceSource}
          targetCode={problemData.targetCode}
        />
        <CodePane code={problemData.sourceCode} diffLines={[]} />
      </div>
    </>
  );
};

export default function ProblemOne(data: any) {
  const [prevCode, setPrevCode] = useState("");
  const problemText: string = data.problem;
  const documentUrl: string = data.documentUrl;
  const tabIndex = data.tabIndex;
  const instanceSource = data.instanceSource;
  const isExecutable = data.isExecutable;

  const targetCode = data.isExecutable ? instanceSource : prevCode;

  const problemData = {
    message: data.message,
    suggestion: data.suggestion,
    choices: [...data.choices],
    optionType: data.optionType,
    isExecutable: data.isExecutable,
    instanceSource: instanceSource,
    sourceCode: data.sourceCode,
    targetCode: targetCode
  };

  const handleClick = async (choiceText: string, optionType: string) => {
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

    if (isExecutable) setPrevCode(instanceSource);
    if (typeof sessionStorage !== undefined &&
      (Object.values(sessionStorage).includes(choiceText) === false)) {
      const policyData = {
        "type": optionType,
        "choice": choiceText,
      };
      sessionStorage.setItem(sessionStorage.length.toString(), JSON.stringify(policyData));

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
  };

  return (
      <main className="px-6 text-sm lg:text-base">
        <Tabs defaultIndex={tabIndex}>
          <TabList>
            <Tab>解答</Tab>
            <Tab>問題</Tab>
            <Tab>ドキュメント</Tab>
            <Tab>履歴</Tab>
          </TabList>

          <TabPanel>
            <SolutionTab problemData={problemData} onClick={handleClick} />
          </TabPanel>

          <TabPanel>
            <ProblemTab problemText={problemText} instanceSource={instanceSource} />
          </TabPanel>

          <TabPanel>
            <DocumentTab documentUrl={documentUrl}/>
          </TabPanel>

          <TabPanel>
            <HistoryTab />
          </TabPanel>
        </Tabs>

        <TransitionButtons />

      </main>
  );
}
