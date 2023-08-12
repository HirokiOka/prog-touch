import Link from 'next/link';
import { postData } from  'utils/postData';

function removeChoiceItems() {
  if (typeof sessionStorage === "undefined") return;
  Object.keys(sessionStorage).forEach(key => {
    if (key === 'userName') return;
    sessionStorage.removeItem(key);
  });
}

async function handleReload() {
  if (typeof sessionStorage === "undefined") return;
  const backActionData = {
    'state': '',
    'action': 'back',
    'actionType': 'back'
  };
  await postData(backActionData);
  if (sessionStorage.length !== 0) {
    const delIndex = sessionStorage.length - 1;
    sessionStorage.removeItem(delIndex.toString());
  }
}

const TransitionButtons = () => {
  return (
    <>
      <button 
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-1 rounded"
        onClick={async () => {
          handleReload();
          history.back();
        }}>
        一手戻る
      </button>

      <button
        className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/" onClick={() => removeChoiceItems() }>
          問題一覧へ
          </Link>
      </button>
    </>
  );
};

export default TransitionButtons;
