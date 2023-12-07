import { getInput } from './input.js'

function getResult(input = getInput()) {
  const sortedHand = input.sort(sortHand).reverse()
  return sortedHand.reduce((acc, cur, index) => acc + (index + 1) * cur.bid, 0)
}

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

function sortHand(a, b) {
  const rankA = getHand(a)
  const rankB = getHand(b)
  if (rankA !== rankB)
    return rankA - rankB

  for (let i = 0; i < 5; i++) {
    if (ranks.indexOf(a.hand[i]) > ranks.indexOf(b.hand[i]))
      return -1
    if (ranks.indexOf(a.hand[i]) < ranks.indexOf(b.hand[i]))
      return 1
  }

  return 0
}

function getHand({ hand }) {
  const cards = new Map()
  for (const card of hand) {
    if (!cards.has(card))
      cards.set(card, 1)
    else
      cards.set(card, cards.get(card) + 1)
  }

  if (cards.size === 1)
    return 1
  if (cards.size === 2) {
    const [a, b] = [...cards.keys()]
    if (cards.get(a) === 4 || cards.get(b) === 4)
      return 2
    return 3
  }
  if (cards.size === 3) {
    const [a, b, c] = [...cards.keys()]
    if (cards.get(a) === 3 || cards.get(b) === 3 || cards.get(c) === 3)
      return 4
    return 5
  }
  if (cards.size === 4)
    return 6
  return 7
}

export {
  getResult,
}
