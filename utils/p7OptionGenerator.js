const fs = require('fs');

const rowBaseDrawFunction = ``;

const problemMetaData = {
  problemId: "5-1",
  problem: "EUの旗を描きましょう. 星を書く関数を作り, それを円周上に描きます.",
  viewWidth: 120,
  viewHeight: 120,
  canvasWidth: 120,
  canvasHeight: 120,
};


//needed: stateName, choices, (snippet,) choices
const c0 = `function setup(){
  createCanvas(120, 120);
  background(0, 51, 153);
  noStroke();
}`;

const c1_1 = `function setup(){
  createCanvas(120, 120);
  background(0, 51, 153);
  noStroke();

  fill(255, 204, 0);
  beginShape();
  for(let i = 0; i < 5; i++){
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = width/2 + cos(theta) * 50;
    let y = height/2 + sin(theta) * 50;
    vertex(x, y);
  }
  endShape(CLOSE);
}`;

const c1_2 = `function setup(){
  createCanvas(120, 120);
  background(0, 51, 153);
  noStroke();

  fill(255, 204, 0);
  beginShape();
  for(let i = 0; i < 5; i++){
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = width/2 + cos(theta) * 50;
    let y = height/2 + sin(theta) * 50;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function star(cx, cy, r){
  beginShape();
  for (let i = 0; i < 5; i++){
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x,y);
  }
  endShape(CLOSE);
}`;

const c2 = `function setup(){
  createCanvas(120, 120);
  background(0, 51, 153);
  noStroke();
  fill(255, 204, 0);
  star(width/2, height/2, 50);
}

function star(cx, cy, r){
  beginShape();
  for (let i = 0; i < 5; i++){
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x,y);
  }
  endShape(CLOSE);
}`;

const c3 = `function setup(){
createCanvas(120, 120);
background(0, 51, 153);
noStroke();
for(let i = 0; i < 12; i++){
  let theta = TWO_PI * i / 12;
  let x = width/2 + cos(theta) * width/4;
  let y = height/2 + sin(theta) * height/4;
  fill(255, 204, 0);
  star(x, y, width/20);
  }
}

function star(cx, cy, r){
  beginShape();
  for (let i = 0; i < 5; i++){
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x,y);
  }
  endShape(CLOSE);
}`;


const stateNames = [
  { name: 'start', code: c0, nextText: '星を1つ描いてみる' },
  { name: 'draw_star_algorithm', code: c0, nextText: 'キャンバスの中心から円を5等分し, 360 * 2/5 ずつずらしてポイントした5点を繋げる' },
  { name: 'draw_star_confirm', code: c0, nextText: 'fill(255, 204, 0); beginShape(); for(let i = 0; i < 5; i++){ let theta = TWO_PI * i * 2 / 5 - HALF_PI; let x = width/2 + cos(theta) * 50; let y = height/2 + sin(theta) * 50; vertex(x,y); }' },
  { name: 'star_function_policy', code: c1_1, nextText: '星を描く処理を関数にする' },
  { name: 'star_function_algorithm_1', code: c1_1, nextText: '星を描く処理を関数として宣言する' },
  { name: 'star_function_confirm_1', code: c1_1, nextText: 'function star(cx, cy, r){ beginShape(); for (let i = 0; i < 5; i++){ let theta = TWO_PI * i * 2 / 5 - HALF_PI; let x = cx + cos(theta) * r; let y = cy + sin(theta) * r; vertex(x,y); } endShape(CLOSE); }'},
  { name: 'star_function_algorithm_2', code: c1_2, nextText: '関数を描く関数を呼び出し, 星を描く' },
  { name: 'star_function_confirm_2', code: c1_2, nextText: 'star(width/2, height/2, 50);'},
  { name: 'circle_star_policy', code: c2, nextText: '小さい星を輪のように12個ならべる' },
  { name: 'circle_star_algorithm', code: c2, nextText: 'キャンバスの中心から円を12等分し, 30°ずつずらして配置する' },
  { name: 'circle_star_confirm', code: c2, nextText: 'for(let i = 0; i < 12; i++){ let theta = TWO_PI * i / 12; let x = width/2 + cos(theta) * width/4; let y = height/2 + sin(theta) * height/4; fill(255, 204, 0); star(x, y, width/20); }' },
  { name: 'answer', code: c3, nextText: '' },
];


const statesInfo = stateNames.map((sn, i) => {
  const stateName = sn.name;
  const code = sn.code;
  const nextText = sn.nextText;
  if (i === (stateNames.length - 1)) return {'stateName': stateName, 'code': code, 'nextText': nextText, 'nextState': '' };
  const nextState = stateNames[i+1].name;
  return { stateName, code, nextText, nextState };
});

let problemData = {};
statesInfo.forEach((stateEntry, i) => {
  const entryData = {
    optionType:'',
    message: '',
    setupFunction: '',
    drawFunction: '',
    choices: [],
  };
  //Add Properties
  entryData.optionType = getOptionTypeFromName(stateEntry.stateName);
  entryData.setupFunction = stateEntry.code; 
  entryData.message = '何をしますか?';
  entryData.choices.push({
    text: stateEntry.nextText,
    next: stateEntry.nextState
  });
  problemData[stateEntry.stateName] = entryData;
});

const optionData = {...problemMetaData, ...problemData };

const writeData = JSON.stringify(optionData, null, 2);
fs.writeFileSync('../public/data/problems/problem_07.json', writeData);


function getOptionTypeFromName(stateName) {
  const optionTypes = ['algorithm', 'confirm', 'error'];
  for (const optionTypeName of optionTypes) {
    if (stateName.includes(optionTypeName)) {
      return optionTypeName;
    }
  }
  return 'policy';
}
