import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day22 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.length).toBe(1210)
    expect(result[0]).toStrictEqual({ start: [4, 8, 179], end: [6, 8, 179] })
  })
})
