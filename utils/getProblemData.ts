import { generate } from 'escodegen';
import { parseScript } from 'esprima';
import { replace } from 'estraverse';
import * as fs from 'fs';
import * as path from 'path';


const genReplaceNode = (canvasWidth: number, canvasHeight: number) => {
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
                  "value": canvasWidth,
                  "raw": `${canvasWidth}`
                },
                {
                  "type": "Literal",
                  "value": canvasHeight,
                  "raw": `${canvasHeight}`
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

export const getProblemData = async (context: any, filename: string, canvasWidth: number, canvasHeight: number) => {
  let problemState = 'start';
  if (context.query.problemState !== undefined) {
    problemState = context.query.problemState;
  }

  const problemDataPath = path.join(process.cwd(), 'public', 'data', filename);
  const p5MethodsPath = path.join(process.cwd(), 'public', 'data', 'p5_methods.json');

  const p5Methods = JSON.parse(fs.readFileSync(p5MethodsPath).toString());
  const problemData = JSON.parse(fs.readFileSync(problemDataPath).toString());
  const problemDataContent = problemData[problemState];

  const sourceCode = problemDataContent.sourceCode;

  let ast: any = '';
  try {
    ast = parseScript(sourceCode);
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

  }

  let instanceSource: string = ast !== '' ? generate(ast) : '';
  if (canvasWidth / canvasHeight === 1 && 400 <= canvasWidth) {
    const resizeSnippet = `
    cnv.style("width", "140px");
    cnv.style("height", "140px");
    `;
    instanceSource += resizeSnippet;
  }
  const documentUrl = problemDataContent.documentUrl ?? ''; 
  const suggestion = problemDataContent.suggestion ?? '';
  const message = problemDataContent.message ?? '';
  const tabIndex = problemDataContent.tabIndex ?? 0;
  const isExecutable = problemDataContent.isExecutable ?? true;

  return {
    props : {
      problem: problemData.problem,
      problemState: problemState,
      optionType: problemDataContent.optionType,
      suggestion: suggestion,
      isExecutable: isExecutable,
      documentUrl: documentUrl,
      sourceCode: sourceCode,
      message: message,
      tabIndex: tabIndex,
      instanceSource: instanceSource,
      choices: problemDataContent.choices,
    },
  };
};
