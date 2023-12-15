import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day15 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(145)
    })
  })
})
