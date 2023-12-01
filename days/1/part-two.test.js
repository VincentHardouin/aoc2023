import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day1 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `
      two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(281)
    })
  })

  describe('#extractFirstAndLastDigit', () => {
    it('should return array of int', () => {
      const str = '4nineeightseven2'

      const { first, last } = partTwo.extractFirstAndLastDigit(str)

      expect(first).toBe(4)
      expect(last).toBe(2)
    })

    it('should return array of int for `eight33fiveg5oneeightwoh`', () => {
      const str = 'eight33fiveg5oneeightwoh'

      const { first, last } = partTwo.extractFirstAndLastDigit(str)

      expect(first).toBe(8)
      expect(last).toBe(2)
    })
  })
})
