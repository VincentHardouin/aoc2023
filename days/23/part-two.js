import { getInput } from './input.js'

// change --stake-size= to run with more stack size
function getResult(input = getInput()) {
  const start = [0, input[0].indexOf('.')]
  const end = [input.length - 1, input[input.length - 1].indexOf('.')]
  const points = [start, end]

  input.forEach((line, i) => {
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '#')
        continue
      let neighbors = 0
      const dirs = [[i - 1, j], [i + 1, j], [i, j + 1], [i, j - 1]]

      for (const [y, x] of dirs) {
        if (y >= 0 && y < input.length && x >= 0 && x < input[0].length && input[y][x] !== '#')
          neighbors++
      }
      if (neighbors > 2)
        points.push([i, j])
    }
  })

  const graph = createGraph(points, input)

  return dfs(start, end, graph)
}

function createGraph(points, input) {
  const graph = {}
  for (const pt of points)
    graph[pt] = []

  for (const [sr, sc] of points) {
    const stack = []
    stack.push([0, sr, sc])
    const seen = new Set()
    seen.add(`${sr},${sc}`)

    while (stack.length > 0) {
      const [n, r, c] = stack.pop()
      const contain = points.some(v => v[0] === r && v[1] === c)
      if (n !== 0 && contain) {
        graph[`${sr},${sc}`].push([r, c, n])
        continue
      }
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr
        const nc = c + dc

        if (nr >= 0
          && nr < input.length
          && nc >= 0
          && nc < input[0].length
          && input[nr][nc] !== '#'
          && !seen.has(`${nr},${nc}`)) {
          stack.push([n + 1, nr, nc])
          seen.add(`${nr},${nc}`)
        }
      }
    }
  }
  return graph
}

function dfs(point, end, graph, seen = new Set()) {
  if (point[0] === end[0] && point[1] === end[1])
    return 0

  let max = Number.NEGATIVE_INFINITY

  seen.add(`${point[0]},${point[1]}`)
  for (const nx of graph[`${point[0]},${point[1]}`])
    max = Math.max(max, dfs([nx[0], nx[1]], end, graph, seen) + nx[2])

  seen.delete(`${point[0]},${point[1]}`)

  return max
}

export {
  getResult,
}
