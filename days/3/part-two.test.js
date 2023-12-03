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

  describe('#findAdjacentNumberInLine', () => {
    it('should return adjacent numbers', () => {
      const inputString = `
      467..114..`
      const input = parseInputString(inputString)
      const result = partTwo.findAdjacentNumberInLine(input[0], { startIndex: 2, endIndex: 4 })

      expect(result).toEqual([467])
    })
  })

  describe('#findAdjacentNumbers', () => {
    it('should return adjacent numbers', () => {
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
      const result = partTwo.findAdjacentNumbers({ inputIndex: 1, lineIndex: 3 }, input)

      expect(result).toEqual([467, 35])
    })

    it('right case: should return adjacent numbers', () => {
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
      const result = partTwo.findAdjacentNumbers({ inputIndex: 0, lineIndex: 4 }, input)

      expect(result).toEqual([114])
    })
  })
})
