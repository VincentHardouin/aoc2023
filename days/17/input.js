import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const __dirname = new URL('.', import.meta.url).pathname

function getInput() {
  return parseInputString(readFileSync(join(__dirname, 'input.txt'), 'utf8').toString())
}

function parseInputString(input) {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      return line.split('').map(char => Number(char))
    })
}

export {
  getInput,
  parseInputString,
}
