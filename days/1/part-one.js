import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map((value) => {
      const digits = value
        .split('')
        .map((v) => {
          return Number.parseInt(v, 10)
        })
        .filter((v) => {
          return !Number.isNaN(v)
        })
      return digits.at(0) * 10 + digits.at(-1)
    })
    .reduce((acc, value) => {
      return acc + value
    }, 0)
}

export {
  getResult,
}
