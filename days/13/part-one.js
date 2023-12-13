import _ from 'lodash'
import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input.map(findReflection).reduce((acc, val) => acc + val, 0)
}

function findReflection(grid) {
  for (let i = 1; i < grid.length; i++) {
    const length = Math.min(i, grid.length - i)
    const topPart = grid.slice(i - length, i)
    const bottomPart = grid.slice(i, i + length).reverse()
    if (_.isEqual(topPart, bottomPart))
      return i * 100
  }

  for (let i = 1; i < grid[0].length; i++) {
    const length = Math.min(i, grid[0].length - i)
    const leftPart = grid.map(row => row.slice(i - length, i))
    const rightPart = grid.map(row => row.slice(i, i + length).reverse())
    if (_.isEqual(leftPart, rightPart))
      return i
  }
}

export {
  getResult,
  findReflection,
}
