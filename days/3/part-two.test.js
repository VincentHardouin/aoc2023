import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day3 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `
      467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(467835)
    })
  })
})
