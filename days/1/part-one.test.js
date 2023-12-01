import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day1 | part-one', () => {
  describe('#getResult', () => {
    it('should return only number', () => {
      const inputString = `
      1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(142)
    })
  })
})
