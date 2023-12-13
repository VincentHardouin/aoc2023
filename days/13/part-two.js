import _ from 'lodash'
import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input.map(findReflection).reduce((acc, val) => acc + val, 0)
}

function findReflection(grid) {
  let horizontalLineToSkip
  let verticalLineToSkip

  for (let i = 1; i < grid.length; i++) {
    const length = Math.min(i, grid.length - i)
    const topPart = grid.slice(i - length, i)
    const bottomPart = grid.slice(i, i + length).reverse()
    if (_.isEqual(topPart, bottomPart)) {
      horizontalLineToSkip = i
      break
    }
  }

  for (let i = 1; i < grid[0].length; i++) {
    const length = Math.min(i, grid[0].length - i)
    const leftPart = grid.map(row => row.slice(i - length, i))
    const rightPart = grid.map(row => row.slice(i, i + length).reverse())
    if (_.isEqual(leftPart, rightPart)) {
      verticalLineToSkip = i
      break
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const copy = grid.map((line) => {
        return line.slice()
      })

      if (copy[y][x] === '#')
        copy[y][x] = '.'
      else
        copy[y][x] = '#'

      for (let i = 1; i < copy.length; i++) {
        if (i === horizontalLineToSkip)
          continue
        const length = Math.min(i, copy.length - i)
        const topPart = copy.slice(i - length, i)
        const bottomPart = copy.slice(i, i + length).reverse()
        if (_.isEqual(topPart, bottomPart))
          return i * 100
      }

      for (let i = 1; i < copy[0].length; i++) {
        if (i === verticalLineToSkip)
          continue
        const length = Math.min(i, copy[0].length - i)
        const leftPart = copy.map(row => row.slice(i - length, i))
        const rightPart = copy.map(row => row.slice(i, i + length).reverse())
        if (_.isEqual(leftPart, rightPart))
          return i
      }
    }
  }
}

export {
  getResult,
  findReflection,
}
