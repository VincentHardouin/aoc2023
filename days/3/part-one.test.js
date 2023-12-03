import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day3 | part-one', () => {
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

      const result = partOne.getResult(input)

      expect(result).toBe(4361)
    })
  })
})
