const fs = require('fs');
const path = require('path');

const fileName = 'problem_02.json';
const jsonFilePath = path.join('../', 'public', 'data', fileName);

const problemJson = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

const mappedJson = Object.entries(problemJson).map((e, i) => {
  const stateName = e[0];
  if (stateName.includes('coding')) console.log(stateName);
});

