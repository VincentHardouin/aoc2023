import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const __dirname = new URL('.', import.meta.url).pathname

function getInput() {
  return parseInputString(readFileSync(join(__dirname, 'input.txt'), 'utf8').toString())
}

function parseInputString(input) {
  const blocks = input
    .trim()
    .split('\n\n')

  return {
    seeds: blocks[0].split(':')[1].trim().split(' ').map(Number),
    seedToSoil: splitBlocks(blocks[1]),
    soilToFertilizer: splitBlocks(blocks[2]),
    fertilizerToWater: splitBlocks(blocks[3]),
    waterToLight: splitBlocks(blocks[4]),
    lightToTemperature: splitBlocks(blocks[5]),
    temperatureToHumidity: splitBlocks(blocks[6]),
    humidityToLocation: splitBlocks(blocks[7]),
  }
}

function splitBlocks(block) {
  return block.split('\n').slice(1).map(line => line.split(' ').map(Number))
}

export {
  getInput,
  parseInputString,
}
