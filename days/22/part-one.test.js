import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day22 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(5)
    })
  })
})
