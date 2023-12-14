import { getInput } from './input.js'

const gridCache = new Map()

function getResult(input = getInput()) {
  let tilted = input
  for (let i = 0; i < 1_000_000_000; i++) {
    tilted = spinCycle(tilted)
    const gridKey = tilted.map(l => l.join()).join('\n')
    if (gridCache.has(gridKey)) {
      const cycleLength = i - gridCache.get(gridKey)
      const cyclesLeft = Math.floor((1_000_000_000 - i) / cycleLength)
      i += cyclesLeft * cycleLength
    }
    else {
      gridCache.set(gridKey, i)
    }
  }

  return tilted
    .map(row => row.filter(c => c === 'O').length)
    .reduce((acc, row, i) => acc + (tilted.length - i) * row, 0)
}

const lineCache = new Map()

const tiltNorthCache = new Map()

function tiltNorth(grid) {
  const gridKey = grid.map(l => l.join()).join('\n')
  if (tiltNorthCache.has(gridKey))
    return tiltNorthCache.get(gridKey)

  const g = transpose(grid)

  for (let i = 0; i < g.length; i++) {
    if (lineCache.has(g[i].join())) {
      lineCache.get(g[i].join())
      continue
    }

    for (let j = 1; j < g[i].length; j++) {
      if (g[i][j] === 'O') {
        for (let k = j - 1; k >= 0; k--) {
          if (g[i][k] === 'O' || g[i][k] === '#') {
            g[i][j] = '.'
            g[i][k + 1] = 'O'
            break
          }
          if (k === 0) {
            g[i][k] = 'O'
            g[i][j] = '.'
          }
        }
      }
    }

    lineCache.set(g[i].join(), g[i])
  }

  const transposeGrid = transpose(g)
  tiltNorthCache.set(gridKey, transposeGrid)
  return transposeGrid
}

function tiltWest(grid) {
  const gr = rotateClockwise(grid)
  const r = tiltNorth(gr)
  return rotateCounterClockwise(r)
}

function tiltEast(grid) {
  const gr = rotateCounterClockwise(grid)
  const r = tiltNorth(gr)
  return rotateClockwise(r)
}

function tiltSouth(grid) {
  const gr = rotateCounterClockwise(grid)
  const gr2 = rotateCounterClockwise(gr)

  const r = tiltNorth(gr2)

  return rotateClockwise(rotateClockwise(r))
}

function spinCycle(grid) {
  return tiltEast(tiltSouth(tiltWest(tiltNorth(grid))))
}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]))
}

function rotateClockwise(matrix) {
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}

function rotateCounterClockwise(matrix) {
  return matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index]))
}

export {
  getResult,
  tiltNorth,
  tiltWest,
  tiltEast,
  tiltSouth,
  spinCycle,
}
