import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day17 | part-two', () => {
  describe('#getResult', () => {
    it('should return 94', () => {
      const inputString = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(94)
    })

    it('should return 71', () => {
      const inputString = `111111111111
999999999991
999999999991
999999999991
999999999991`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(71)
    })
  })
})
