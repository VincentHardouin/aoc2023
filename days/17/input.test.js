import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day17 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.length).toBe(141)
    expect(result[0].length).toBe(141)
    expect(result[0][0]).toBe(1)
  })
})
