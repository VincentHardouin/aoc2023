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
      return {
        position: value.split('@')[0].split(',').map(Number),
        velocity: value.split('@')[1].split(',').map(Number),
      }
    })
}

export {
  getInput,
  parseInputString,
}
