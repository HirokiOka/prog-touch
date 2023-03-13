import Link from 'next/link';
import Image from 'next/image';
import problemPic from 'public/sec2_2.png';
import Sketch from 'compoments/Sketch';
import p5Types from 'p5';


export const SketchComponent = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    p5.background(196);
    p5.line(10, 0, 10, 100);
    p5.line(20, 0, 20, 100);
    p5.line(30, 0, 30, 100);
    p5.line(40, 0, 40, 100);
    p5.line(50, 0, 50, 100);
    p5.line(60, 0, 60, 100);
    p5.line(70, 0, 70, 100);
    p5.line(80, 0, 80, 100);
    p5.line(90, 0, 90, 100);
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


export default function RouteOne() {
  const sourceCode = `function setup() {
  createCanvas(100, 100);
  background(196);
  line(10, 0, 10, 100);
  line(20, 0, 20, 100);
  line(30, 0, 30, 100);
  line(40, 0, 40, 100);
  line(50, 0, 50, 100);
  line(60, 0, 60, 100);
  line(70, 0, 70, 100);
  line(80, 0, 80, 100);
  line(90, 0, 90, 100);
}`;
  const handleClick = () => {
    history.back();
  };

  return (
    <>
      <main className="font-mono px-6">
        <h1 className="bg-red-500 text-white font-bold mt-1 py-2 px-4 rounded w-24" >正解！</h1>
        <h2 className="text-2xl font-bold">Problem 1:</h2>
        <p>
          繰り返しを使って描画する練習として、9本の縦線を書くプログラムを作成してみましょう。 
        </p>

        <div className="float-left mx-2">

          <p>正解：</p>
          <Image
            src={problemPic}
            alt="Image of problem (Section2-2)"
          />
        </div> 
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

      </main>
    </>
  );
}
