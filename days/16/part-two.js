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
