import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day18 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.length).toBe(718)
    expect(result[0]).toStrictEqual({ dir: 'L', dist: 4, color: '327cb0' })
  })
})
