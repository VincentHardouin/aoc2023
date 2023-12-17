import _ from 'lodash'
import { getInput } from './input.js'

class Position {
  constructor(x, y, heatLoss) {
    this.x = x
    this.y = y
    this.heatLoss = heatLoss
    this.cost = Number.POSITIVE_INFINITY
    this.neighbours = []
    this.parent = null
  }

  get key() {
    return `${this.x},${this.y}`
  }

  isValidDirection(parent) {
    const lastX = new Set([this.x])
    const lastY = new Set([this.y])

    if (parent) {
      lastX.add(parent.x)
      lastY.add(parent.y)
    }

    if (parent?.parent) {
      lastX.add(parent.parent.x)
      lastY.add(parent.parent.y)
    }

    if (parent?.parent?.parent) {
      lastX.add(parent.parent.parent.x)
      lastY.add(parent.parent.parent.y)
    }

    let isValidDirection = true
    if (lastX.size === 1 && lastY.size === 4)
      isValidDirection = false

    if (lastY.size === 1 && lastX.size === 4)
      isValidDirection = false

    return isValidDirection
  }

  get validNeighbours() {
    return this.neighbours.filter(neighbour => neighbour.isValidDirection(this))
  }
}

class Path {
  constructor(positions, start, end) {
    this.positions = positions
    this.start = start
    this.end = end
  }

  getLowestTotalHeatLoss() {
    const visited = new Map()
    this.start.cost = 0
    let toBeVisited = [this.start]

    while (toBeVisited.length > 0) {
      const position = _.minBy(toBeVisited, 'cost')
      toBeVisited = toBeVisited.filter(
        positionToVisit => positionToVisit.key !== position.key,
      )

      visited.set(`${position.key},${position.parent}`, position)
      console.log(position.validNeighbours.length)
      position.validNeighbours.forEach((neighbour) => {
        if (!visited.get(neighbour.key)) {
          const cumulativeHeatLoss = position.cost + neighbour.heatLoss
          console.log(JSON.stringify({
            key: neighbour.key,
            cost: neighbour.cost,
            cumulativeHeatLoss,
            positionKey: position.key,
          }))
          if (cumulativeHeatLoss < neighbour.cost && neighbour.isValidDirection(position)) {
            neighbour.cost = cumulativeHeatLoss
            neighbour.parent = position
          }

          if (!visited.get(`${neighbour.key},${neighbour.parent}`))
            toBeVisited.push(neighbour)
        }
      })
    }

    return this.end.cost
  }

  getOptimalPath() {
    const optimalPath = []
    let current = this.end

    while (current !== this.start) {
      optimalPath.unshift(current)
      current = current.parent
    }

    optimalPath.unshift(this.start)
    return optimalPath
  }

  printOptimalPath(input) {
    const optimalPath = this.getOptimalPath()

    const grid = []

    for (let y = 0; y < input.length; y++) {
      grid[y] = []
      for (let x = 0; x < input[0].length; x++)
        grid[y][x] = '.'
    }

    optimalPath.forEach((position) => {
      grid[position.y][position.x] = '#'
    })

    grid.forEach((row) => {
      console.log(row.join(''))
    })
  }
}

function getPositions(input) {
  const positions = new Map()
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const position = new Position(x, y, input[y][x])
      positions.set(position.key, position)
    }
  }
  return positions
}

function getResult(input = getInput()) {
  const positions = getPositions(input)

  positions.forEach((position, key, map) => {
    const up = map.get(`${position.x},${position.y - 1}`)
    const right = map.get(`${position.x + 1},${position.y}`)
    const bottom = map.get(`${position.x},${position.y + 1}`)
    const left = map.get(`${position.x - 1},${position.y}`)

    const neighbours = []
    if (up)
      neighbours.push(up)
    if (right)
      neighbours.push(right)
    if (bottom)
      neighbours.push(bottom)
    if (left)
      neighbours.push(left)

    position.neighbours = neighbours
  })

  const start = positions.get('0,0')
  const end = positions.get(`${input[0].length - 1},${input.length - 1}`)
  const path = new Path(positions, start, end)
  const result = path.getLowestTotalHeatLoss()
  path.printOptimalPath(input)
  return result
}

export {
  getResult,
}
