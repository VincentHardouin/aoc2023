import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day24 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result.length).toBe(300)
    expect(result[0].position).toStrictEqual([184964585341884, 113631924395348, 401845630841620])
    expect(result[0].velocity).toStrictEqual([61, 469, -390])
  })
})
