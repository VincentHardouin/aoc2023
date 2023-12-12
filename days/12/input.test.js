import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day12 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0][0]).toBe('##???#??#?????????#?')
    expect(result[0][1]).toStrictEqual([11, 6])
  })
})
