import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map((value) => {
      return value.at(0) * 10 + value.at(-1)
    })
    .reduce((acc, value) => {
      return acc + value
    }, 0)
}

export {
  getResult,
}
