import SyntaxHighlighter from 'react-syntax-highlighter';
import { FC } from 'react';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

type CodeProps = {
  setupFunction: string;
  drawFunction: string;
  diffLines: Number[];
};

const CodePane:FC<CodeProps> = ({ setupFunction, drawFunction, diffLines }) => {
  const viewCode: string = (drawFunction === undefined)
    ? setupFunction
    : (setupFunction + '\n' + drawFunction);
  return (
    <>
      <h2 className="pt-2">あなたのコード：</h2>
      <div className="border border-black md:w-1/3">
          <pre>
            <code>
              <SyntaxHighlighter
                language="javascript"
                style={docco}
                showLineNumbers={true}
                wrapLines={true}
                lineProps={lineNumber => {
                  const style = {
                    display: 'block',
                    backgroundColor: '',
                    };
                  if (diffLines.includes(lineNumber)) {
                    style.backgroundColor = '#dbffdb';
                  }
                  return { style };
                }}
                >
                {viewCode}
              </SyntaxHighlighter>
            </code>
          </pre>
      </div>
    </>
  );
};

export default CodePane;
