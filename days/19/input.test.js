import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day19 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.parts.length).toBe(200)
  })
})
