import { getInput } from './input.js'

function memoize(fn, makeKey = (...args) => JSON.stringify(args)) {
  const cache = new Map()
  return (...args) => {
    const key = makeKey(...args)
    if (!cache.has(key))
      cache.set(key, fn(...args))

    return cache.get(key)
  }
}

const arrangements = memoize((str, blocks) => {
  const [char] = str
  if (!char)
    return blocks.length === 0 ? 1 : 0

  if (char === '.')
    return arrangements(str.slice(1), blocks)

  if (char === '#') {
    const [block] = blocks
    if (!block || block > str.length || str[block] === '#' || str.slice(0, block).includes('.'))
      return 0

    return arrangements(str.slice(block + 1), blocks.slice(1))
  }

  return arrangements(`.${str.slice(1)}`, blocks) + arrangements(`#${str.slice(1)}`, blocks)
})

function getResult(input = getInput()) {
  return input
    .map(([records, groups]) => {
      const unfoldRecords = Array(5).fill(records).join('?')
      const unfoldGroups = Array(5).fill(groups).flatMap(group => group)
      return [
        unfoldRecords,
        unfoldGroups,
      ]
    })
    .map(([records, groups]) => {
      return arrangements(records, groups)
    })
    .reduce((acc, curr) => acc + curr, 0)
}

export {
  getResult,
}
