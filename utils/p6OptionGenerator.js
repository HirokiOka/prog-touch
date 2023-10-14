const fs = require('fs');

const rowBaseDrawFunction = ``;

const problemMetaData = {
  problemId: "4-1",
  problem: "円が周期的に大きくなったり小さくなり，キーを押していると鼓動が早くなって離すとゆっくりになるアニメーションを作成しましょう",
  viewWidth: 120,
  viewHeight: 120,
  canvasWidth: 120,
  canvasHeight: 120,
};


//needed: stateName, choices, (snippet,) choices
/*
const stateNames = [
  'start',
  'genArray_algorithm',
  'genArray_confirm',
  'calc_sum_poicy',
  'calc_sum_algorithm',
  'calc_sum_confirm',
  'calc_ave_policy',
  'calc_ave_algorithm',
  'calc_ave_confirm',
  'calc_max_policy',
  'calc_max_assign_algorithm',
  'calc_max_assign_confirm',
  'calc_max_for_algorithm',
  'calc_max_for_confirm',
  'calc_min_policy',
  'calc_min_assign_algorithm',
  'calc_min_assign_confirm',
  'calc_min_for_algorithm',
  'calc_min_for_confirm',
  'draw_scale_policy',
  'draw_scale_algorithm',
  'draw_scale_confirm',
  'draw_bar_chart_policy',
  'draw_bar_chart_algorithm',
  'draw_bar_chart_confirm',
  'fill_bar_chart_policy',
  'fill_bar_chart_algorithm',
  'fill_bar_chart_confirm',
  'draw_ave_line_policy',
  'draw_ave_line_algorithm',
  'draw_ave_line_confirm',
];
*/
/*
const stateNames = [
  { name: 'start', code: rowBaseSetupFunction },
 { name: 'genArray_algorithm',
   code: `function setup(){
  createCanvas(400, 400);
  background(240);`},
 { name:'genArray_confirm',
   code: `function setup(){
  createCanvas(400, 400);
  background(240);`},
 { name:'calc_sum_poicy', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);`},
 { name:'calc_sum_algorithm', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);`},
 { name:'calc_sum_confirm', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);`},
 { name:'calc_ave_policy', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);`},
 { name:'calc_ave_algorithm', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);`},
 { name:'calc_ave_confirm', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);`},
 { name:'calc_max_policy', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);`},
 { name:'calc_max_assign_algorithm', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);`},
 { name:'calc_max_assign_confirm', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);`},
 { name:'calc_max_for_algorithm', code: `function setup(){
  createCanvas(400, 400);
  background(240);
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);`},
 { name:'calc_max_for_confirm', code: ``},
 { name:'calc_min_policy', code: ``},
 { name:'calc_min_assign_algorithm', code: ``},
 { name:'calc_min_assign_confirm', code: ``},
 { name:'calc_min_for_algorithm', code: ``},
 { name:'calc_min_for_confirm', code: ``}, 
 { name:'draw_scale_policy', code: ``},
 { name:'draw_scale_algorithm', code: ``},
 { name:'draw_scale_confirm', code: ``},
 { name:'draw_bar_chart_policy', code: ``},
 { name:'draw_bar_chart_algorithm', code: ``},
 { name:'draw_bar_chart_confirm', code: ``},
 { name:'fill_bar_chart_policy', code: ``},
 { name:'fill_bar_chart_algorithm', code: ``},
 { name:'fill_bar_chart_confirm', code: ``},
 { name:'draw_ave_line_policy', code: ``},
 { name:'draw_ave_line_algorithm', code: ``}, 
 { name:'draw_ave_line_confirm', code: ``},
];
*/
const c0 = `function setup(){
  createCanvas(400, 400);
  background(240);
}`;

const c1 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
}`;

const c2 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  
}`;

const c3 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  
}`;

const c3_1 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
}`;

const c4 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if (largest < scores[i]) {
      largest = scores[i];
    }
  }
  console.log(largest);  
}`;

const c4_1 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if (largest < scores[i]) {
      largest = scores[i];
    }
  }
  console.log(largest);  

  //最小値
  let smallest = 100;
}`;

const c5 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if (largest < scores[i]) {
      largest = scores[i];
    }
  }
  console.log(largest);  

  //最小値
  let smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if (scores[i] < smallest) {
      smallest = scores[i];
    }
  }
  console.log(smallest);
}`;

const c6 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if (largest < scores[i]) {
      largest = scores[i];
    }
  }
  console.log(largest);  

  //最小値
  let smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if (scores[i] < smallest) {
      smallest = scores[i];
    }
  }
  console.log(smallest);

  //棒グラフ
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }
}`;

