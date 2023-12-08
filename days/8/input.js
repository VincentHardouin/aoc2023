import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const __dirname = new URL('.', import.meta.url).pathname

function getInput() {
  return parseInputString(readFileSync(join(__dirname, 'input.txt'), 'utf8').toString())
}

function parseInputString(input) {
  const [instructions, steps] = input
    .trim()
    .split('\n\n')

  const stepsArray = steps.split('\n').map((step) => {
    const [stepName, stepDirections] = step.split('=')
    return {
      stepName: stepName.trim(),
      L: stepDirections.split(',')[0].trim().slice(1),
      R: stepDirections.split(',')[1].trim().slice(0, -1),
    }
  })

  return {
    instructions,
    steps: stepsArray,
  }
}

export {
  getInput,
  parseInputString,
}
