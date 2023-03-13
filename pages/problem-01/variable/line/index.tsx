import Link from 'next/link';
import p5Types from 'p5';
import Sketch from 'components/Sketch';
import ExerciseOne from 'components/ExerciseOne';
import CodePane from 'components/CodePane';

export const SketchComponent = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    p5.background(196);
    const x = 10;
    p5.line(x, 0, x, 100);
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
  const x = 10;
  line(x, 0, x, 100);
}`;
  const handleClick = () => {
    history.back();
  };


  return (
    <>
      <main className="font-mono px-6">
        <ExerciseOne />
        <div className="float">
          <p>出力: </p>
          <SketchComponent />
        </div>

        <CodePane code={sourceCode} />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>一手戻る</button>
        <ul className="m-2 text-xl list-disc list-inside">方針:
          <li><Link href="/problem-01/variable/line/for" className="text-blue-500 hover:underline">繰り返しを使う (for(;;) { })</Link></li>
        </ul>

      </main>
    </>
  );
}
