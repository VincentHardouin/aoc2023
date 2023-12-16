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
  const { x, y } = current

  if (current.value === '.') {
    if (current.from === 'left') {
      if (current.x === input[0].length - 1)
        return []

      return [getRight(current, input)]
    }
    else if (current.from === 'right') {
      if (current.x === 0)
        return []

      return [getLeft(current, input)]
    }
    else if (current.from === 'top') {
      if (current.y === input.length - 1)
        return []

      return [getBottom(current, input)]
    }
    else if (current.from === 'bottom') {
      if (current.y === 0)
        return []

      return [getTop(current, input)]
    }
  }
  else if (current.value === '\\') {
    if (current.from === 'left') {
      if (current.y === input.length - 1)
        return []

      return [getBottom(current, input)]
    }
    else if (current.from === 'right') {
      if (current.y === 0)
        return []

      return [getTop(current, input)]
    }
    else if (current.from === 'top') {
      if (current.x === input[0].length - 1)
        return []

      return [getRight(current, input)]
    }
    else if (current.from === 'bottom') {
      if (current.x === 0)
        return []

      return [getLeft(current, input)]
    }
  }
  else if (current.value === '/') {
    if (current.from === 'left') {
      if (current.y === 0)
        return []

      return [getTop(current, input)]
    }
    else if (current.from === 'right') {
      if (current.y === input.length - 1)
        return []

      return [getBottom(current, input)]
    }
    else if (current.from === 'top') {
      if (current.x === 0)
        return []

      return [getLeft(current, input)]
    }
    else if (current.from === 'bottom') {
      if (current.x === input[0].length - 1)
        return []

      return [getRight(current, input)]
    }
  }
  else if (current.value === '|') {
    if (current.from === 'left') {
      const nexts = []
      const y = current.y - 1
      const y2 = current.y + 1

      if (y >= 0)
        nexts.push(getTop(current, input))

      if (y2 <= input.length - 1)
        nexts.push(getBottom(current, input))

      return nexts
    }
    else if (current.from === 'right') {
      const nexts = []
      const y = current.y + 1
      const y2 = current.y - 1

      if (y <= input.length - 1)
        nexts.push(getBottom(current, input))

      if (y2 >= 0)
        nexts.push(getTop(current, input))

      return nexts
    }
    else if (current.from === 'top') {
      if (current.y === input.length - 1)
        return []

      return [getBottom(current, input)]
    }
    else if (current.from === 'bottom') {
      if (current.y === 0)
        return []
      return [getTop(current, input)]
    }
  }
  else if (current.value === '-') {
    if (current.from === 'left') {
      if (current.x === input[0].length - 1)
        return []

      return [getRight(current, input)]
    }
    else if (current.from === 'right') {
      if (current.x === 0)
        return []

      return [getLeft(current, input)]
    }
    else if (current.from === 'top') {
      const nexts = []

      const x = current.x + 1
      const x2 = current.x - 1

      if (x <= input[0].length - 1)
        nexts.push(getRight(current, input))
      if (x2 >= 0)
        nexts.push(getLeft(current, input))

      return nexts
    }
    else if (current.from === 'bottom') {
      const nexts = []

      const x = current.x + 1
      const x2 = current.x - 1

      if (x <= input[0].length - 1)
        nexts.push(getRight(current, input))

      if (x2 >= 0)
        nexts.push(getLeft(current, input))

      return nexts
    }
  }

  return []
}

function getRight(current, input) {
  return { ...input[current.y][current.x + 1], from: 'left' }
}

function getLeft(current, input) {
  return { ...input[current.y][current.x - 1], from: 'right' }
}

function getTop(current, input) {
  return { ...input[current.y - 1][current.x], from: 'bottom' }
}

function getBottom(current, input) {
  return { ...input[current.y + 1][current.x], from: 'top' }
}

export {
  getResult,
}
