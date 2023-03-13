import Link from 'next/link';
import Sketch from 'compoments/Sketch';
import ExerciseOne from 'compoments/ExerciseOne';
import p5Types from 'p5';


export const SketchComponent = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    p5.background(196);
    p5.line(10, 0, 10, 100);
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


export default function Line() {
  const sourceCode = `function setup() {
  createCanvas(100, 100);
  background(196);
  line(10, 0, 10, 100);
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
          <li><Link href="/problem-01/line/more-line" className="text-blue-500 hover:underline">あと8本同じように線をひく (line(20, 0, 20, 100) ... line(90, 0, 90, 100))</Link></li>
          <li><Link href="/problem-01/for/line" className="text-blue-500 hover:underline">繰り返しを使う (for(;;))</Link></li>
        </ul>

      </main>
    </>
  );
}
