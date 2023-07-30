import { GetServerSideProps } from 'next';
import problemPic from 'public/problem_02.png';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getProblemData } from 'utils/getProblemData';
import ProblemTab from 'components/ProblemTab';
import DocumentTab from 'components/DocumentTab';
import HistoryTab from 'components/HistoryTab';
import SolutionTab from 'components/SolutionTab';
import TransitionButtons from 'components/TransitionButtons';
import { postData } from  'utils/postData';

interface ProblemData {
  problemState: string;
  message: string;
  suggestion: string;
  choices: string[];
  optionType: string;
  isExecutable: boolean;
  instanceSource: string;
  sourceCode: string;
  prevCode: string;
};

const width = 100;
const height = 100;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { props } = await getProblemData(context, 'problem_02.json', width, height);
  return { props };
};

export default function ProblemTwo(data: any) {
  const [userName, setUserName] = useState('anonymous');
  const [prevCode, setPrevCode] = useState("");
  const problemText: string = data.problem;
  const documentUrl: string = data.documentUrl;
  const tabIndex: number = data.tabIndex;
  const instanceSource: string = data.instanceSource;
  const isExecutable: boolean = data.isExecutable;

  const problemData: ProblemData = {
    problemState: data.problemState,
    message: data.message,
    suggestion: data.suggestion,
    choices: [...data.choices],
    optionType: data.optionType,
    isExecutable: data.isExecutable,
    instanceSource: instanceSource,
    sourceCode: data.sourceCode,
    prevCode: prevCode
  };

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) setUserName(storedUserName);
    }
  }, []);

  const handleClick = async (choiceText: string, optionType: string, problemState: string) => {
    if (isExecutable) setPrevCode(instanceSource);
    if (typeof sessionStorage !== 'undefined' &&
      (Object.values(sessionStorage).includes(choiceText) === false)) {
      const policyData = {
        'type': optionType,
        'choice': choiceText,
      };
      sessionStorage.setItem(sessionStorage.length.toString(), JSON.stringify(policyData));
      const userActionData = {
        'state': problemState,
        'action': choiceText,
        'actionType': optionType,
      };
      //await postData(userActionData);
    }
  };

  return (
      <main className="px-6 text-sm lg:text-base">
        <p suppressHydrationWarning={true} className="m-1">ユーザ名: {userName}</p>
        <Tabs defaultIndex={tabIndex}>
          <TabList>
            <Tab>解答</Tab>
            <Tab>問題</Tab>
            <Tab>ドキュメント</Tab>
            <Tab>履歴</Tab>
          </TabList>

          <TabPanel>
            <SolutionTab 
              problemData={problemData}
              onClick={handleClick}
              problemDir="problem-02"
              canvasWidth={width}
              canvasHeight={height}
            />
          </TabPanel>

          <TabPanel>
            <ProblemTab
              problemText={problemText}
              problemPic={problemPic}
              isExecutable={isExecutable}
              instanceSource={instanceSource}
              prevCode={prevCode}
              canvasWidth={width}
              canvasHeight={height}
            />
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

