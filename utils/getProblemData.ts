import { generate } from 'escodegen';
import { parseScript } from 'esprima';
import { replace } from 'estraverse';
import * as fs from 'fs';
import * as path from 'path';


const p5MethodsPath = path.join(process.cwd(), 'public', 'data', 'p5_methods.json');
const p5Methods = JSON.parse(fs.readFileSync(p5MethodsPath).toString());
const genReplaceNode = (viewWidth: number, viewHeight: number) => {
  return {
    "type": "VariableDeclaration",
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": "cnv"
        },
        "init": {
          "type": "CallExpression",
          "callee": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "p5.createCanvas"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": viewWidth,
                  "raw": `${viewWidth}`
                },
                {
                  "type": "Literal",
                  "value": viewHeight,
                  "raw": `${viewHeight}`
                }
              ]
            },
            "property": {
              "type": "Identifier",
              "name": "parent"
            }
          },
          "arguments": [
            {
              "type": "Identifier",
              "name": "canvasParentRef"
            }
          ]
        }
      }
    ],
    "kind": "let"
  };
};


export const getProblemData = async (context: any, id: string) => {
  let problemState = 'start';
  if (context.query.problemState !== undefined) {
    problemState = context.query.problemState;
  }

  const filename = `problems/problem_0${id}.json`;
  const problemDataPath = path.join(process.cwd(), 'public', 'data', filename);

  const problemData = JSON.parse(fs.readFileSync(problemDataPath).toString());
  const problemDataContent = problemData[problemState];
  const viewWidth = problemData.viewWidth;
  const viewHeight = problemData.viewHeight;
  const canvasWidth = problemData.canvasWidth;
  const canvasHeight = problemData.canvasHeight;

  const setupFunction = problemDataContent.setupFunction;
  const drawFunction = problemDataContent.drawFunction ?? '';

  let setupAst: any = '';
  let instancedSetup: string = '';

  try {
    setupAst = parseScript(setupFunction);
    replace(setupAst, {
      enter: function(node: any) {
        if (node.type === 'CallExpression') {
          const functionName = node.callee.name;
          if (p5Methods.includes(functionName)) node.callee.name = 'p5.' + functionName;
          return node;
        } else if (node.type === 'ExpressionStatement'
                   && node.expression.callee !== null
                   && node.expression.type !== 'AssignmentExpression'
                   && node.expression.callee.name === 'createCanvas') {
          return genReplaceNode(canvasWidth, canvasHeight);
        }else {
          return node;
        }
      }
    });

    const resizeSnippet = `
cnv.style("width", "${viewWidth}px");
cnv.style("height", "${viewHeight}px");
      `;
    let setupFuncIdx: number = setupAst.body.length - 1;
    if (id === '7') {
      const declaredFunctions = Object.values(setupAst.body).map((v: any) => v.id.name);
      if (declaredFunctions.includes('setup')) {
        setupFuncIdx = declaredFunctions.findIndex(e => e == 'setup');
      }
    }
    let snippet = '';
    for (let i = setupFuncIdx+1; i < setupAst.body.length; i++) {
      snippet += '\n' + generate(setupAst.body[i]);
    }

    if (setupFuncIdx === 0) {
      setupAst.body = setupAst.body[setupFuncIdx].body.body;
    } else {
      const setupFuncBody = setupAst.body[setupFuncIdx].body;
      const cnvDeclaration = setupFuncBody.body[0];
      setupAst.body[setupFuncIdx] = cnvDeclaration;
    }

    instancedSetup = (setupAst !== '') ? generate(setupAst) : '';
    instancedSetup += snippet;
    instancedSetup += resizeSnippet;
  } catch(e) {
    console.log(e);
  }

  let instancedDraw ='';
  if (drawFunction !== '') {
    let drawAst: any = '';
    try {
      drawAst = parseScript(drawFunction);
      replace(drawAst, {
        enter: function(node: any) {
          if (node.type === 'CallExpression') {
            const functionName = node.callee.name;
            if (p5Methods.includes(functionName)) node.callee.name = 'p5.' + functionName;
            return node;
          }
        }
      });
    const drawFuncIdx: number = drawAst.body.length - 1;
    drawAst.body[0] = drawAst.body[drawFuncIdx].body;
    } catch(e) {
      console.log(e);
    }
    instancedDraw = (drawAst !== '') ? generate(drawAst) : '';
  }

  const message = problemDataContent.message ?? '';
  const isExecutable = problemDataContent.isExecutable ?? true;

  console.log(instancedSetup);
  return {
    props : {
      id: id,
      problem: problemData.problem,
      problemId: problemData.problemId,
      message: message,
      problemState: problemState,
      optionType: problemDataContent.optionType,
      viewWidth: viewWidth,
      viewHeight: viewHeight,
      isExecutable: isExecutable,
      setupFunction: setupFunction,
      drawFunction: drawFunction,
      instancedSetup: instancedSetup,
      instancedDraw: instancedDraw,
      choices: problemDataContent.choices,
    },
  };
};
