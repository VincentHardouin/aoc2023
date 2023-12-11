import { getInput } from './input.js'

function getResult(input = getInput()) {
  const galaxiesByY = []
  input
    .forEach((line, y) => {
      galaxiesByY[y] = []
      for (let x = 0; x < line.length; x++) {
        if (line[x] === '#')
          galaxiesByY[y].push(x)
      }
    })

  const emptyY = []
  const emptyX = []

  for (let y = 0; y < galaxiesByY.length; y++) {
    if (galaxiesByY[y].length === 0)
      emptyY.push(y)
  }

  for (let x = 0; x < input[0].length; x++) {
    if (!galaxiesByY.find(a => a.includes(x)))
      emptyX.push(x)
  }

  const expand = 1000000 - 1
  const expanded = galaxiesByY.flatMap((galaxie, y) => {
    return galaxie.map((x) => {
      return [
        x + emptyX.filter(ex => ex < x).length * expand,
        y + emptyY.filter(ey => ey < y).length * expand,
      ]
    })
  })

  return expanded.reduce((acc, galaxie1, i) => {
    return expanded.slice(i + 1)
      .reduce((acc2, galaxie2) => {
        return acc2 + Math.abs(galaxie2[0] - galaxie1[0]) + Math.abs(galaxie2[1] - galaxie1[1])
      }, acc)
  }, 0)
}

export {
  getResult,
}
