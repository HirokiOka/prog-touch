import { FC } from 'react';

const DocumentTab: FC<{ documentUrl: string }> = ({ documentUrl }) => {
  return (
    <>
      {documentUrl ? 
        <iframe id="inlineFrameExample"
          title="p5 document"
          width="320"
          height="480"
          src={documentUrl}>
        </iframe>
        : ''}
      </>
    );
};

export default DocumentTab;
