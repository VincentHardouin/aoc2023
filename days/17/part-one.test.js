import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day17 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `
2413432311323
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

      const result = partOne.getResult(input)

      expect(result).toBe(102)
    })
  })
})
