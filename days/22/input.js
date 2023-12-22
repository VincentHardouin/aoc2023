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
    .map((value) => {
      const [start, end] = value.split('~')
      return {
        start: start.split(',').map(Number),
        end: end.split(',').map(Number),
      }
    })
}

export {
  getInput,
  parseInputString,
}
