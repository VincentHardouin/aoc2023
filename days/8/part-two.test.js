import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day8 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(6)
    })
  })
})
