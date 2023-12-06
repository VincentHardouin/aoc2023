import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const __dirname = new URL('.', import.meta.url).pathname

function getInput() {
  return parseInputString(readFileSync(join(__dirname, 'input.txt'), 'utf8').toString())
}

function parseInputString(input) {
  const line = input
    .trim()
    .split('\n')
  const time = line[0].split(':')[1].trim().split(/\s+/).map(n => Number(n))
  const distance = line[1].split(':')[1].trim().split(/\s+/).map(n => Number(n))

  return time.map((time, i) => ({ time, distance: distance[i] }))
}

export {
  getInput,
  parseInputString,
}
