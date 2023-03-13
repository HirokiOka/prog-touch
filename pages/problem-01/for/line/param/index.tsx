import Link from 'next/link';
import Sketch from 'components/Sketch';
import ExerciseOne from 'components/ExerciseOne';
import CodePane from 'components/CodePane';
import p5Types from 'p5';


export const SketchComponent = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    p5.background(196);
    for(let i = 0; i < 9; i++) {
      p5.line((i + 1) * 10, 0, (i + 1) * 10, 100);
    }
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


export default function ForLineParam() {
  const sourceCode = `function setup() {
  createCanvas(100, 100);
  background(196);
  for(let i = 0; i < 9; i++) {
    line((i + 1) * 10, 0, (i + 1) * 10, 100);
  }
}`;
  const handleClick = () => {
    history.back();
  };
  return (
    <>
      <main className="font-mono px-6">
        <h1 className="bg-red-500 text-white font-bold py-2 px-4 rounded w-24 m-2" >正解！</h1>
        <ExerciseOne />
        <div className="float">
          <p>出力: </p>
          <SketchComponent />
        </div>

        <CodePane code={sourceCode} />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>一手戻る</button>

      </main>
    </>
  );
}
