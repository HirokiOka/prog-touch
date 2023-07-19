import Sketch from 'components/Sketch';
import { memo } from 'react';
import p5Types from 'p5';

type SourceProps = {
  instanceSource: string;
  targetCode: string;
};

const SketchComponent = memo<SourceProps>(({ instanceSource, targetCode }) => {
  const s = (p5: p5Types, canvasParentRef: Element) => {
    const width = 160;
    const height = 120;
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
