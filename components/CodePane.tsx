import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodePane = (props: any) => {
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
                  let style = { display: 'block', backgroundColor: '' };
                  let diff: number[] = props.diffLine;
                  if (diff.includes(lineNumber)) {
                    style.backgroundColor = '#dbffdb';
                  }
                  return { style };
                }}
                >
                {props.code}
              </SyntaxHighlighter>
            </code>
          </pre>
      </div>
    </>
  );
};

export default CodePane;
