import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map((race) => {
      return getNumberOfPossibleOptions(race.time, race.distance)
    })
    .reduce((acc, cur) => { return acc * cur }, 1)
}

function getNumberOfPossibleOptions(time, distance) {
  return Array.from({ length: time }, (_, i) => i + 1)
    .map((holdTime) => {
      const distance = getDistance(holdTime, time)
      return { holdTime, distance }
    })
    .filter(options => options.distance > distance)
    .length
}

function getDistance(holdTime, raceTime) {
  const speed = holdTime * 1
  return (raceTime - holdTime) * speed
}

export {
  getResult,
  getNumberOfPossibleOptions,
}
