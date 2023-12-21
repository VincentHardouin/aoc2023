import { getInput } from './input.js'

function getResult(input = getInput()) {
  const modules = input
    .map((module) => {
      if (module.type === '%')
        module.state = false
      if (module.type === '&')
        module.state = []
      return module
    })

  modules.forEach((module) => {
    module.destinations.forEach((dest) => {
      const mod = modules.find(mod => mod.moduleName === dest)
      if (mod?.type === '&')
        mod.state[module.moduleName] = 'low'
    })
  })

  const queue = []

  let buttonPushes = 0
  const stats = {
    low: 0,
    high: 0,
  }
  while (queue.length > 0 || buttonPushes < 1000) {
    if (queue.length === 0) {
      buttonPushes++
      queue.push({ from: 'button', target: 'broadcaster', pulseType: 'low' })
    }

    const next = queue.shift()
    stats[next.pulseType]++

    const module = modules.find(mod => mod.moduleName === next.target)
    if (!module)
      continue

    if (module.moduleName === 'broadcaster') {
      module.destinations.forEach((dest) => {
        queue.push({ from: module.moduleName, target: dest, pulseType: 'low' })
      })
    }

    if (module.type === '%' && next.pulseType === 'low') {
      module.state = !module.state
      const pulse = module.state ? 'high' : 'low'
      module.destinations.forEach((dest) => {
        queue.push({ from: module.moduleName, target: dest, pulseType: pulse })
      })
    }

    if (module.type === '&') {
      module.state[next.from] = next.pulseType
      const pulse = Object.values(module.state).every(pulse => pulse === 'high') ? 'low' : 'high'
      module.destinations.forEach((dest) => {
        queue.push({ from: module.moduleName, target: dest, pulseType: pulse })
      })
    }
  }

  return stats.low * stats.high
}

export {
  getResult,
}
