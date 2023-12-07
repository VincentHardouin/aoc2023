import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day7 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `
      32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(5905)
    })
  })

  describe('#getHand', () => {
    const cases = [
      { hand: 'JJJJJ', expected: 1 },
      { hand: 'JJJJA', expected: 1 },
      { hand: 'JJJAA', expected: 1 },
      { hand: 'JJJAB', expected: 2 },
      { hand: 'JJAAA', expected: 1 },
      { hand: 'JJAA3', expected: 2 },
      { hand: 'JJA34', expected: 4 },
      { hand: 'JAAAA', expected: 1 },
      { hand: 'JAAAB', expected: 2 },
      { hand: 'JAABB', expected: 3 },
      { hand: 'JAAB3', expected: 4 },
      { hand: 'JABCD', expected: 6 },
    ]

    cases.forEach(({ hand, expected }) => {
      it(`should return ${expected} for ${hand}`, () => {
        const result = partTwo.getHand({ hand })

        expect(result).toBe(expected)
      })
    })
  })
})
