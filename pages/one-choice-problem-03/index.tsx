import { GetServerSideProps } from 'next';
import problemPic from 'public/problem_03.png';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getProblemData } from 'utils/getProblemData';
import ProblemTab from 'components/ProblemTab';
import HistoryTab from 'components/HistoryTab';
import SolutionTab from 'components/SolutionTab';
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

const width = 400;
const height = 400;

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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { props } = await getProblemData(context, 'one-choice/cleaned_modified_problem_03.json', width, height);
  return { props };
};

export default function ProblemThree(data: any) {
  const [userName, setUserName] = useState('anonymous');
  const [prevCode, setPrevCode] = useState("");
  const [prevViewCode, setPrevViewCode] = useState("");
  const problemText: string = data.problem;
  const documentUrl: string = data.documentUrl;
  const tabIndex: number = data.tabIndex;
  const instanceSource: string = data.instanceSource;
  const isExecutable: boolean = data.isExecutable;

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) setUserName(storedUserName);
    }
  }, []);

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
      tabSelectData.actionType = 'DocumentTab';
    } else if (tabIndex ===3) {
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
            <Tab>課題</Tab>
            <Tab>履歴</Tab>
          </TabList>

          <TabPanel>
            <SolutionTab
              problemData={problemData}
              onClick={handleClick}
              problemDir="one-choice-problem-03"
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
            <HistoryTab />
          </TabPanel>
        </Tabs>

        <TransitionButtons />
      </main>
  );
}