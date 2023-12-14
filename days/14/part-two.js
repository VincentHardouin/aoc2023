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

class Tilt {
  constructor(grid) {
    this.grid = grid
  }

  north() {
    const g = transpose(this.grid)

    for (let i = 0; i < g.length; i++) {
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
    }

    this.grid = transpose(g)
    return this
  }

  west() {
    this
      .rotateClockwise()
      .north()
      .rotateCounterClockwise()

    return this
  }

  east() {
    this
      .rotateCounterClockwise()
      .north()
      .rotateClockwise()

    return this
  }

  south() {
    this
      .rotateCounterClockwise()
      .rotateCounterClockwise()
      .north()
      .rotateClockwise()
      .rotateClockwise()
    return this
  }

  rotateClockwise() {
    this.grid = this.grid[0].map((val, index) => this.grid.map(row => row[index]).reverse())
    return this
  }

  rotateCounterClockwise() {
    this.grid = this.grid[0].map((val, index) => this.grid.map(row => row[row.length - 1 - index]))
    return this
  }
}

function spinCycle(grid) {
  return new Tilt(grid)
    .north()
    .west()
    .south()
    .east()
    .grid
}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]))
}

export {
  getResult,
  spinCycle,
  Tilt,
}
