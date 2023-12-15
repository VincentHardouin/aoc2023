import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day15 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(1320)
    })
  })
})
