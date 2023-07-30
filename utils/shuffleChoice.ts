export function shuffleChoice(choices: string[]) {
  let result = [];
  while (choices.length != 0) {
    const randIndex = Math.floor(Math.random() * choices.length);
    const removed = choices.splice(randIndex, 1)[0];
    result.push(removed);
  }
  return result;
}
