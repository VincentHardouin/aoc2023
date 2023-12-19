import { getInput } from './input.js'

function matchRule(xmas, [field, comparison, operand, target]) {
  if (comparison === '<')
    return xmas[field] < operand && target

  return xmas[field] > operand && target
}

function getResult(input = getInput()) {
  const { workflows, parts } = input
  return parts
    .filter(([x, m, a, s]) => {
      let current = workflows.in
      while (current) {
        const next = current.steps
          .map(step => matchRule({ x, m, a, s }, step))
          .find(Boolean) || current.fallthrough
        if (next === 'A')
          return true
        else if (next === 'R')
          return false

        current = workflows[next]
      }
    })
    .map((val) => {
      return val.reduce((acc, curr) => acc + curr, 0)
    })
    .reduce((acc, curr) => acc + curr, 0)
}

export {
  getResult,
}
