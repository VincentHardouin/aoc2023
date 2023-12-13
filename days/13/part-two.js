import _ from 'lodash'
import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input.map(findReflection).reduce((acc, val) => acc + val, 0)
}

function findReflection(grid) {
  const horizontalLineToSkip = getSymmetryLine(grid)
  const verticalLineToSkip = getSymmetryLine(transpose(grid))

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const copy = grid.map((line) => {
        return line.slice()
      })

      if (copy[y][x] === '#')
        copy[y][x] = '.'
      else
        copy[y][x] = '#'

      const horizontalLine = getSymmetryLine(copy, horizontalLineToSkip)
      if (horizontalLine)
        return horizontalLine * 100

      const verticalLine = getSymmetryLine(transpose(copy), verticalLineToSkip)
      if (verticalLine)
        return verticalLine
    }
  }
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
