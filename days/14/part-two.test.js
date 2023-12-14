import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day14 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
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

      const result = partTwo.getResult(input)

      expect(result).toBe(64)
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

      const result = new partTwo.Tilt(input).north().grid

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

  describe('#tiltWest', () => {
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

      const result = new partTwo.Tilt(input).west().grid

      const expectedResult = parseInputString(`O....#....
OOO.#....#
.....##...
OO.#OO....
OO......#.
O.#O...#.#
O....#OO..
O.........
#....###..
#OO..#....`)
      expect(result).toStrictEqual(expectedResult)
    })
  })

  describe('#tiltEast', () => {
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

      const result = new partTwo.Tilt(input).east().grid

      const expectedResult = parseInputString(`....O#....
.OOO#....#
.....##...
.OO#....OO
......OO#.
.O#...O#.#
....O#..OO
.........O
#....###..
#..OO#....`)
      expect(result).toStrictEqual(expectedResult)
    })
  })

  describe('#tiltSouth', () => {
    it('should return grid with rocks slide in the south', () => {
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

      const result = new partTwo.Tilt(input).south().grid

      const expectedResult = parseInputString(`.....#....
....#....#
...O.##...
...#......
O.O....O#O
O.#..O.#.#
O....#....
OO....OO..
#OO..###..
#OO.O#...O`)
      expect(result).toStrictEqual(expectedResult)
    })
  })

  describe('#spinCycle', () => {
    it('should return grid with spin', () => {
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

      const result = partTwo.spinCycle(input)

      const expectedResult = parseInputString(`.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`)
      expect(result).toStrictEqual(expectedResult)
    })

    it('should return after 3 cycle', () => {
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

      const result = partTwo.spinCycle(input)
      const result1 = partTwo.spinCycle(result)
      const result2 = partTwo.spinCycle(result1)

      const expectedResult = parseInputString(`.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O`)
      expect(result2).toStrictEqual(expectedResult)
    })
  })
})
