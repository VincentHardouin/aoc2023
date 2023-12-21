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

  modules.push({ moduleName: 'rx', type: '', destinations: [], state: null })

  modules.forEach((module) => {
    module.destinations.forEach((dest) => {
      const mod = modules.find(mod => mod.moduleName === dest)
      if (!mod)
        return

      if (mod.type === '&')
        mod.state[module.moduleName] = 'low'
      if (!mod.inputs)
        mod.inputs = []
      mod.inputs.push(mod.moduleName)
    })
  })

  const end = modules.find(mod => mod.moduleName === 'rx').inputs[0]

  console.log(modules.find(mod => mod.moduleName === 'broadcaster').destinations)
  return modules.find(mod => mod.moduleName === 'broadcaster').destinations.reduce((acc, curr) => {
    let buttonPushes = 0

    const queue = []
    console.log(curr)

    while (true) {
      if (queue.length === 0) {
        buttonPushes++
        queue.push({ from: 'button', target: 'broadcaster', pulseType: 'low' })
      }

      const next = queue.shift()

      if (next.target === end) {
        if (next.pulseType === 'low')
          break
        else
          continue
      }

      const module = modules.find(mod => mod.moduleName === next.target)
      if (!module)
        continue

      if (module.moduleName === 'broadcaster')
        queue.push({ from: module.moduleName, target: curr, pulseType: 'low' })

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

    return acc * buttonPushes
  }, 1)
}

export {
  getResult,
}
