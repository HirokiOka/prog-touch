import Link from 'next/link';

const TransitionButtons = () => {
  return (
    <>
      <button 
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-1 rounded"
        onClick={() => {
          if (sessionStorage.length !== 0) {
            const delIndex = sessionStorage.length - 1;
            sessionStorage.removeItem(delIndex.toString());
          }
          history.back();
        }}>
        一手戻る
      </button>
      <button
        className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/" onClick={() => { sessionStorage.clear(); }}>
          問題一覧へ
          </Link>
      </button>
    </>
  );
};

export default TransitionButtons;
