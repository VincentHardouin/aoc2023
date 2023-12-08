import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day8 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.instructions).toStrictEqual('LLRRRLLRLRRRLLRLRLRLRLRRRLRRLRRLRLLLRRLLRRLRRLRRLRRRLLLRRLRLRRRLRRRLRLRRLRRRLRLRRRLRLRLLLRLRRLRLRRLRRRLRLRRRLRRRLRRRLRRRLRLRRRLRRRLRLLRRLRLRLRRRLRRLRRRLRRRLRRRLRRRLLLLRRLLRLRRLRRLRRRLRRRLLLRRLRRLRLRRLRRRLRRLRLRRRLRLRRLLRLLRRLRLRRRLRRLRRLRLRRLLLRRRLRLRRRLRLRLLRLRLRRRLRLRLRRRLRRLRRLRRRLRRLLRRRR')
    expect(result.steps[0]).toStrictEqual({ stepName: 'VTM', L: 'VPB', R: 'NKT' })
  })
})
