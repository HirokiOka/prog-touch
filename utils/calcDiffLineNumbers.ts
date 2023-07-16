import * as diff from 'diff';

export const calcDiffLineNumbers = (bSource: string, aSource: string) => {
  const diffLines = diff.diffLines(bSource, aSource);
  let lineNumber = 1;
  let addedLineNumbers = [];
  let removedLineNumbers = [];

  for (const part of diffLines) {
    let symbol = ' ';
    if(part.added) {
      symbol = '+';
    } else if(part.removed) {
      symbol = '-';
    }

    let lines = part.value.split('\n');
    // Remove the last empty line
    lines = lines.slice(0, lines.length - 1);

    for(const line of lines) {
      //console.log(`${lineNumber} ${symbol} ${line}`);
      if(part.added) {
        addedLineNumbers.push(lineNumber);
      } else if(part.removed) {
        removedLineNumbers.push(lineNumber);
      }
      lineNumber++;
    }
  }
  return { addedLineNumbers, removedLineNumbers };
};
