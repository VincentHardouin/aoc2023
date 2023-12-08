import { getInput } from './input.js'

function getResult(input = getInput()) {
  const { instructions, steps } = input
  let i = 0
  let cur = 'AAA'
  while (cur !== 'ZZZ') {
    const instruction = instructions.charAt(i % instructions.length)
    const step = steps.find(step => step.stepName === cur)
    cur = step[instruction]
    i++
  }
  return i
}

export {
  getResult,
}
