import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day3 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0]).toBe('......124..................418.......587......770...........672.................564............................438..........512......653....')
  })
})
