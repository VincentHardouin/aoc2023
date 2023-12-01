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
      return value.split('')
        .map((v) => {
          return Number.parseInt(v, 10)
        })
        .filter((v) => {
          return !Number.isNaN(v)
        })
    })
}

export {
  getInput,
  parseInputString,
}
