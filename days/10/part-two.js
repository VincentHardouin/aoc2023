import { getInput } from './input.js'

function getResult(input = getInput()) {
  const startingPosition = getStartingPosition(input)

  const visited = new Set()
  const queue = [startingPosition]

  while (queue.length > 0) {
    const curr = queue.shift()
    visited.add(`${curr.position.i},${curr.position.j}`)
    const neighbors = getNeighbors(curr, input)

    for (const neighbor of neighbors) {
      if (!visited.has(`${neighbor.position.i},${neighbor.position.j}`))
        queue.push(neighbor)
    }
  }

  let count = 0

  input.forEach((row, i) => {
    let rowM = ''
    row.forEach((element, j) => {
      const poly = visited.has(`${i},${j}`)
      if (poly) {
        if (element !== '-')
          rowM += element
      }

      if (!poly && countSubstrings(rowM) & 1) {
        count++
      }
    })
  })

  return count
}

const substringsToCount = ['\\|', 'L7', 'FJ']
const pattern = new RegExp(substringsToCount.join('|'), 'g')
function countSubstrings(inputString) {
  const matches = inputString.match(pattern)
  return matches ? matches.length : 0
}

function getStartingPosition(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'S')
        return { position: { i, j }, value: 'F' }
    }
  }
}

const directions = {
  north: ['|', 'F', '7'],
  south: ['|', 'L', 'J'],
  east: ['-', 'J', '7'],
  west: ['-', 'L', 'F'],
}

const pipes = {
  '|': { north: directions.north, south: directions.south },
  'L': { north: directions.north, east: directions.east },
  'J': { north: directions.north, west: directions.west },
  '-': { east: directions.east, west: directions.west },
  'F': { south: directions.south, east: directions.east },
  '7': { south: directions.south, west: directions.west },
}

function getNeighbors({ position, value }, input) {
  const curr = value
  const { i, j } = position
  const neighbors = {}
  if (i > 0)
    neighbors.north = { value: input[i - 1][j], position: { i: i - 1, j } }
  if (i < input.length - 1)
    neighbors.south = { value: input[i + 1][j], position: { i: i + 1, j } }
  if (j > 0)
    neighbors.west = { value: input[i][j - 1], position: { i, j: j - 1 } }
  if (j < input[i].length - 1)
    neighbors.east = { value: input[i][j + 1], position: { i, j: j + 1 } }

  const n = []
  for (const direction in neighbors) {
    const validDirections = pipes[curr][direction]
    if (validDirections?.includes(neighbors[direction].value))
      n.push(neighbors[direction])
  }

  return n
}

export {
  getResult,
  getStartingPosition,
  getNeighbors,
}
