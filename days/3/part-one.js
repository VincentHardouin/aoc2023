import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input.map((line, index) => {
    const matches = line.matchAll(/(\d+)/g)
    return [...matches].map((match) => {
      return {
        inputIndex: index,
        length: match[0].length,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        value: Number(match[0]),
      }
    })
      .filter(match => hasAdjacentSymbol(match, input))
      .reduce((acc, match) => acc + match.value, 0)
  })
    .reduce((acc, value) => acc + value, 0)
}

function hasAdjacentSymbol(match, input) {
  const { inputIndex, startIndex, endIndex } = match
  const topIndex = inputIndex - 1
  const bottomIndex = inputIndex + 1

  const startIndexForTopAndBottom = startIndex - 1 < 0 ? 0 : startIndex - 1
  const endIndexForTopAndBottom = endIndex + 1 > input[inputIndex].length - 1 ? input[inputIndex].length - 1 : endIndex + 1

  const stringToCheck = [
    input[inputIndex].slice(startIndex - 1, startIndex), // checkLeft
    input[inputIndex].slice(endIndex, endIndex + 1), // checkRight
    ...topIndex >= 0 ? [input[topIndex].slice(startIndexForTopAndBottom, endIndexForTopAndBottom)] : [], // checkTop
    ...bottomIndex <= input.length - 1 ? [input[bottomIndex].slice(startIndexForTopAndBottom, endIndexForTopAndBottom)] : [], // checkBottom
  ]

  return stringToCheck.some(string => isContainingSymbol(string))
}

function isContainingSymbol(stringToCheck) {
  return !stringToCheck.split('').every(symbol => symbol === '.')
}

export {
  getResult,
}
