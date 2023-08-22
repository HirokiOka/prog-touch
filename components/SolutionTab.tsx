import Link from 'next/link';
import { FC } from 'react';
import SketchComponent from 'components/SketchComponent';
import CodePane from 'components/CodePane';
import HistoryTab from 'components/HistoryTab';
import { calcDiffLineNumbers } from 'utils/calcDiffLineNumbers';

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
  problemDir: string;
  canvasWidth: number;
  canvasHeight: number;
}


const SolutionTab: FC<SolutionProps> =  ({ problemData, onClick, problemDir, canvasWidth, canvasHeight }) => {
  const optionType = problemData.optionType;
  const problemState = problemData.problemState;
  const isExecutable: boolean = problemData.isExecutable;
  const sourceCode = problemData.sourceCode;
  const prevCode = problemData.prevCode;
  const prevViewCode = problemData.prevViewCode;
  const instanceSource = problemData.instanceSource;
  const diffLines = calcDiffLineNumbers(prevViewCode, sourceCode);

  return (
    <>
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
                href={`/${problemDir}/?problemState=${choiceNext}`} 
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
        <p>出力: </p>
        <SketchComponent
          key={instanceSource}
          instanceSource={instanceSource}
          isExecutable={isExecutable}
          prevCode={prevCode}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
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

export default SolutionTab;
