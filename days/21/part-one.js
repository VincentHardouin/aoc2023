import { getInput } from './input.js'

function getResult(input = getInput(), iterations = 64) {
  const start = getStart(input)

  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  let queue = new Map()
  queue.set(JSON.stringify(start), start)

  for (let i = 0; i < iterations; i++) {
    const next = new Map()
    for (const pos of queue.values()) {
      dirs.forEach((dir) => {
        const dest = [pos[0] + dir[0], pos[1] + dir[1]]
        if (dest[0] >= 0
          && dest[0] < input.length
          && dest[1] >= 0
          && dest[1] < input[0].length
          && input[dest[0]][dest[1]] !== '#')
          next.set(JSON.stringify(dest), dest)
      })
    }
    queue = next
  }
  return queue.size
}

function getStart(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'S')
        return [i, j]
    }
  }
}

export {
  getResult,
}
