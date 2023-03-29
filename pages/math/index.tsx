import Link from 'next/link';
import * as fs from 'fs';
import * as path from 'path';
//import { GetStaticProps } from 'next';
import { GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let problemState = 'start';
  if (context.query.problemState !== undefined) {
    problemState = context.query.problemState;
  }

  const dataPath = path.join(process.cwd(), 'public', 'data', 'sample.json');
  const jsonData = fs.readFileSync(dataPath).toString();
  const data = JSON.parse(jsonData);
  const problemData = data[problemState];
  return {
    props : {
      problem: data.problem,
      question: problemData.question,
      choices: problemData.choices,
    },
  };
};

export default function ProblemOne(data: any) {
  return (
      <main className="font-mono px-6">
        <div className="float w-1/3">
          <p className="bg-gray-300 rounded p-2 my-2">問題:{data.problem}</p>
          <p className="bg-yellow-300 rounded p-2">質問: {data.question}</p>
        </div>

        <ul className="m-2 list-disc list-inside">方針:
          {data.choices.map((c: any, i: number) => {
            return (
              <li key={i}><Link href={`/math/?problemState=${c.next}`} className="text-blue-500 hover:underline">{c.text}</Link></li>
            );
          })}
        </ul>

      </main>
  );
}
