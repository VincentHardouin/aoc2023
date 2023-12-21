import { getInput } from './input.js'

function getResult(input = getInput()) {
  const modules = input
    .map((module) => {
      if (module.type === '%')
        module.state = false
      if (module.type === '&')
        module.history = []

      return module
    })

  const buttonPush = modules
    .find(mod => mod.type === 'b')

  const queue = []

  let buttonPushes = 0
  const stats = {
    low: 0,
    high: 0,
  }
  while (queue.length > 0 || buttonPushes < 1) {
    if (queue.length === 0) {
      buttonPushes++
      buttonPush.destinations.forEach((dest) => {
        queue.push({ from: 'broadcaster', target: dest, pulseType: 'low' })
      })
      stats.low++
    }

    const next = queue.shift()
    console.log(next)
    const module = modules.find(mod => mod.moduleName === next.target)
    if (!module)
      continue

    stats[next.pulseType]++

    if (module.type === 'b') {
      module.destinations.forEach((dest) => {
        queue.push({ from: module.moduleName, target: dest, pulseType: 'low' })
      })
    }
    else if (module.type === '%' && next.pulseType === 'low') {
      module.state = !module.state
      const pulse = module.state ? 'high' : 'low'
      module.destinations.forEach((dest) => {
        queue.push({ from: module.moduleName, target: dest, pulseType: pulse })
      })
    }
    else if (module.type === '&') {
      module.history[next.from] = next.pulseType
      const pulse = Object.values(module.history).every(pulse => pulse === 'high') ? 'low' : 'high'
      module.destinations.forEach((dest) => {
        queue.push({ from: module.moduleName, target: dest, pulseType: pulse })
      })
    }
  }
  console.log(stats)

  return stats.low * stats.high
}

export {
  getResult,
}
