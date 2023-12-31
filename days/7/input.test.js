import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day7 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0].hand).toStrictEqual(['J', 'J', 'J', 'J', '8'])
    expect(result[0].bid).toBe(619)
  })
})
