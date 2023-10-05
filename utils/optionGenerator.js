const fs = require('fs');

const baseSetupFunction = 'let count;\nlet cycle;\nfunction setup(){\n  createCanvas(200, 200);\n}';
const baseDrawFunction = 'function draw(){\n  background(160, 192, 255);\n}';

const problemMetaData = {
  problemId: "3-q1",
  problem: "円が周期的に大きくなったり小さくなり，キーを押していると鼓動が早くなって離すとゆっくりになるアニメーションを作成しましょう",
  viewWidth: 120,
  viewHeight: 120,
  canvasWidth: 120,
  canvasHeight: 120,
};


//needed: stateName, choices, (snippet,) choices
const statesInfo = [
  {
    stateName: 'start',
    optionText: '円を描く',
    nextState: 'draw_cirlcle_algorithm',
  },
  {
    stateName: 'draw_cirlcle_algorithm',
    optionText: '円を描く関数を使う',
    nextState: 'draw_cirlcle_confirm',
  },
  {
    stateName: 'draw_cirlcle_confirm',
    optionText: 'let size = 50; ellipse(width/2, height/2, size);',
    nextState: 'draw_cirlcle',
  },
  {
    stateName: 'draw_cirlcle',
    optionText: '円の鼓動を表現する',
    nextState: 'draw_heartbeat_algorithm',
  },
  {
    stateName: 'draw_heartbeat_algorithm',
    optionText: '円の鼓動を表現するための変数を宣言する',
    nextState: 'draw_heartbeat_var_confirm',
  },
  {
    stateName: 'draw_heartbeat_var_confirm',
    optionText: ' let count = 0; let cycle = 100; let size = 50; let increment = 1;',
    nextState: 'draw_heartbeat_var',
  },
  {
    stateName: 'draw_heartbeat_var',
    optionText: '円の大きさを変化させる',
    nextState: 'draw_heartbeat_var_change_confirm',
  },
  {
    stateName: 'draw_heartbeat_var_change_confirm',
    optionText: 'if (count < cycle/2) { size = count + 50; } else { size = (cycle - count) + 50; }',
    nextState: 'draw_heartbeat_var_change',
  },
  {
    stateName: 'draw_heartbeat_var_change',
    optionText: 'キー入力で鼓動の早さを変化させる',
    nextState: 'key_input_algorithm',
  },
  {
    stateName: 'key_input_algorithm',
    optionText: 'キー入力の有無を判別し, 鼓動の早さを変える',
    nextState: 'key_input_confirm',
  },
  {
    stateName: 'key_input_confirm',
    optionText: 'if (keyIsPressed) { increment = 2; } else { increment = 1; }',
    nextState: 'key_input',
  },
];


let problemData = {};
statesInfo.forEach((stateEntry, i) => {
  const entryData = {
    optionType:'',
    message: '',
    setupFunction: baseSetupFunction,
    drawFunction: baseDrawFunction,
    choices: [],
  };
  entryData.optionType = getOptionTypeFromName(stateEntry.stateName);
  entryData.message = '何をしますか?';
  entryData.choices.push({
    text: stateEntry.optionText,
    next: stateEntry.nextState
  });
  problemData[stateEntry.stateName] = entryData;
});

const optionData = {...problemMetaData, ...problemData };

const writeData = JSON.stringify(optionData, null, 4);
fs.writeFileSync('testOption.json', writeData);


function getOptionTypeFromName(stateName) {
  const optionTypes = ['algorithm', 'confirm'];
  for (const optionTypeName of optionTypes) {
    if (stateName.includes(optionTypeName)) {
      return optionTypeName;
    }
  }
  return 'policy';
}
