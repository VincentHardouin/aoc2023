import { getInput } from './input.js'

function getResult(input = getInput()) {
  const tilted = tiltNorth(input)

  return tilted
    .map(row => row.filter(c => c === 'O').length)
    .reduce((acc, row, i) => acc + (tilted.length - i) * row, 0)
}

function tiltNorth(grid) {
  const g = transpose(grid)

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

  return transpose(g)
}

export {
  getResult,
  tiltNorth,
}
