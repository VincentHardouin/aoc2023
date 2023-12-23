import { getInput } from './input.js'

function getResult(input = getInput()) {
  const bricks = input
    .sort((a, b) => a.end[2] - b.end[2])

  fullFall(bricks)

  return bricks.reduce((acc, brick, i) => {
    const subBricks = JSON.parse(JSON.stringify(bricks))
    subBricks.splice(i, 1)

    const fallen = fullFall(subBricks)
    return acc + fallen
  }, 0)
}

function fullFall(bricks) {
  const fallen = new Set()
  let snapshot = ''
  while (snapshot !== getSnapshot(bricks)) {
    snapshot = getSnapshot(bricks)
    fall(bricks, fallen)
  }

  return fallen.size
}

function getSnapshot(bricks) {
  return bricks.map(({ end }) => end[2]).join(',')
}

function fall(bricks, fallen) {
  bricks.forEach((brick, i) => {
    if (canFall(brick, bricks)) {
      brick.start[2]--
      brick.end[2]--
      fallen.add(i)
    }
  })
}

function canFall(brick, bricks) {
  const { start, end } = brick
  const [x1, y1, z1] = start
  const [x2, y2, z2] = end

  if (z1 <= 1)
    return false

  const z = z1 - 1

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      if (bricks.some(({ start, end }) => end !== brick.end && start[0] <= x && end[0] >= x && start[1] <= y && end[1] >= y && start[2] <= z && end[2] >= z))
        return false
    }
  }

  return true
}

export {
  getResult,
}
