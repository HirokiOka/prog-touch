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
  },
  onClick: (choiceText: string, optionType: string, problemState: string, problemId: string) => void;
  problemNumber: string;
  canvasWidth: number;
  canvasHeight: number;
  problemText: string;
}


const TaskTab: FC<SolutionProps> =  ({
    problemData,
    onClick,
    problemNumber,
    canvasWidth,
    canvasHeight,
    problemText
  }) => {

  const problemImagePath = (parseInt(problemNumber) < 5)
    ? `/problem_0${problemNumber}.png`
    : `/problem_0${problemNumber}.gif`;

  const optionType = problemData.optionType;
  const problemId: string = problemData.problemId;
  const problemState = problemData.problemState;
  const isExecutable: boolean = problemData.isExecutable;
  const setupFunction = problemData.setupFunction;
  const drawFunction = problemData.drawFunction;
  const prevCode = problemData.prevCode;
  const prevViewCode = problemData.prevViewCode;
  const instancedSetup = problemData.instancedSetup;
  const instancedDraw = problemData.instancedDraw;
  const diffLines = calcDiffLineNumbers(prevViewCode, setupFunction);
  let width = canvasWidth;
  let height = canvasHeight;
  if (width / height === 1 && 400 <= width) {
    width = 140;
    height = 140;
  }

  return (
    <>
      <div className="md:w-2/3">
        <p className="bg-gray-300 rounded p-2 my-2">[課題]: {problemText}</p>
      </div>

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
          } else if (optionType === 'design' || optionType === 'algorithm') {
            linkClass = 'bg-yellow-500 hover:bg-yellow-700';
          } else if (optionType === 'coding' || optionType === 'confirm') {
            linkClass = 'bg-purple-500 hover:bg-purple-700 text-white font-sans';
          } else if (optionType === 'answer') {
            onClick("", optionType, problemState, problemId);
          }
          return (
            <li key={i} className={`${linkClass} mt-1 py-1 px-4 text-white rounded-full text-sm`}>
              <Link 
                href={`/problem/${problemNumber}?problemState=${choiceNext}`} 
                onClick={async () => {
                  onClick(choiceText, optionType, problemState, problemId);
                }}
                className="">
                {i+1}: {choiceText}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-2 rounded border border-gray-500">
        <div className="grid grid-cols-2">
          <div>
            <p>正解出力：</p>
            <Image
              src={problemImagePath}
              width={width}
              height={height}
              alt="Image of problem"
            />
          </div>
          <div className="top">
            <p>あなたの出力: </p>
            <SketchComponent
              key={instancedSetup}
              instancedSetup={instancedSetup}
              instancedDraw={instancedDraw}
              isExecutable={isExecutable}
              prevCode={prevCode}
              canvasWidth={width}
              canvasHeight={height}
            />
          </div>
        </div>
      <CodePane
        setupFunction={setupFunction}
        drawFunction={drawFunction}
        diffLines={diffLines.addedLineNumbers}
      />
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
