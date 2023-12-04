import { getInput } from './input.js'

function getResult(input = getInput()) {
  input
    .forEach((card, index) => {
      const winningNumbers = new Set(card.winningNumbers)
      const cardsWons = card.numbers
        .filter(number => winningNumbers.has(number))

      cardsWons.forEach((cardWon, cardIndex) => {
        input[index + 1 + cardIndex].instance += 1 * card.instance
      })
    })

  return input.reduce((a, b) => a + b.instance, 0)
}

export {
  getResult,
}