const c7 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if (largest < scores[i]) {
      largest = scores[i];
    }
  }
  console.log(largest);  

  //最小値
  let smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if (scores[i] < smallest) {
      smallest = scores[i];
    }
  }
  console.log(smallest);

  //棒グラフ
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }
}`;

const c8 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if (largest < scores[i]) {
      largest = scores[i];
    }
  }
  console.log(largest);  

  //最小値
  let smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if (scores[i] < smallest) {
      smallest = scores[i];
    }
  }
  console.log(smallest);

  //棒グラフ
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  noStroke();
  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length;
    const h = height * scores[i] / 100;
    if (scores[i] === largest) {
      fill(255, 0, 0);
    } else if (scores[i] === smallest) {
      fill(0, 0, 255);
    } else {
      fill(122);
    }
    rect(i * dx + 2, height - h, dx - 4, h);
    fill(0);
    text(scores[i].toPrecision(3), i * dx, height - h);
  }
}`;

const c9 = `function setup(){
  createCanvas(400, 400);
  background(240);

  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);  

  //平均値
  let average = sum / scores.length;
  console.log(average);  

  //最大値
  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if (largest < scores[i]) {
      largest = scores[i];
    }
  }
  console.log(largest);  

  //最小値
  let smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if (scores[i] < smallest) {
      smallest = scores[i];
    }
  }
  console.log(smallest);

  //棒グラフ
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  noStroke();
  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length;
    const h = height * scores[i] / 100;
    if (scores[i] === largest) {
      fill(255, 0, 0);
    } else if (scores[i] === smallest) {
      fill(0, 0, 255);
    } else {
      fill(122);
    }
    rect(i * dx + 2, height - h, dx - 4, h);
    fill(0);
    text(scores[i].toPrecision(3), i * dx, height - h);
  }

  stroke(0, 255, 0);
  const ah = height * average/100
  line(0, height -  ah, width, height-ah);
}`;

const stateNames = [
  { name: 'start', code: c0 },
 { name: 'genArray_algorithm', code: c0 },
 { name:'genArray_confirm', code: c0 },
 { name:'calc_sum_poicy', code: c1 },
 { name:'calc_sum_algorithm', code: c1 },
 { name:'calc_sum_confirm', code: c1 },
 { name:'calc_ave_policy', code: c2 },
 { name:'calc_ave_algorithm', code: c2 },
 { name:'calc_ave_confirm', code: c2 },
 { name:'calc_max_policy', code: c3 },
 { name:'calc_max_assign_algorithm', code: c3 },
 { name:'calc_max_assign_confirm', code: c3 },
 { name:'calc_max_for_algorithm', code: c3_1 },
 { name:'calc_max_for_confirm', code: c3_1 },
 { name:'calc_min_policy', code: c4 },
 { name:'calc_min_assign_algorithm', code: c4 },
 { name:'calc_min_assign_confirm', code: c4 },
 { name:'calc_min_for_algorithm', code: c4_1 },
 { name:'calc_min_for_confirm', code: c4_1 }, 
 { name:'draw_scale_policy', code: c5 },
 { name:'draw_scale_algorithm', code: c5 },
 { name:'draw_scale_confirm', code: c5 },
 { name:'draw_bar_chart_policy', code: c6 },
 { name:'draw_bar_chart_algorithm', code: c6 },
 { name:'draw_bar_chart_confirm', code: c6 },
 { name:'fill_bar_chart_policy', code: c7 },
 { name:'fill_bar_chart_algorithm', code: c7 },
 { name:'fill_bar_chart_confirm', code: c7 },
 { name:'draw_ave_line_policy', code: c8 },
 { name:'draw_ave_line_algorithm', code: c8 }, 
 { name:'draw_ave_line_confirm', code: c8 },
 { name:'answer', code: c9 },
];

const statesInfo = stateNames.map((sn, i) => {
  const stateName = sn.name;
  const code = sn.code;
  if (i === (stateNames.length - 1)) return {'stateName': stateName, 'code': code, 'nextText': '', 'nextState': '' };
  const nextState = stateNames[i+1].name;
  const nextText = '';
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
  /*
  if (entryData.optionType === 'confirm') {
    let splittedSetup = rowBaseSetupFunction.split('\n');
    splittedSetup.splice(stateEntry.lineNumber, 0, stateEntry.nextText);
    splittedSetup.join('\n');
    entryData.setupFunction = splittedSetup.join('\n');
  }
  */
  entryData.message = '何をしますか?';
  entryData.choices.push({
    text: stateEntry.nextText,
    next: stateEntry.nextState
  });
  problemData[stateEntry.stateName] = entryData;
});

const optionData = {...problemMetaData, ...problemData };

const writeData = JSON.stringify(optionData, null, 2);
fs.writeFileSync('problem_06.json', writeData);


function getOptionTypeFromName(stateName) {
  const optionTypes = ['algorithm', 'confirm'];
  for (const optionTypeName of optionTypes) {
    if (stateName.includes(optionTypeName)) {
      return optionTypeName;
    }
  }
  return 'policy';
}
