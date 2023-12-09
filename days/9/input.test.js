import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day9 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0]).toStrictEqual([11, 33, 79, 170, 328, 578, 967, 1621, 2872, 5498, 11130, 22891, 46343, 90829, 171308, 310792, 543505, 918895, 1506641, 2402808, 3737314])
  })
})
