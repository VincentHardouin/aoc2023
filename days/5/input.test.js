import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day5 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.seeds[0]).toBe(768975)
    expect(result.seedToSoil[0]).toStrictEqual([2797638787, 1764015146, 26675178])
    expect(result.humidityToLocation[0]).toStrictEqual([3394148556, 2925849667, 56813934])
  })
})
