import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day6 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `Time:      7  15   30
Distance:  9  40  200`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(71503)
    })
  })
})
