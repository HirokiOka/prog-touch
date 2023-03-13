import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodePane = (props: any) => {
  return (
    <>
      <h2 className="p-2">あなたのコード：</h2>
      <div className="border border-black w-1/3">
          <pre>
            <code>
              <SyntaxHighlighter language="javascript" style={docco}>
                {props.code}
              </SyntaxHighlighter>
            </code>
          </pre>
      </div>
    </>
  );
};

export default CodePane;
