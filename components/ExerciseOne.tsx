import Image from 'next/image';
import problemPic from 'public/sec2_2.png';

const ExerciseOne = () => {
  return (
    <>
      <h2 className="text-2xl font-bold">課題1:</h2>
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
    </>
  );
};

export default ExerciseOne;
