/* eslint-disable no-console */
import { join } from 'node:path'
import { argv } from 'node:process'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { days } from './days/index.js'

const __dirname = new URL('.', import.meta.url).pathname

function getArgv() {
  return yargs(hideBin(argv))
    .option('day', {
      type: 'number',
      description: 'Day, between 1 and 25',
    })
    .option('part', {
      type: 'number',
      description: 'Part, 1 or 2',
      default: 1,
    })
    .check((argv) => {
      if (!argv.day)
        throw new Error('Day should be defined.')

      if (argv.day < 1 || argv.day > 25)
        throw new Error('Day should be between 1 and 25.')

      if (argv.part !== 1 && argv.part !== 2)
        throw new Error('Part should be 1 or 2')

      return true
    }).argv
}

async function getDayResult(day, part) {
  const dayPath = join(__dirname, './days', days[day - 1], 'index.js')
  const dayModule = await import(dayPath)
  console.time('t')
  console.log(`Day: ${day}, Part: ${part}, Result: ${dayModule.results[part - 1]()}`)
  console.timeEnd('t')
}

async function main() {
  const argv = getArgv()
  await getDayResult(argv.day, argv.part)
}
main()
