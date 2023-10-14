import React, { useState } from 'react';

function ConsoleOutput() {
  const [logs, setLogs] = useState<string[]>([]);

  //const originalConsoleLog = console.log;
  console.log = (msg: any) => {
    if (typeof msg === 'string' && msg.includes('[Fast Refresh]')) return;
    const msgStr = msg.toString();
    //setLogs((prevLogs) => [...prevLogs, msgStr]);
    setLogs(msgStr);
    //originalConsoleLog(msg); 
  };

  return (
    <div className='p-2'>
      <h2>Console Output:</h2>
      <ul className='bg-gray-300 rounded p-2 my-2'>
      {/*
        {logs.map((log, index) => (
          <li key={index}>
          {log}
          </li>
        ))}
      */}
      <li>{logs}</li>
      </ul>
    </div>
  );
}

export default ConsoleOutput;
