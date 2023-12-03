import _ from 'lodash'
import { getInput } from './input.js'

function getResult(input = getInput()) {
  const numberWithGears = input.flatMap((line, index) => {
    const matches = line.matchAll(/(\d+)/g)
    return [...matches].flatMap((m) => {
      const match = {
        inputIndex: index,
        length: m[0].length,
        startIndex: m.index,
        endIndex: m.index + m[0].length,
        value: Number(m[0]),
      }
      return {
        ...match,
        gearsPositions: getGearsSymbolPositions(match, input),
      }
    })
  })

  const gears = numberWithGears
    .map((number) => {
      return {
        adjacentNumbers: number.gearsPositions.flatMap(gearPosition => findAdjacentNumbers(gearPosition, numberWithGears)),
      }
    })
    .filter(({ adjacentNumbers }) => adjacentNumbers.length > 0)

  return gears.reduce((acc, gear) => {
    const isDuplicate = acc.some((existingGear) => {
      if (existingGear.adjacentNumbers.length === gear.adjacentNumbers.length) {
        return existingGear.adjacentNumbers.every((adjacentNumber) => {
          return gear.adjacentNumbers.some(gearAdjacentNumber => _.isEqual(adjacentNumber, gearAdjacentNumber))
        })
      }
      return false
    })

    if (isDuplicate)
      return acc

    return [...acc, gear]
  }, [])
    .filter(({ adjacentNumbers }) => adjacentNumbers.length === 2)
    .map(({ adjacentNumbers }) => adjacentNumbers.reduce((acc, { value }) => acc * value, 1))
    .reduce((acc, value) => acc + value, 0)
}

function getGearsSymbolPositions(match, input) {
  const { inputIndex, startIndex, endIndex } = match
  const topIndex = inputIndex - 1
  const bottomIndex = inputIndex + 1

  const startIndexForTopAndBottom = startIndex - 1 < 0 ? 0 : startIndex - 1
  const endIndexForTopAndBottom = endIndex + 1 > input[inputIndex].length - 1 ? input[inputIndex].length - 1 : endIndex + 1

  const gearSymbolPositions = []
  if (input[inputIndex].slice(startIndex - 1, startIndex).includes('*')) {
    gearSymbolPositions.push({
      lineIndex: input[inputIndex].indexOf('*'),
      inputIndex,
    })
  }
  if (input[inputIndex].slice(endIndex, endIndex + 1).includes('*')) {
    gearSymbolPositions.push({
      lineIndex: input[inputIndex].indexOf('*'),
      inputIndex,
    })
  }
  if (topIndex >= 0 && input[topIndex].slice(startIndexForTopAndBottom, endIndexForTopAndBottom).includes('*')) {
    gearSymbolPositions.push({
      lineIndex: input[topIndex].indexOf('*'),
      inputIndex: topIndex,
    })
  }
  if (bottomIndex <= input.length - 1 && input[bottomIndex].slice(startIndexForTopAndBottom, endIndexForTopAndBottom).includes('*')) {
    gearSymbolPositions.push({
      lineIndex: input[bottomIndex].indexOf('*'),
      inputIndex: bottomIndex,
    })
  }

  return gearSymbolPositions
}

function findAdjacentNumbers(gearPosition, numbersWithAdjacentGears) {
  return numbersWithAdjacentGears.filter(({ gearsPositions }) => {
    return gearsPositions.some(({ lineIndex, inputIndex }) => {
      return lineIndex === gearPosition.lineIndex && inputIndex === gearPosition.inputIndex
    })
  })
}

export {
  getResult,
}
