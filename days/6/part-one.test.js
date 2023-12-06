import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day6 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `Time:      7  15   30
Distance:  9  40  200`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(288)
    })
  })

  describe('#getNumberOfPossibleOptions', () => {
    it('should return 4', () => {
      const result = partOne.getNumberOfPossibleOptions(7, 9)

      expect(result).toBe(4)
    })

    it('should return 8', () => {
      const result = partOne.getNumberOfPossibleOptions(15, 40)

      expect(result).toBe(8)
    })

    it('should return 9', () => {
      const result = partOne.getNumberOfPossibleOptions(30, 200)

      expect(result).toBe(9)
    })
  })
})
