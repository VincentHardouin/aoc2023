import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day11 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(82000210)
    })
  })
})
