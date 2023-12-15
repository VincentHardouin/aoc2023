import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input.map(getHash).reduce((acc, curr) => acc + curr, 0)
}

function getHash(str) {
  let hash = 0
  for (const c of str)
    hash = ((hash + c.charCodeAt(0)) * 17) % 256

  return hash
}

export {
  getResult,
}
