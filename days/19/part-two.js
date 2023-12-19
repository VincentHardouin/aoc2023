import { getInput } from './input.js'

function transform(xmas, [field, comparison, operand, target]) {
  const [min, max] = xmas[field]
  if (comparison === '<') {
    return [
      { ...xmas, [field]: [operand, max] },
      { ...xmas, pos: target, [field]: [min, operand - 1] },
    ]
  }
  return [
    { ...xmas, [field]: [min, operand] },
    { ...xmas, pos: target, [field]: [operand + 1, max] },
  ]
}

function getResult(input = getInput()) {
  const { workflows } = input

  const parts = [{ pos: 'in', x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }]
  const accepted = []

  while (parts.length > 0) {
    let current = parts.pop()
    const workflow = workflows[current.pos]

    for (const step of workflow.steps) {
      const [newCurrent, splitPart] = transform(current, step)
      current = newCurrent
      if (splitPart.pos === 'A')
        accepted.push(splitPart)
      else if (splitPart.pos !== 'R')
        parts.push(splitPart)
    }

    if (workflow.fallthrough === 'A')
      accepted.push({ ...current, pos: 'A' })
    else if (workflow.fallthrough !== 'R')
      parts.push({ ...current, pos: workflow.fallthrough })
  }

  return accepted
    .map(({ x, m, a, s }) => {
      return [x, m, a, s]
        .map(([min, max]) => max - min + 1)
        .reduce((acc, curr) => acc * curr, 1)
    })
    .reduce((acc, curr) => acc + curr, 0)
}

export {
  getResult,
}
