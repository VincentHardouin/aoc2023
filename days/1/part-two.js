import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map((value) => {
      const { first, last } = extractFirstAndLastDigit(value)
      return Number(`${first}${last}`)
    })
    .reduce((acc, value) => {
      return acc + value
    }, 0)
}

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

function getDigit(str) {
  return numberWords[str] ?? Number.parseInt(str)
}

function extractFirstAndLastDigit(str) {
  const regex = new RegExp(`(?=(\\d|${Object.keys(numberWords).join('|')}))`, 'g')

  const matches = [...str.matchAll(regex)]
  const first = getDigit(matches.at(0)[1])
  const last = getDigit(matches.at(-1)[1])

  return { first, last }
}

export {
  getResult,
  extractFirstAndLastDigit,
}
