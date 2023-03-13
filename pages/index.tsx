import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <>loading...</>,
  ssr: false,
});

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


export default function Home() {
  return (
    <>
      <main className="font-mono px-6">
        <h1 className="text-2xl font-bold p-2">課題</h1>
        <ul className="m-2 text-xl list-disc list-inside">
          <li><Link href="/problem-01" className="text-blue-500 hover:underline">課題1</Link></li>
        </ul>
      </main>
    </>
  );
}
