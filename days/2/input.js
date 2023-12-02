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
      const parts = line.split(':')
      const gameId = Number(parts[0].split(' ').at('-1'))
      return {
        gameId,
        game: parts[1].trim(),
      }
    })
}

export {
  getInput,
  parseInputString,
}
