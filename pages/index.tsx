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

        <h1 className="text-2xl font-bold p-1">プログラム課題</h1>

        <h1 className="text-lg px-2 pt-2">コード選択あり (1択)</h1>
        <ul className="text-xl list-disc list-inside">
          <li>
            <Link
              href="/one-choice-problem-01"
              className="text-blue-500 hover:underline">
              課題1
            </Link>
          </li>
          <li>
            <Link
              href="/one-choice-problem-02"
              className="text-blue-500 hover:underline">
              課題2
            </Link>
          </li>
          <li>
            <Link
              href="/one-choice-problem-03"
              className="text-blue-500 hover:underline">
              課題3
            </Link>
          </li>
        </ul>

      </main>
    </>
  );
}
