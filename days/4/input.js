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
      const parts = value.split(':')[1].trim().split('|')
      return {
        winningNumbers: parts[0].trim().split(/\s+/).map(value => Number.parseInt(value)),
        numbers: parts[1].trim().split(/\s+/).map(value => Number.parseInt(value)),
        instance: 1,
      }
    })
}

export {
  getInput,
  parseInputString,
}
