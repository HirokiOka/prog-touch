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

  const s = (p5: p5Types, canvasParentRef: Element) => {
    const width = canvasWidth;
    const height = canvasHeight;
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
