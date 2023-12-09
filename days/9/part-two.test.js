import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day9 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(2)
    })
  })
})
