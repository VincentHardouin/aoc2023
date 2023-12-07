import { getInput } from './input.js'

function getResult(input = getInput()) {
  const sortedHand = input.sort(sortHand).reverse()
  return sortedHand.reduce((acc, cur, index) => acc + (index + 1) * cur.bid, 0)
}

const ranks = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

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
  const HandType = {
    FIVE_OF_A_KIND: 1,
    FOUR_OF_A_KIND: 2,
    FULL_HOUSE: 3,
    THREE_OF_A_KIND: 4,
    TWO_PAIR: 5,
    ONE_PAIR: 6,
    HIGH_CARD: 7,
  }

  const cards = new Map()
  for (const card of hand) {
    if (!cards.has(card))
      cards.set(card, 1)
    else
      cards.set(card, cards.get(card) + 1)
  }

  const jokerCount = cards.get('J') || 0

  if (!jokerCount) {
    if (cards.size === 1)
      return HandType.FIVE_OF_A_KIND
    if (cards.size === 2) {
      const [a, b] = [...cards.keys()]
      if (cards.get(a) === 4 || cards.get(b) === 4)
        return HandType.FOUR_OF_A_KIND
      return HandType.FULL_HOUSE
    }
    if (cards.size === 3) {
      const [a, b, c] = [...cards.keys()]
      if (cards.get(a) === 3 || cards.get(b) === 3 || cards.get(c) === 3)
        return HandType.THREE_OF_A_KIND
      return HandType.TWO_PAIR
    }
    if (cards.size === 4)
      return HandType.ONE_PAIR
    return HandType.HIGH_CARD
  }

  if (jokerCount === 5 || jokerCount === 4)
    return HandType.FIVE_OF_A_KIND

  const values = [...cards.values()]

  if (jokerCount === 3) {
    if (values.includes(2))
      return HandType.FIVE_OF_A_KIND
    return HandType.FOUR_OF_A_KIND
  }

  if (jokerCount === 2) {
    if (values.includes(3))
      return HandType.FIVE_OF_A_KIND
    if (values.filter(e => e === 2).length === 2)
      return HandType.FOUR_OF_A_KIND
    return HandType.THREE_OF_A_KIND
  }

  if (jokerCount === 1) {
    if (values.includes(4))
      return HandType.FIVE_OF_A_KIND
    if (values.includes(3))
      return HandType.FOUR_OF_A_KIND
    if (values.filter(e => e === 2).length === 2)
      return HandType.FULL_HOUSE
    if (values.filter(e => e === 2).length === 1)
      return HandType.THREE_OF_A_KIND
    return HandType.ONE_PAIR
  }
}

export {
  getResult,
  getHand,
}
