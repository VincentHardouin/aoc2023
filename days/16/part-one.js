import { getInput } from './input.js'

function getResult(input = getInput()) {
  const current = input[0][0]
  current.from = 'left'

  const energized = []
  const queue = [current]
  while (queue.length > 0) {
    const current = queue.shift()
    if (energized.find(e => e.x === current.x && e.y === current.y && e.from === current.from))
      continue

    energized.push(current)
    const nexts = getNext(current, input)
    queue.push(...nexts)
  }

  return new Set([...energized].map(e => JSON.stringify({ x: e.x, y: e.y }))).size
}
function getNext(current, input) {
  const nextMoves = []

  if (current.value === '.') {
    switch (current.from) {
      case 'left':
        nextMoves.push(getRight(current, input))
        break
      case 'right':
        nextMoves.push(getLeft(current, input))
        break
      case 'top':
        nextMoves.push(getBottom(current, input))
        break
      case 'bottom':
        nextMoves.push(getTop(current, input))
        break
    }
  }
  else if (current.value === '\\') {
    switch (current.from) {
      case 'left':
        nextMoves.push(getBottom(current, input))
        break
      case 'right':
        nextMoves.push(getTop(current, input))
        break
      case 'top':
        nextMoves.push(getRight(current, input))
        break
      case 'bottom':
        nextMoves.push(getLeft(current, input))
        break
    }
  }
  else if (current.value === '/') {
    switch (current.from) {
      case 'left':
        nextMoves.push(getTop(current, input))
        break
      case 'right':
        nextMoves.push(getBottom(current, input))
        break
      case 'top':
        nextMoves.push(getLeft(current, input))
        break
      case 'bottom':
        nextMoves.push(getRight(current, input))
        break
    }
  }
  else if (current.value === '|') {
    switch (current.from) {
      case 'left':
        nextMoves.push(getTop(current, input), getBottom(current, input))
        break
      case 'right':
        nextMoves.push(getTop(current, input), getBottom(current, input))
        break
      case 'top':
        nextMoves.push(getBottom(current, input))
        break
      case 'bottom':
        nextMoves.push(getTop(current, input))
        break
    }
  }
  else if (current.value === '-') {
    switch (current.from) {
      case 'left':
        nextMoves.push(getRight(current, input))
        break
      case 'right':
        nextMoves.push(getLeft(current, input))
        break
      case 'top':
        nextMoves.push(getRight(current, input), getLeft(current, input))
        break
      case 'bottom':
        nextMoves.push(getRight(current, input), getLeft(current, input))
        break
    }
  }

  return nextMoves.filter(n => n !== null)
}

function getRight(current, input) {
  if (current.x + 1 >= input[0].length)
    return null

  return { ...input[current.y][current.x + 1], from: 'left' }
}

function getLeft(current, input) {
  if (current.x - 1 < 0)
    return null

  return { ...input[current.y][current.x - 1], from: 'right' }
}

function getTop(current, input) {
  if (current.y - 1 < 0)
    return null

  return { ...input[current.y - 1][current.x], from: 'bottom' }
}

function getBottom(current, input) {
  if (current.y + 1 >= input.length)
    return null

  return { ...input[current.y + 1][current.x], from: 'top' }
}

export {
  getResult,
}
