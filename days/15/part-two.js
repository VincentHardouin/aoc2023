import { getInput } from './input.js'

function getResult(input = getInput()) {
  const boxes = new Map()

  input.forEach((step) => {
    const [label, operator, focalLength] = step.split(/([=-])/)

    const hashedLabel = getHash(label)

    let box
    if (boxes.has(hashedLabel))
      box = boxes.get(hashedLabel)
    else
      box = boxes.set(hashedLabel, []).get(hashedLabel)

    const i = box.findIndex(l => l.label === label)
    if (operator === '-' && i !== -1) {
      box.splice(i, 1)
    }
    else if (operator === '=') {
      if (i === -1)
        box.push({ label, focalLength })
      else
        box[i].focalLength = focalLength
    }
  })

  return [...boxes]
    .map(([hash, box]) => {
      return box
        .map((l, j) => l.focalLength * (j + 1) * (hash + 1))
        .reduce((acc, curr) => acc + curr, 0)
    }).reduce((acc, curr) => acc + curr, 0)
}

function getHash(str) {
  let hash = 0
  for (const c of str)
    hash = ((hash + c.charCodeAt(0)) * 17) % 256

  return hash
}

export {
  getResult,
}
