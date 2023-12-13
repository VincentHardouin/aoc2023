import _ from 'lodash'
import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input.map(findReflection).reduce((acc, val) => acc + val, 0)
}

function findReflection(grid) {
  const horizontalLine = getSymmetryLine(grid)
  if (horizontalLine)
    return horizontalLine * 100

  const verticalLine = getSymmetryLine(transpose(grid))
  if (verticalLine)
    return verticalLine
}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]))
}

function getSymmetryLine(grid, skipLine = 0) {
  for (let i = 1; i < grid.length; i++) {
    if (i === skipLine)
      continue

    const length = Math.min(i, grid.length - i)
    const topPart = grid.slice(i - length, i)
    const bottomPart = grid.slice(i, i + length).reverse()
    if (_.isEqual(topPart, bottomPart))
      return i
  }
  return null
}

export {
  getResult,
  findReflection,
}
