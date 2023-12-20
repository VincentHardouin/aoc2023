import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day20 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.length).toBe(58)
    expect(result[0]).toEqual({
      type: '%',
      moduleName: 'vn',
      destinations: ['ts', 'lq'],
    })
  })
})
