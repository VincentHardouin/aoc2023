import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map((line) => {
      const quantityEachRound = {
        red: [],
        green: [],
        blue: [],
      }
      line.game
        .split(';')
        .forEach((round) => {
          round
            .split(',')
            .forEach((cube) => {
              const cubeInfo = cube.trim().split(' ')
              quantityEachRound[cubeInfo[1]].push(Number.parseInt(cubeInfo[0]))
            })
        })

      return Object.keys(quantityEachRound)
        .map((color) => {
          return Math.max(...quantityEachRound[color])
        })
        .reduce((acc, curr) => acc * curr, 1)
    })
    .reduce((acc, curr) => acc + curr, 0)
}

export {
  getResult,
}
