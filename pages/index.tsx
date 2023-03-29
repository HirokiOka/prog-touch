import Link from 'next/link';


export default function Home() {
  return (
    <>
      <main className="font-mono px-6">
        <h1 className="text-2xl font-bold p-2">課題</h1>
        <ul className="m-2 text-xl list-disc list-inside">
          <li><Link href="/problem-01" className="text-blue-500 hover:underline">課題1</Link></li>
          <li><Link href="/math" className="text-blue-500 hover:underline">数学課題1</Link></li>
        </ul>
      </main>
    </>
  );
}
