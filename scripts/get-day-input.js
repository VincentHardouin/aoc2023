import 'dotenv/config'
import { writeFileSync } from 'node:fs'
import { argv, env } from 'node:process'
import axios from 'axios'

main()

async function main() {
  const day = argv[2]
  const inputUrl = `https://adventofcode.com/2023/day/${day}/input`
  const { data } = await axios.get(inputUrl, { headers: { Cookie: `session=${env.SESSION}` } })
  writeFileSync(`./days/${day}/input.txt`, data)
}
