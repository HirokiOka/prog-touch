const HistoryTab = () => {
  return (
  <>
    {typeof sessionStorage !== undefined ?
          <ol className="list-decimal list-inside">
            {Object.entries(sessionStorage).sort((a: any, b: any) => a[0] - b[0]).map((e, i) =>  {
              const policyData = JSON.parse(e[1]);
              let classType = '';
              if (policyData['type'] === 'policy') {
                classType = 'px-y bg-blue-500 '
              } else if (policyData['type'] === 'design') {
                classType = 'bg-yellow-500 list-none mx-4';
              } else if (policyData['type'] === 'coding') {
                classType = 'bg-purple-500  font-sans list-none mx-8';
              } else if (policyData['type'] === 'wrong') {
                classType = 'bg-red-500 list-none mx-8';
              }

              return (
                <li key={i}
                  className={`${classType} my-1 py-1 px-4 text-white rounded-full text-sm w-1/2`}>
                    {policyData['choice']}
                </li>
              );
            })}
          </ol>
    : ''}
      </>
    );
};

export default HistoryTab;
