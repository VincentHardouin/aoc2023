import { describe, expect, it } from 'vitest'
import * as input from './input.js'

describe('day1 | input', () => {
  it('should return array of int for each line', () => {
    const result = input.getInput()

    expect(result[0]).toStrictEqual('threehqv2')
  })
})
