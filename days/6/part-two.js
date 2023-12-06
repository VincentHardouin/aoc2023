import { getInput } from './input.js'

function getResult(input = getInput()) {
  const race = input
    .reduce((acc, cur) => {
      return {
        time: Number(`${acc.time}${cur.time}`),
        distance: Number(`${acc.distance}${cur.distance}`),
      }
    }, { time: '', distance: '' })
  return getNumberOfPossibleOptions(race.time, race.distance)
}

function getNumberOfPossibleOptions(time, distance) {
  let wins = 0
  for (let t = 1; t < time; t++) {
    if ((time - t) * t > distance)
      wins++
  }
  return wins
}

export {
  getResult,
  getNumberOfPossibleOptions,
}
