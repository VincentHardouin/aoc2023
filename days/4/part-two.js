import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map((card, index) => {
      const winningNumbers = new Set(card.winningNumbers)
      card.numbers
        .filter(number => winningNumbers.has(number))
        .forEach((cardWon, cardIndex) => {
          input[index + 1 + cardIndex].instance += 1 * card.instance
        })
      return card.instance
    })
    .reduce((a, b) => a + b, 0)
}

export {
  getResult,
}
