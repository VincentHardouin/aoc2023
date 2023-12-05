import _ from 'lodash'
import { getInput } from './input.js'

function getResult(input = getInput()) {
  const seedsWithRange = _.chunk(input.seeds, 2)

  const location = seedsWithRange
    .map(([seed, range]) => {
      return {
        start: seed,
        end: seed + range,
      }
    })
    .flatMap(seed => convertToDestination(seed, input.seedToSoil))
    .flatMap(seed => convertToDestination(seed, input.soilToFertilizer))
    .flatMap(seed => convertToDestination(seed, input.fertilizerToWater))
    .flatMap(seed => convertToDestination(seed, input.waterToLight))
    .flatMap(seed => convertToDestination(seed, input.lightToTemperature))
    .flatMap(seed => convertToDestination(seed, input.temperatureToHumidity))
    .flatMap(seed => convertToDestination(seed, input.humidityToLocation))
  return Math.min(...location.map(({ start }) => start))
}

function convertToDestination({ start, end }, destinationBlocks) {
  const results = []

  let current = start

  while (current <= end) {
    const currentBlock = destinationBlocks.find(([_, source, range]) => source <= current && current < source + range)

    if (currentBlock) {
      const [destination, source, range] = currentBlock
      const maxCovered = Math.min(end - source + destination, destination + range - 1)
      const nextSource = { start: current - source + destination, end: maxCovered }
      results.push(nextSource)
      current = Math.min(end + 1, current + nextSource.end - nextSource.start + 1)
    }
    else {
      const nextBlock = destinationBlocks.find(([_, source, range]) => current < source && current + range >= source)
      if (!nextBlock) {
        results.push({ start: current, end })
        current = end + 1
      }
      else {
        results.push({ start: current, end: nextBlock[1] - 1 })
        current = nextBlock[1]
      }
    }
  }

  return results
}

export {
  getResult,
}
