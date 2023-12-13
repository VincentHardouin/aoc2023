import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day13 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(405)
    })
  })

  describe('#findReflection', () => {
    it('should find the reflection', () => {
      const inputString = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`
      const input = parseInputString(inputString)

      const result = partOne.findReflection(input[0])

      expect(result).toBe(5)
    })
  })
})
