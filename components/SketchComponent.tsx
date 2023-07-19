import { memo } from 'react';
import p5Types from 'p5';
import dynamic from 'next/dynamic';

const Sketch = dynamic(import('react-p5'), {
  loading: () => <>loading...</>,
  ssr: false,
});

type SourceProps = {
  instanceSource: string;
  targetCode: string;
  canvasWidth: number;
  canvasHeight: number;
};

const SketchComponent = memo<SourceProps>(function sketch({ instanceSource, targetCode, canvasWidth, canvasHeight }) {
  const s = (p5: p5Types, canvasParentRef: Element) => {
    const width = canvasWidth;
    const height = canvasHeight;
    try {
      eval(instanceSource);
    } catch (e: any) {
      eval(targetCode);
    }
  };
  const d = (p5: p5Types) => {
  };
  return (
    <Sketch
      setup={s}
      draw={d}
    />
  );
});

export default SketchComponent;
