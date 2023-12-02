import { getInput } from './input.js'

const rules = {
  red: 12,
  green: 13,
  blue: 14,
}
function getResult(input = getInput()) {
  return input
    .filter((line) => {
      return line.game
        .split(';')
        .map((round) => {
          return round
            .split(',')
            .map((cube) => {
              const cubeInfo = cube.trim().split(' ')
              return isRespectingRules({
                color: cubeInfo[1],
                count: Number.parseInt(cubeInfo[0]),
              })
            })
            .every(isRespecting => isRespecting)
        })
        .every(isRespecting => isRespecting)
    })
    .map(line => line.gameId)
    .reduce((acc, curr) => acc + curr, 0)
}

function isRespectingRules({ color, count }) {
  return rules[color] >= count
}

export {
  getResult,
}
