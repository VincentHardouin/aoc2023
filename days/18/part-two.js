import { getInput } from './input.js'

const directions = { R: [0, 1], D: [-1, 0], L: [0, -1], U: [1, 0] }

function getResult(input = getInput()) {
  let pos = [0, 0]
  let perimeter = 0

  const a = input
    .map(({ color }) => {
      const dist = Number.parseInt(color.slice(0, -1), 16)
      const dir = Object.keys(directions)[Number(color.substring(color.length - 1))]
      const [y, x] = directions[dir]
      pos = [pos[0] + dist * y, pos[1] + dist * x]
      perimeter += dist
      return pos
    }).reduce((acc, curr, index, grid) => {
      if (index === grid.length - 1)
        return acc
      const [y, x] = curr
      return acc + (x + grid[index + 1][1]) * (y - grid[index + 1][0])
    }, 0)

  return perimeter / 2 + a / 2 + 1
}

export {
  getResult,
}
