import Link from 'next/link';
import { useState, useEffect } from 'react';


export default function Home() {
  const [userName, setUserName] = useState('anonymous');

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
            <Link
              href="/problem/1"
              className="text-blue-500 hover:underline">
              チュートリアル課題
            </Link>
        <h2 className="text-xl">2. 計算で図形を描く</h2>
        <ul className="text-lg list-disc list-inside px-6">
          <li>
            <Link
              href="/problem/4"
              className="text-blue-500 hover:underline">
              section2-q1: 小手調べ
            </Link>
          </li>
          <li>
            <Link
              href="/problem/3"
              className="text-blue-500 hover:underline">
              section2-q2: チェッカー
            </Link>
          </li>
        </ul>
        <h2 className="text-xl">3. アニメーションとインタラクション</h2>
        <ul className="text-lg list-disc list-inside px-6">
          <li>
            <Link
              href="/problem/5"
              className="text-blue-500 hover:underline">
              section3-q1: 心臓の鼓動のようなアニメーション
            </Link>
          </li>
        </ul>
        <h2 className="text-xl">4. たくさんの値をまとめて扱う</h2>
        <ul className="text-lg list-disc list-inside px-6">
          <li>
            <Link
              href="/problem/6"
              className="text-blue-500 hover:underline">
              section4-1: 配列を用いる計算・描画
            </Link>
          </li>
        </ul>
        <h2 className="text-xl">5. 関数を使って長いプログラムを整理する</h2>
        <ul className="text-lg list-disc list-inside px-6">
          <li>
            <Link
              href="/problem/7"
              className="text-blue-500 hover:underline">
              section5-1: 描画関数を作る
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
