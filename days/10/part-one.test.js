import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day10 | part-one', () => {
  describe('#getResult', () => {
    it('should return 4', () => {
      const inputString = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(4)
    })

    it('should return 8', () => {
      const inputString = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(8)
    })
  })

  describe('#getStartingPosition', () => {
    it('should return 1, 1', () => {
      const inputString = `.....
.S-7.
.|.|.
.L-J.
.....`
      const input = parseInputString(inputString)

      const result = partOne.getStartingPosition(input)

      expect(result.position).toStrictEqual({ i: 1, j: 1 })
    })

    it('should return 2, 0', () => {
      const inputString = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`
      const input = parseInputString(inputString)

      const result = partOne.getStartingPosition(input)

      expect(result.position).toStrictEqual({ i: 2, j: 0 })
    })
  })

  describe('#getNeighbors', () => {
    it('should return 2 neighbors', () => {
      const inputString = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`
      const input = parseInputString(inputString)

      const result = partOne.getNeighbors({ position: { i: 1, j: 1 }, value: 'F' }, input)

      expect(result).toStrictEqual([
        { position: { i: 2, j: 1 }, value: '|' },
        { position: { i: 1, j: 2 }, value: '-' },
      ])
    })

    it('should return 2 neighbors for { value: 7, position: { i: 1, j: 3 } }', () => {
      const inputString = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`
      const input = parseInputString(inputString)

      const result = partOne.getNeighbors({ value: '7', position: { i: 1, j: 3 } }, input)

      expect(result).toStrictEqual([
        { position: { i: 2, j: 3 }, value: '|' },
        { position: { i: 1, j: 2 }, value: '-' },
      ])
    })

    it('should return 2 neighbors for { value: \'J\', position: { i: 4, j: 1 } }', () => {
      const inputString = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`
      const input = parseInputString(inputString)

      const result = partOne.getNeighbors({ value: 'J', position: { i: 4, j: 1 } }, input)

      expect(result).toStrictEqual([
        { position: { i: 3, j: 1 }, value: 'F' },
        { position: { i: 4, j: 0 }, value: 'L' },
      ])
    })
  })
})
