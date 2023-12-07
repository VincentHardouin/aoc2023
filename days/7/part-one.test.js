import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day7 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(6440)
    })

    it('should return correct order', () => {
      const inputString = `3333A 10
QQAA3 10`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(30)
    })
  })
})
