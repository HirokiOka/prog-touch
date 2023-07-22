import Link from 'next/link';
import { FC } from 'react';
import SketchComponent from 'components/SketchComponent';
import CodePane from 'components/CodePane';
import HistoryTab from 'components/HistoryTab';

interface SolutionProps {
  problemData: {
    problemState: string;
    message: string;
    suggestion: string;
    choices: string[];
    optionType: string;
    isExecutable: boolean;
    instanceSource: string;
    sourceCode: string;
    prevCode: string;
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

  return (
    <>
      {problemData.message ? 
        <p className="rounded bg-red-100 p-2 w-2/3">{problemData.message}</p>
        : ''}
      {problemData.suggestion ? 
        <p className="rounded bg-blue-100 p-2 w-2/3">Q. {problemData.suggestion}</p>
        : ''}

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
            <li key={i} className="mt-2 mb-4">
              <Link 
                href={`/${problemDir}/?problemState=${choiceNext}`} 
                onClick={() => onClick(choiceText, optionType, problemState)}
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
          key={problemData.instanceSource}
          instanceSource={problemData.instanceSource}
          isExecutable={isExecutable}
          prevCode={problemData.prevCode}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
        <CodePane code={problemData.sourceCode} diffLines={[]} />
      </div>
      {problemData.problemState === 'answer' ? 
        <HistoryTab />
      : ''}
    </>
  );
};

export default SolutionTab;
