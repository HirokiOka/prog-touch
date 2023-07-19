import Link from 'next/link';
import SketchComponent from 'components/SketchComponent';
import CodePane from 'components/CodePane';

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

export default SolutionTab;
