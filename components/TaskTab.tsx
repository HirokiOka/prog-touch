import Link from 'next/link';
import { FC } from 'react';
import SketchComponent from 'components/SketchComponent';
import CodePane from 'components/CodePane';
import HistoryTab from 'components/HistoryTab';
import { calcDiffLineNumbers } from 'utils/calcDiffLineNumbers';
import Image from 'next/image';

interface SolutionProps {
  problemData: {
    problemState: string;
    message: string;
    choices: string[];
    optionType: string;
    isExecutable: boolean;
    instanceSource: string;
    sourceCode: string;
    prevCode: string;
    prevViewCode: string;
  },
  onClick: (choiceText: string, optionType: string, problemState: string) => void;
  problemId: string;
  canvasWidth: number;
  canvasHeight: number;
  problemText: string;
  problemPic: any;
}

type ProblemInfo = {
  problemText: string;
  instanceSource: string;
  prevCode: string;
  isExecutable: boolean;
  canvasWidth: number;
  canvasHeight: number;
};

const ProblemPane: FC<ProblemInfo> = ({ problemText }) => {
  return (
    <div className="md:w-2/3">
      <p className="bg-gray-300 rounded p-2 my-2">[課題]: {problemText}</p>
    </div>
  );
};

const TaskTab: FC<SolutionProps> =  ({ problemData, onClick, problemId, canvasWidth, canvasHeight, problemText}) => {
  const problemPic = `/problem_0${problemId}.png`;

  const optionType = problemData.optionType;
  const problemState = problemData.problemState;
  const isExecutable: boolean = problemData.isExecutable;
  const sourceCode = problemData.sourceCode;
  const prevCode = problemData.prevCode;
  const prevViewCode = problemData.prevViewCode;
  const instanceSource = problemData.instanceSource;
  const diffLines = calcDiffLineNumbers(prevViewCode, sourceCode);
  let width = canvasWidth;
  let height = canvasHeight;
  if (width / height === 1 && 400 <= width) {
    width = 140;
    height = 140;
  }

  return (
    <>
      <ProblemPane 
        problemText={problemText} 
        isExecutable={isExecutable}
        instanceSource={instanceSource}
        prevCode={prevCode}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      {
        problemData.message && (
          problemData.optionType === "error" ? (
            <p className="rounded bg-red-100 p-2">{problemData.message}</p>
            ) : (
            <p className="rounded bg-blue-100 p-2">Q. {problemData.message}</p>
          )
        )
      }

      <ul className="m-1 p-1 list-inside list-none">  
        {problemData.choices.map((c: any, i: number) => {
          const choiceNext: string =  c["next"];
          const choiceText: string =  c["text"];
          let linkClass = '';
          if (optionType === 'policy') {
            linkClass = 'bg-blue-500 hover:bg-blue-700';
          } else if (optionType === 'design') {
            linkClass = 'bg-yellow-500 hover:bg-yellow-700';
          } else if (optionType === 'coding') {
            linkClass = 'bg-purple-500 hover:bg-purple-700 text-white font-sans';
          }
          return (
            <li key={i} className={`${linkClass} mt-1 py-1 px-4 text-white rounded-full text-sm`}>
              <Link 
                href={`/problem/${problemId}?problemState=${choiceNext}`} 
                onClick={async () => {
                  onClick(choiceText, optionType, problemState);
                }}
                className="">
                {i+1}: {choiceText}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-2 rounded border border-gray-500">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div>
            <p>正解出力：</p>
            <Image
              src={problemPic}
              width={width}
              height={height}
              alt="Image of problem"
            />
          </div>
          <div>
            <p>あなたの出力: </p>
            <SketchComponent
              key={instanceSource}
              instanceSource={instanceSource}
              isExecutable={isExecutable}
              prevCode={prevCode}
              canvasWidth={width}
              canvasHeight={height}
            />
          </div>
        </div>
      <CodePane code={sourceCode} diffLines={diffLines.addedLineNumbers} />
      </div>
      {problemData.problemState === 'answer' ? 
        <>
          <p className="mt-2">あなたの方針:</p>
          <HistoryTab />
        </>
      : ''}
    </>
  );
};

export default TaskTab;
