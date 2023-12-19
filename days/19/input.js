import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const __dirname = new URL('.', import.meta.url).pathname

function getInput() {
  return parseInputString(readFileSync(join(__dirname, 'input.txt'), 'utf8').toString())
}

function parseInputString(input) {
  let [workflows, parts] = input
    .trim()
    .split('\n\n')
    .map((value) => {
      return value
    })

  workflows = Object.fromEntries(
    workflows
      .split('\n')
      .map(line => line.match(/(.*)\{(.*)\}/))
      .map(([_, name, flow]) => {
        let steps = flow.split(',')
        const fallthrough = steps.pop()
        steps = steps.map((s) => {
          s = s.split(/([<>:])/)
          return [s[0], s[1], +s[2], s[4]]
        })
        return [name, { steps, fallthrough }]
      }),
  )
  parts = parts.split('\n').map(p =>
    p
      .slice(1, -1)
      .split(',')
      .map(c => +c.slice(2)),
  )
  return { workflows, parts }
}

export {
  getInput,
  parseInputString,
}
