import { getInput } from './input.js'

function getResult(input = getInput()) {
  return input
    .map(getLineNextValue)
    .reduce((acc, cur) => acc + cur, 0)
}

function getLineNextValue(line) {
  while (lastLineIsNotFullOfZeroes(lines)) {
    const lastLine = lines.at(-1)
    const nextLine = []
    for (let i = 1; i < lastLine.length; i++)
      nextLine.push(lastLine[i] - lastLine[i - 1])

    lines.push(nextLine)
  }
  const newLines = createNextValue(lines)
  const newValue = newLines[0].at(0)
  return newValue
}

function lastLineIsNotFullOfZeroes(lines) {
  return lines[lines.length - 1].some(number => number !== 0)
}

function createNextValue(lines) {
  const newLines = [...lines]
  for (let i = newLines.length - 1; i >= 0; i--) {
    if (i === newLines.length - 1) {
      newLines[i] = [0, ...newLines[i]]
    }
    else {
      const lastNumber = newLines[i].at(0)
      const previousLastLineNumber = newLines[i + 1].at(0)
      const nextNumber = lastNumber - previousLastLineNumber
      newLines[i] = [nextNumber, ...newLines[i]]
    }
  }
  return newLines
}

export {
  getResult,
}
