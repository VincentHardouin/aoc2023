import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day4 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0].numbers).toStrictEqual([5, 52, 86, 35, 57, 18, 60, 84, 50, 76, 96, 47, 38, 41, 34, 36, 55, 20, 25, 37, 6, 70, 66, 45, 3])
    expect(result[0].winningNumbers).toStrictEqual([69, 24, 51, 87, 9, 49, 17, 16, 21, 48])
  })
})
