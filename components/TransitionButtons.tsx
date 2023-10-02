import { postData } from  'utils/postData';
import { useRouter } from 'next/router';

function removeChoiceItems() {
  if (typeof sessionStorage === "undefined") return;
  Object.keys(sessionStorage).forEach(key => {
    if (key === 'userName') return;
    sessionStorage.removeItem(key);
  });
}

async function handleReload(problemId: string) {
  if (typeof sessionStorage === "undefined") return;
  const backActionData = {
    'state': '',
    'action': 'back',
    'actionType': 'back',
    'problemId': problemId
  };
  await postData(backActionData);
  if (sessionStorage.length !== 0) {
    const delIndex = sessionStorage.length - 1;
    sessionStorage.removeItem(delIndex.toString());
  }
}

const TransitionButtons = (problemId: any) => {
  const router = useRouter();
  return (
    <>
      <button 
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-1 rounded"
        onClick={async () => {
          handleReload(problemId);
          history.back();
        }}>
        一手戻る
      </button>

      <button
        className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          removeChoiceItems();
          router.push('/');
        }
      }>
        問題一覧へ
      </button>
    </>
  );
};

export default TransitionButtons;
