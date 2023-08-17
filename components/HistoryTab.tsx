import { useState, useEffect } from 'react';

interface PolicyInfo {
  type: string;
  choice: string;
};

const HistoryTab = () => {
  const [policies, setPolicies] = useState<PolicyInfo[]>([]);

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const storedStorage = JSON.parse(JSON.stringify(sessionStorage));
      delete storedStorage.userName;
      const sortedPolicies: PolicyInfo[] = 
        Object.
          entries(storedStorage).
          sort((a: any, b: any) => a[0] - b[0]).
          map((e: any, _) => {
            return JSON.parse(e[1]);
          });
      setPolicies([...sortedPolicies]);
    }
  }, [policies]);
  
  return (
    <>
      <ol className="list-decimal list-inside">
        {policies.map((policyData: PolicyInfo, i: number) =>  {
          let classType = '';
          if (policyData['type'] === 'policy') {
            classType = 'px-y bg-blue-500 '
          } else if (policyData['type'] === 'design') {
            classType = 'bg-yellow-500 mx-4';
          } else if (policyData['type'] === 'coding') {
            classType = 'bg-purple-500  font-sans mx-8';
          } else if (policyData['type'] === 'error') {
            classType = 'bg-red-500 mx-8';
          }

          return (
            <li key={i}
              className={`${classType} my-1 py-1 px-4 text-white rounded-full text-sm`}>
                {policyData['choice']}
            </li>
          );
        })}
          </ol>
      </>
    );
};

export default HistoryTab;
