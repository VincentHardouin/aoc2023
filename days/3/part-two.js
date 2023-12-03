import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .flatMap((line, index) => {
      return [...line.matchAll(/(\*)/g)].map((m) => {
        const adjacentNumbers = findAdjacentNumbers({ inputIndex: index, lineIndex: m.index }, input)
        return adjacentNumbers.length !== 2 ? 0 : adjacentNumbers.reduce((acc, number) => acc * number, 1)
      })
    })
    .reduce((acc, value) => acc + value, 0)
}

function findAdjacentNumbers({ inputIndex, lineIndex }, input) {
  const topIndex = inputIndex - 1
  const bottomIndex = inputIndex + 1
  const startIndexForTopAndBottom = lineIndex - 1 < 0 ? 0 : lineIndex - 1
  const endIndexForTopAndBottom = lineIndex + 1 > input[inputIndex].length - 1 ? input[inputIndex].length - 1 : lineIndex + 1

  const rangeForTopAndBottom = { startIndex: startIndexForTopAndBottom, endIndex: endIndexForTopAndBottom }

  const adjacentNumbers = [
    ...topIndex >= 0 ? findAdjacentNumberInLine(input[topIndex], rangeForTopAndBottom) : [],
    ...bottomIndex <= input.length - 1 ? findAdjacentNumberInLine(input[bottomIndex], rangeForTopAndBottom) : [],
    ...findAdjacentNumberInLine(input[inputIndex], { startIndex: lineIndex - 1, endIndex: lineIndex }),
    ...findAdjacentNumberInLine(input[inputIndex], { startIndex: lineIndex, endIndex: lineIndex + 1 }),
  ]

  return adjacentNumbers
}

function findAdjacentNumberInLine(line, { startIndex, endIndex }) {
  return [...line.matchAll((/(\d+)/g))]
    .filter(match => range(match.index, match.index + match[0].length).some(index => index >= startIndex && index <= endIndex))
    .map(match => Number(match[0]))
}

function range(start, end) {
  return Array.from({ length: end - start }, (v, k) => k + start)
}

export {
  getResult,
  findAdjacentNumberInLine,
  findAdjacentNumbers,
}
