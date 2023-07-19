//よくない感
function getCurrentTimestamp(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export async function postData (choiceText: string) {
  const curretDate = getCurrentTimestamp();
  const userName = 'test';
  const bodyData = {
    'userName': userName,
    'clickedTime': curretDate,
    'choice': choiceText
  };
  const res = await fetch('/api/click',{
    method: 'POST',
    body: JSON.stringify(bodyData)
  });
  const data = await res.json();
}
