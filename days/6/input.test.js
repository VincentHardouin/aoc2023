import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day6 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0]).toStrictEqual({ time: 58, distance: 434 })
    expect(result.length).toBe(4)
  })
})
