import { getInput } from './input.js'

function getResult(input = getInput()) {
  const starts = []

  // top row
  for (let i = 0; i < input[0].length; i++) {
    if (i === 0)
      starts.push({ ...input[0][i], from: 'left' })

    if (i === input[0].length - 1)
      starts.push({ ...input[0][i], from: 'right' })

    starts.push({ ...input[0][i], from: 'top' })
  }

  // bottom row
  for (let i = 0; i < input[0].length; i++) {
    if (i === 0)
      starts.push({ ...input[input.length - 1][i], from: 'left' })

    if (i === input[0].length - 1)
      starts.push({ ...input[input.length - 1][i], from: 'right' })

    starts.push({ ...input[input.length - 1][i], from: 'bottom' })
  }

  // first left column
  for (let i = 1; i < input.length - 1; i++)
    starts.push({ ...input[i][0], from: 'left' })

  // first right column
  for (let i = 1; i < input.length - 1; i++)
    starts.push({ ...input[i][input[0].length - 1], from: 'right' })

  return Math.max(...starts.map((s, i) => {
    return getEnergy(input, s)
  }))
}

function getEnergy(input, start) {
  const energized = new Set()
  const queue = [start]
  while (queue.length > 0) {
    const current = queue.shift()
    const key = JSON.stringify(current)
    if (energized.has(key))
      continue

    energized.add(key)
    const nexts = getNext(current, input)
    queue.push(...nexts)
  }

  return new Set([...energized].map((e) => {
    const parsed = JSON.parse(e)
    return JSON.stringify({ x: parsed.x, y: parsed.y })
  })).size
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
