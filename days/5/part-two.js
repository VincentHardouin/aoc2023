import _ from 'lodash'
import { getInput } from './input.js'

function getResult(input = getInput()) {
  const seedsWithRange = _.chunk(input.seeds, 2)

  const location = seedsWithRange
    .map(([seed, range]) => _.range(seed, seed + range))
    .map((seeds) => {
      const location = seeds
        .map(seed => convertToDestination(seed, input.seedToSoil))
        .map(seed => convertToDestination(seed, input.soilToFertilizer))
        .map(seed => convertToDestination(seed, input.fertilizerToWater))
        .map(seed => convertToDestination(seed, input.waterToLight))
        .map(seed => convertToDestination(seed, input.lightToTemperature))
        .map(seed => convertToDestination(seed, input.temperatureToHumidity))
        .map(seed => convertToDestination(seed, input.humidityToLocation))
      return Math.min(...location)
    })
  return Math.min(...location)
}

function convertToDestination(seed, destinationBlock) {
  const destination = destinationBlock.find(([_, source, range]) => {
    return seed >= source && seed <= source + range
  })

  if (destination)
    return seed - destination[1] + destination[0]

  return seed
}

export {
  getResult,
}
