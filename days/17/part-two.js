import { getInput } from './input.js'

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

// cf: https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-heap-binary-heap
class Heap {
  constructor(comparator) {
    this.heap = []
    this.comparator = comparator || ((a, b) => a - b)
  }

  size() { return this.heap.length }

  isEmpty() { return this.size() == 0 }

  peek() { return this.heap[0] }

  insert(value) { this.heap.push(value); this.heapifyUp() }

  delete() {
    if (this.isEmpty())
      return null
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > 0)
      this.swap(0, bottom)
    this.heap.pop()
    this.heapifyDown()
    return poppedValue
  }

  parentIndex(i) {
    return Math.floor((i - 1) / 2)
  }

  parentValue(i) {
    return i < this.size() && this.parentIndex(i) >= 0 ? this.heap[this.parentIndex(i)] : undefined
  }

  leftChildIndex(i) {
    return 2 * i + 1
  }

  leftChildValue(i) {
    return this.hasLeftChild(i) ? this.heap[this.leftChildIndex(i)] : undefined
  }

  hasLeftChild(i) {
    return this.leftChildIndex(i) < this.size()
  }

  rightChildIndex(i) {
    return 2 * i + 2
  }

  rightChildValue(i) {
    return this.hasRightChild(i) ? this.heap[this.rightChildIndex(i)] : undefined
  }

  hasRightChild(i) {
    return this.rightChildIndex(i) < this.size()
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
  }

  heapifyUp() {
    let nodeIndex = this.size() - 1
    while (nodeIndex > 0 && this.comparator(this.parentValue(nodeIndex), this.heap[nodeIndex]) > 0) {
      this.swap(nodeIndex, this.parentIndex(nodeIndex))
      nodeIndex = this.parentIndex(nodeIndex)
    }
  }

  heapifyDown() {
    let currNodeIndex = 0
    while (this.hasLeftChild(currNodeIndex)) {
      let smallerChildIndex = this.leftChildIndex(currNodeIndex)
      if (
        this.hasRightChild(currNodeIndex)
          && this.comparator(
            this.rightChildValue(currNodeIndex),
            this.leftChildValue(currNodeIndex),
          ) < 0
      )
        smallerChildIndex = this.rightChildIndex(currNodeIndex)

      if (this.comparator(this.heap[currNodeIndex], this.heap[smallerChildIndex]) <= 0)
        break
      this.swap(currNodeIndex, smallerChildIndex)
      currNodeIndex = smallerChildIndex
    }
  }
}

function getResult(input = getInput()) {
  const maxDist = 10
  const minDist = 4
  const height = input.length
  const width = input[0].length

  const visited = new Set()
  const heap = new Heap((a, b) => a[0] - b[0])

  let best = Number.POSITIVE_INFINITY

  heap.insert([0, 0, 0, 1, 0])
  heap.insert([0, 0, 0, 2, 0])// heat, row, col, dir, dirCount

  while (!heap.isEmpty()) {
    const [heat, row, col, dir, dirCount] = heap.delete()
    const k = `${row},${col},${dir},${dirCount}`
    if (visited.has(k))
      continue
    visited.add(k)
    if (row === height - 1 && col === width - 1 && dirCount >= minDist) {
      best = Math.min(best, heat)
      continue
    }
    for (const [d, [dr, dc]] of dirs.entries()) {
      const y = row + dr
      const x = col + dc
      const nCount = (d === dir) ? dirCount + 1 : 1
      if (y < 0 || y >= height || x < 0 || x >= width || (d + 2) % 4 === dir)
        continue
      if (nCount > maxDist || (heat && d !== dir && dirCount < minDist))
        continue
      heap.insert([heat + input[y][x], y, x, d, nCount])
    }
  }
  return best
}

export {
  getResult,
}
