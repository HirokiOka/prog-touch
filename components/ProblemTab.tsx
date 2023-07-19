import { FC } from 'react';
import Image from 'next/image';
import SketchComponent from 'components/SketchComponent';

type ProblemInfo = {
  problemText: string;
  problemPic: any;
  instanceSource: string;
};

const ProblemTab: FC<ProblemInfo> = ({ problemText, problemPic, instanceSource }) => {
  return (
    <div className="md:w-2/3">
      <p className="bg-gray-300 rounded p-2 my-2">[問題]: {problemText}</p>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div>
        <p>正解：</p>
        <Image
          src={problemPic}
          width="160"
          height="120"
          alt="Image of problem 01"
        />
        </div>
        <div>
          <p>出力: </p>
          <SketchComponent
            instanceSource={instanceSource}
            targetCode={instanceSource}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemTab;
