import { generate } from 'escodegen';
import { parseScript } from 'esprima';
import { replace } from 'estraverse';
import * as fs from 'fs';
import * as path from 'path';


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
  const p5MethodsPath = path.join(process.cwd(), 'public', 'data', 'p5_methods.json');

  const p5Methods = JSON.parse(fs.readFileSync(p5MethodsPath).toString());
  const problemData = JSON.parse(fs.readFileSync(problemDataPath).toString());
  const problemDataContent = problemData[problemState];
  const viewWidth = problemData.viewWidth;
  const viewHeight = problemData.viewHeight;
  const canvasWidth = problemData.canvasWidth;
  const canvasHeight = problemData.canvasHeight;

  const setupFunction = problemDataContent.setupFunction;
  const drawFunction = problemDataContent.drawFunction ?? '';

  let ast: any = '';
  try {
    ast = parseScript(setupFunction);
    replace(ast, {
      enter: function(node: any) {
        if (node.type === 'CallExpression') {
          const functionName = node.callee.name;
          if (p5Methods.includes(functionName)) node.callee.name = 'p5.' + functionName;
          return node;
        } else if (node.type === 'ExpressionStatement' && node.expression.callee.name === 'createCanvas') {
          return genReplaceNode(canvasWidth, canvasHeight);
        }
      }
    });
    ast.body = ast.body[0].body.body;
  } catch(e) {
    console.log(e);
  }

  let instancedSetup: string = ast !== '' ? generate(ast) : '';
  const resizeSnippet = `
  cnv.style("width", "${viewWidth}px");
  cnv.style("height", "${viewHeight}px");
  `;
  instancedSetup += resizeSnippet;
  const message = problemDataContent.message ?? '';
  const isExecutable = problemDataContent.isExecutable ?? true;

  return {
    props : {
      id: id,
      problem: problemData.problem,
      problemId: problemData.problemId,
      problemState: problemState,
      optionType: problemDataContent.optionType,
      isExecutable: isExecutable,
      setupFunction: setupFunction,
      drawFunction: drawFunction,
      instancedSetup: instancedSetup,
      message: message,
      choices: problemDataContent.choices,
      viewWidth: viewWidth,
      viewHeight: viewHeight
    },
  };
};
