import Link from 'next/link';
import { useState, useEffect } from 'react';


export default function Home() {
  const [userName, setUserName] = useState('anonymous');
  const problemNumbers: number[] = [1, 2];
  const sectionTwo: number[] = [4, 3];

  const inputUserName = () => {
    const inputName: string = window.prompt('名前を入力してください:') ?? ''; 
    if (inputName) {
      setUserName(inputName);
      sessionStorage.setItem('userName', inputName);
    }

  };

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      <main className="px-6">
        <div className="flex">
          <p suppressHydrationWarning={true} className="m-2">ユーザ名: {userName}</p>
          <button
            onClick={inputUserName}
            className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            ユーザ名を入力
          </button>
        </div>

        <h1 className="text-2xl font-bold p-1">課題一覧</h1>
        <ul className="text-lg list-disc list-inside">
          {problemNumbers.map((v, i) => { 
            return (
              <li key={i}>
                <Link
                  href={`/problem/${v}`}
                  className="text-blue-500 hover:underline">
                  課題{v}
                </Link>
              </li>
            );
          })}
        </ul>
        <h2 className="text-xl">1. はじめてのプログラミング</h2>
        <h2 className="text-xl">2. 計算で図形を描く</h2>
        <ul className="text-lg list-disc list-inside">
          {sectionTwo.map((v, i) => { 
            return (
              <li key={i}>
                <Link
                  href={`/problem/${v}`}
                  className="text-blue-500 hover:underline">
                  section2-q{i+1}
                </Link>
              </li>
            );
          })}
        </ul>
        <h2 className="text-xl">3. アニメーションとインタラクション</h2>
        <h2 className="text-xl">4. たくさんの値をまとめて扱う</h2>
        <h2 className="text-xl">5. 関数を使って長いプログラムを整理する</h2>
      </main>
    </>
  );
}
