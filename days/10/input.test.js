import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day10 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.length).toBe(140)
    expect(result[0].length).toBe(140)
  })
})
