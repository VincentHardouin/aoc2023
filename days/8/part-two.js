import { getInput } from './input.js'

function getResult(input = getInput()) {
  const { instructions, steps } = input
  const i = 0
  const startSteps = steps.filter(step => step.stepName.endsWith('A'))
  const currSteps = [...startSteps.map(step => step.stepName)]

  return currSteps
    .map((step) => {
      return getStepCount(step, steps, instructions)
    })
    .reduce(leastCommonMultiple, 1)
}

function getStepCount(start, steps, instructions) {
  let i = 0
  let cur = start
  while (!cur.endsWith('Z')) {
    const instruction = instructions.charAt(i % instructions.length)
    const step = steps.find(step => step.stepName === cur)
    cur = step[instruction]
    i++
  }
  return i
}

function leastCommonMultiple(a, b) {
  return (a / greatestCommonDivisor(a, b)) * b
}

function greatestCommonDivisor(a, b) {
  if (b === 0)
    return a
  else
    return greatestCommonDivisor(b, a % b)
}

export {
  getResult,
}
