import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

type UserActionData = {
  'state': string;
  'action': string;
  'actionType': string;
  'problemId': string;
};

export async function postData (userActionData: UserActionData) {
  const currentTime = new Date();
  const jstTime = utcToZonedTime(currentTime, 'Asia/Tokyo');
  const formattedJstTime = format(jstTime,
                                  'yyyy-MM-dd HH:mm:ssXXX',
                                  { locale: ja });
  let userName = 'anonymous';
  if (typeof sessionStorage !== "undefined" && sessionStorage.getItem('userName') !== null) {
    userName = sessionStorage.getItem('userName') ?? 'anonymous';
  }
  const bodyData = {
    'user_name': userName,
    'clicked_time': formattedJstTime,
    'state': userActionData.state,
    'action': userActionData.action,
    'action_type': userActionData.actionType,
    'problem_id': userActionData.problemId
  };
  const res = await fetch('/api/click',{
    method: 'POST',
    body: JSON.stringify(bodyData)
  });
  const data = await res.json();
}
