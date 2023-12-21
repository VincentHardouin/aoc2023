import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day20 | part-one', () => {
  describe('#getResult', () => {
    it('should return 32000000', () => {
      const inputString = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(32000000)
    })

    it('should return 11687500', () => {
      const inputString = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(11687500)
    })
  })
})
