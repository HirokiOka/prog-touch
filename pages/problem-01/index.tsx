import Link from 'next/link';
import p5Types from 'p5';
import Sketch from 'components/Sketch';
import ExerciseOne from 'components/ExerciseOne';
import CodePane from 'components/CodePane';

export const SketchComponent = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    p5.background(196);
  };

  const draw = (p5: p5Types) => {
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
    />
  );
}


export default function ProblemOne() {
  const sourceCode = `function setup() {
  createCanvas(100, 100);
  background(196);
}`;
  
  return (
      <main className="font-mono px-6">
        <ExerciseOne />
        <div className="float">
          <p>出力: </p>
          <SketchComponent />
        </div>

        <CodePane code={sourceCode} />


        <ul className="m-2 text-xl list-disc list-inside">方針:
          <li><Link href="/problem-01/line" className="text-blue-500 hover:underline">線を1本引いてみる (line(10, 0, 10, 100);)</Link></li>
          <li><Link href="/problem-01/for" className="text-blue-500 hover:underline">繰り返しを使う (for(;;) { })</Link></li>
          <li><Link href="/problem-01/variable" className="text-blue-500 hover:underline">線のx座標の変数を宣言する (const x = 10;)</Link></li>
        </ul>

      </main>
  );
}
