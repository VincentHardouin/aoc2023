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
      const [dir, dist] = line.split(' ')
      const color = line.split('#')[1].split(')')[0]
      return { dir, dist: Number(dist), color }
    })
}

export {
  getInput,
  parseInputString,
}
