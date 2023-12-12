import { describe, expect, it } from 'vitest'
import * as partTwo from './part-two.js'
import { parseInputString } from './input.js'

describe('day12 | part-two', () => {
  describe('#getResult', () => {
    it('should ', () => {
      const inputString = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`
      const input = parseInputString(inputString)

      const result = partTwo.getResult(input)

      expect(result).toBe(525152)
    })
  })
})
