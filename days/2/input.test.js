import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day2 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0].gameId).toBe(1)
    expect(result[0].game).toBe('1 red, 10 blue, 5 green; 11 blue, 6 green; 6 green; 1 green, 1 red, 12 blue; 3 blue; 3 blue, 4 green, 1 red')
  })
})
