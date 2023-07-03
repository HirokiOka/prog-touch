import Link from 'next/link';


export default function Home() {
  return (
    <>
      <main className="px-6">
        <h1 className="text-2xl font-bold p-1">課題</h1>
        <ul className="m-2 text-xl list-disc list-inside">
          <li><Link href="/problem-01" className="text-blue-500 hover:underline">プログラム課題1 </Link></li>
          <li><Link href="/problem-02" className="text-blue-500 hover:underline">プログラム課題2 </Link></li>
          <li><Link href="/problem-03" className="text-blue-500 hover:underline">プログラム課題3 </Link></li>
          <li><Link href="/math" className="text-blue-500 hover:underline">数学課題1</Link></li>
        </ul>
      </main>
    </>
  );
}
