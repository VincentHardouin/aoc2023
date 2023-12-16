import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day16 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.length).toBe(110)
    expect(result[0].length).toBe(110)
    expect(result[0][0]).toStrictEqual({ x: 0, y: 0, value: `\\` })
  })
})
