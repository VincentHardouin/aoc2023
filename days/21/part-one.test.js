import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day21 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input, 6)

      expect(result).toBe(16)
    })
  })
})
