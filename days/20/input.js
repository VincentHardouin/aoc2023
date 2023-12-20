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
      return {
        type: line[0],
        moduleName: line.split(' ')[0].slice(1),
        destinations: line.split('->')[1].trim().split(',').map(v => v.trim()),
      }
    })
}

export {
  getInput,
  parseInputString,
}
