import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map((card) => {
      const winningNumbers = new Set(card.winningNumbers)
      const filteredNumbers = card.numbers
        .filter(number => winningNumbers.has(number))
      return filteredNumbers.reduce((a, b) => {
        if (a === 0)
          return 1
        else
          return a * 2
      }, 0)
    })
    .reduce((a, b) => a + b, 0)
}

export {
  getResult,
}
