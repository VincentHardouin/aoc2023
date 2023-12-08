import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day8 | part-one', () => {
  describe('#getResult', () => {
    it('should return 2', () => {
      const inputString = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(2)
    })

    it('should return 6', () => {
      const inputString = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(6)
    })
  })
})
