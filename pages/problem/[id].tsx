import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getProblemData } from 'utils/getProblemData';
import HistoryTab from 'components/HistoryTab';
import TaskTab from 'components/TaskTab';
import TransitionButtons from 'components/TransitionButtons';
import { postData } from  'utils/postData';

type ProblemData = {
  problemState: string;
  problemId: string;
  message: string;
  choices: string[];
  optionType: string;
  isExecutable: boolean;
  instancedSetup: string;
  instancedDraw: string;
  setupFunction: string;
  drawFunction: string;
  prevCode: string;
  prevViewCode: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  const { props } = await getProblemData(context, id);
  return { props };
};

export default function ProblemOne(data: any) {
  console.log(data);

  const [userName, setUserName] = useState('anonymous');
  const [prevCode, setPrevCode] = useState("");
  const [prevViewCode, setPrevViewCode] = useState("");
  const problemText: string = data.problem;
  const problemId: string = data.problemId;
  const instancedSetup: string = data.instancedSetup;
  const instancedDraw: string = data.instancedDraw;
  const isExecutable: boolean = data.isExecutable;
  const problemNumber = data.id;
  const viewWidth = data.viewWidth;
  const viewHeight = data.viewHeight;

  const problemData: ProblemData = {
    problemState: data.problemState,
    problemId: data.problemId,
    message: data.message,
    choices: [...data.choices],
    optionType: data.optionType,
    isExecutable: isExecutable,
    instancedSetup: instancedSetup,
    instancedDraw: instancedDraw,
    setupFunction: data.setupFunction,
    drawFunction: data.drawFunction,
    prevCode: prevCode,
    prevViewCode: prevViewCode,
  };

  function updateSessionStorage(choiceText: string, optionType: string) {
    if (typeof sessionStorage !== 'undefined' &&
      (Object.values(sessionStorage).includes(choiceText) === false)) {
      const policyData = {
        "type": optionType,
        "choice": choiceText,
      };
      sessionStorage.setItem(sessionStorage.length.toString(), JSON.stringify(policyData));
    }
  }

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) setUserName(storedUserName);
    }
  }, []);


  const handleClick = async (
    choiceText: string,
    optionType: string,
    problemState: string,
    problemId: string
  ) => {
    if (isExecutable) setPrevCode(instancedSetup);
    setPrevViewCode(data.setupFunction);
    updateSessionStorage(choiceText, optionType);
    const userActionData = {
      'state': problemState,
      'action': choiceText,
      'actionType': optionType,
      'problemId': problemId
    };
    postData(userActionData);
  };

  const onSelect = (tabIndex: number) => {
    const tabSelectData = {
      'state': data.problemState,
      'action': 'tabSelect',
      'actionType': '',
      'problemId': problemId
    };
    if (tabIndex === 0) {
      tabSelectData.actionType = 'SolutionTab';
    } else if (tabIndex ===1) {
      tabSelectData.actionType = 'HistoryTab';
    }
    postData(tabSelectData);
  };

  return (
      <main className="px-6 text-sm lg:text-base">
        <p suppressHydrationWarning={true} className="m-1">ユーザ名: {userName}</p>
        <Tabs onSelect={onSelect}>
          <TabList>
            <Tab>解答</Tab>
            <Tab>履歴</Tab>
          </TabList>

          <TabPanel>
            <TaskTab
              problemData={problemData}
              onClick={handleClick}
              problemNumber={problemNumber}
              canvasWidth={viewWidth}
              canvasHeight={viewHeight}
              problemText={problemText} 
            />
          </TabPanel>

          <TabPanel>
            <HistoryTab />
          </TabPanel>
        </Tabs>

        <TransitionButtons
          problemId={problemId}
        />
      </main>
  );
}
