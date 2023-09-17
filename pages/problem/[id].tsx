import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import problemPic from 'public/problem_01.png';
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
  message: string;
  choices: string[];
  optionType: string;
  isExecutable: boolean;
  instanceSource: string;
  sourceCode: string;
  prevCode: string;
  prevViewCode: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  const { props } = await getProblemData(context, id);
  return { props };
};

export default function ProblemOne(data: any): NextPage {

  const [userName, setUserName] = useState('anonymous');
  const [prevCode, setPrevCode] = useState("");
  const [prevViewCode, setPrevViewCode] = useState("");
  const problemText: string = data.problem;
  const tabIndex: number = data.tabIndex;
  const instanceSource: string = data.instanceSource;
  const isExecutable: boolean = data.isExecutable;
  const problemId = data.id;
  const viewWidth = data.viewWidth;
  const viewHeight = data.viewHeight;

  const problemData: ProblemData = {
    problemState: data.problemState,
    message: data.message,
    choices: [...data.choices],
    optionType: data.optionType,
    isExecutable: data.isExecutable,
    instanceSource: instanceSource,
    sourceCode: data.sourceCode,
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


  const handleClick = async (choiceText: string, optionType: string, problemState: string) => {
    if (isExecutable) setPrevCode(instanceSource);
    setPrevViewCode(data.sourceCode);
    updateSessionStorage(choiceText, optionType);
    const userActionData = {
      'state': problemState,
      'action': choiceText,
      'actionType': optionType,
    };
    //await postData(userActionData);
    postData(userActionData);
  };

  const onSelect = (tabIndex: number) => {
    const tabSelectData = {
      'state': data.problemState,
      'action': 'tabSelect',
      'actionType': '',
    };
    if (tabIndex === 0) {
      tabSelectData.actionType = 'SolutionTab';
    } else if (tabIndex ===1) {
      tabSelectData.actionType = 'ProblemTab';
    } else if (tabIndex ===2) {
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
              problemId={problemId}
              canvasWidth={viewWidth}
              canvasHeight={viewHeight}
              problemText={problemText} 
            />
            
          </TabPanel>

          <TabPanel>
            <HistoryTab />
          </TabPanel>
        </Tabs>

        <TransitionButtons />
      </main>
  );
}
