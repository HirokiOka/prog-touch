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
        <p suppressHydrationWarning={true} className="m-1">ユーザ名: {userName}</p>
        <button
          onClick={inputUserName}
          className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          ユーザ名を入力
        </button>
        <h1 className="text-2xl font-bold p-1">課題</h1>
        <h1 className="text-lg">コード選択あり</h1>
        <ul className="m-1 text-xl list-disc list-inside">
          <li>
            <Link
              href="/problem-01"
              className="text-blue-500 hover:underline">
              プログラム課題1
            </Link>
          </li>
          <li>
            <Link
              href="/problem-02"
              className="text-blue-500 hover:underline">
              プログラム課題2
            </Link>
          </li>
          <li>
            <Link
              href="/problem-03"
              className="text-blue-500 hover:underline">
              プログラム課題3
            </Link>
          </li>
        </ul>

        <h1 className="text-lg">コード選択なし</h1>
        <ul className="m-1 text-xl list-disc list-inside">
          <li>
            <Link
              href="/policy-problem-01"
              className="text-blue-500 hover:underline">
              プログラム課題1
            </Link>
          </li>
          <li>
            <Link
              href="/policy-problem-02"
              className="text-blue-500 hover:underline">
              プログラム課題2
            </Link>
          </li>
          <li>
            <Link
              href="/policy-problem-03"
              className="text-blue-500 hover:underline">
              プログラム課題3
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
