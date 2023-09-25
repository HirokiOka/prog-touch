import { FC } from 'react';
import Image from 'next/image';
import SketchComponent from 'components/SketchComponent';

type ProblemInfo = {
  problemText: string;
  problemPic: any;
  instanceSource: string;
  prevCode: string;
  isExecutable: boolean;
  canvasWidth: number;
  canvasHeight: number;
};


const ProblemTab: FC<ProblemInfo> = ({ problemText, problemPic, instanceSource, prevCode, isExecutable, canvasWidth, canvasHeight }) => {
  let width = canvasWidth;
  let height = canvasHeight;
  if (width / height === 1 && 400 <= width) {
    width = 140;
    height = 140;
  }
  return (
    <div className="md:w-2/3">
      <p className="bg-gray-300 rounded p-2 my-2">[課題]: {problemText}</p>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div>
        <p>正解：</p>
        <Image
          src={problemPic}
          width={width}
          height={height}
          alt="Image of problem"
        />
        </div>
        <div>
          <p>出力: </p>
          <SketchComponent
            key={instanceSource}
            isExecutable={isExecutable}
            instanceSource={instanceSource}
            prevCode={prevCode}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemTab;
