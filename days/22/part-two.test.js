import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day22 | part-two', () => {
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

      const result = partTwo.getResult(input)

      expect(result).toBe(7)
    })
  })
})
