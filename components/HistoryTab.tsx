const HistoryTab = () => {
  return (
    <>
      {typeof sessionStorage !== undefined ?
        <ol className="list-decimal list-inside">
          {Object.entries(sessionStorage).sort((a: any, b: any) => a[0] - b[0]).map((e, i) =>  {
            const policyData = JSON.parse(e[1]);
            const policyText = policyData['choice'];
            const policyType = policyData['type'];
            const classType = (policyType === 'policy') ? 'bg-blue-500 hover:bg-blue-700' : 'bg-purple-500 hover:bg-purple-700 text-white font-sans';
            return (
                <li key={i} className={`${classType} text-white my-1 py-1 px-4 rounded-full text-sm w-1/2`}>
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
