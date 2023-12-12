import { describe, expect, it } from 'vitest'
import * as partOne from './part-one.js'
import { parseInputString } from './input.js'

describe('day12 | part-one', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`
      const input = parseInputString(inputString)

      const result = partOne.getResult(input)

      expect(result).toBe(21)
    })
  })
})
