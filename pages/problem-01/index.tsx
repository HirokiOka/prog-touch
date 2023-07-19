import { GetServerSideProps } from 'next';
import problemPic from 'public/problem_01.png';
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getProblemData } from 'utils/getProblemData';
import ProblemTab from 'components/ProblemTab';
import DocumentTab from 'components/DocumentTab';
import HistoryTab from 'components/HistoryTab';
import SolutionTab from 'components/SolutionTab';
import TransitionButtons from 'components/TransitionButtons';
import { postData } from  'utils/postData';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const width = 160;
  const height = 120;
  const { props } = await getProblemData(context, 'problem_01.json', width, height);
  return { props };
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
    if (isExecutable) setPrevCode(instanceSource);
    if (typeof sessionStorage !== undefined &&
      (Object.values(sessionStorage).includes(choiceText) === false)) {
      const policyData = {
        "type": optionType,
        "choice": choiceText,
      };
      sessionStorage.setItem(sessionStorage.length.toString(), JSON.stringify(policyData));
      await postData(choiceText);
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
            <SolutionTab
              problemData={problemData}
              onClick={handleClick}
              problemDir="problem-01"
              canvasWidth={160}
              canvasHeight={120}
            />
          </TabPanel>

          <TabPanel>
            <ProblemTab problemText={problemText} problemPic={problemPic} instanceSource={instanceSource} />
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
