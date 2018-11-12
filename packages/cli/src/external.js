import { resolve, join, parse } from 'path'
import { readdirSync, existsSync } from 'fs'
import { requireModule } from './utils'
import NuxtCommand from './command'

export function getExternalCommand(cmd) {
  const resolvers = [
    () => require.resolve(`@nuxt/${cmd}`),
    () => require.resolve(`@nuxtjs/${cmd}`),
    () => require.resolve(`${cmd}`)
  ]  
  do {
    cmd = resolvers.shift()()
    if (cmd) {
      return cmd
    }
  } while (resolvers.length)
}

export function loadExternalCommand(cmd) {
  const cmdsRoot = resolve(getExternalCommand(cmd), 'commands')
  const file = filterCommands(cmdsRoot).find((c) => {
    return parse(c).name === cmd
  })
  const command = requireModule(join(cmdsRoot, file))
  return NuxtCommand.from(command.default)
}
