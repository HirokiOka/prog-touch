import Link from 'next/link';

const setUserName = () => {
  const userName: string = window.prompt('名前を入力してください:') ?? ''; 
  sessionStorage.setItem('userName', userName);
};

export default function Home() {
  return (
    <>
      <main className="px-6">
        <h1 className="text-2xl font-bold p-1">課題</h1>
        <button
          onClick={setUserName}
          className="mx-2 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ユーザ名を入力
        </button>
        <ul className="m-2 text-xl list-disc list-inside">
          <li><Link href="/problem-01" className="text-blue-500 hover:underline">プログラム課題1 </Link></li>
          <li><Link href="/problem-02" className="text-blue-500 hover:underline">プログラム課題2 </Link></li>
          <li><Link href="/problem-03" className="text-blue-500 hover:underline">プログラム課題3 </Link></li>
        </ul>
      </main>
    </>
  );
}
