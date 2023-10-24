import { memo } from 'react';
import p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <>loading...</>,
  ssr: false,
});

type SourceProps = {
  instancedSetup: string;
  instancedDraw: string;
  prevCode: string;
  isExecutable: boolean;
  canvasWidth: number;
  canvasHeight: number;
};


const SketchComponent = memo<SourceProps>(function sketch({
    instancedSetup,
    instancedDraw,
    prevCode,
    isExecutable,
    canvasWidth,
    canvasHeight
  }) {

  const width = canvasWidth;
  const height = canvasHeight;
  let count = 0;
  let cycle = 100;
  let increment = 1;
  let size = 50;
  const TWO_PI = 6.283185307179586;
  const HALF_PI = TWO_PI / 4;

  const s = (p5: p5Types, canvasParentRef: Element) => {
    const CLOSE = p5.CLOSE;
    if (isExecutable) {
      try {
        eval(instancedSetup);
      } catch (e: any) {
        console.log(e);
      }
    } else {
      try {
        eval(prevCode);
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  const d = (p5: p5Types) => {
    let keyIsPressed = p5.keyIsPressed;
    if (isExecutable && instancedDraw !== '') {
        try {
          eval(instancedDraw);
        } catch (e: any) {
          console.log(e);
        }
      }
  };

  return (
    <div className="">
      <Sketch setup={s} draw={d} />
    </div>
  );
});


export default SketchComponent;
