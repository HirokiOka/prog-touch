import Link from 'next/link';
import Sketch from 'compoments/Sketch';
import ExerciseOne from 'compoments/ExerciseOne';
import p5Types from 'p5';


export const SketchComponent = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    p5.background(196);
    for(let i = 0; i < 9; i++) {
      p5.line(10, 0, 10, 100);
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


export default function ForLine() {
  const sourceCode = `function setup() {
  createCanvas(100, 100);
  background(196);
  for (let i = 0; i < 9; i++) {
    line(10, 0, 10, 100);
  }
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

        <h2 className="p-2">あなたのコード：
        <div className="border border-black w-1/3">
            <pre>
              <code>
                {sourceCode}
              </code>
            </pre>
        </div>
        </h2>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>一手戻る</button>
        <ul className="m-2 text-xl list-disc list-inside">方針:
          <li><Link href="/problem-01/for/line/param" className="text-blue-500 hover:underline">引数を変更してみる (line(x1, y1, x2, y2))</Link></li>
        </ul>

      </main>
    </>
  );
}
