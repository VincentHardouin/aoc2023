import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day14 | part-one', () => {
  describe('#getResult', () => {
    it('should return 136', () => {
      const inputString = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(136)
    })
  })

  describe('#tiltNorth', () => {
    it('should return grid with rocks slide in the north', () => {
      const inputString = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`
      const input = parseInputString(inputString)

      const result = partOne.tiltNorth(input)

      const expectedResult = parseInputString(`OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`)
      expect(result).toStrictEqual(expectedResult)
    })
  })
})
