import { filterCommands } from '../utils'
import NuxtCommand from './index'

export class ExternalNuxtCommand extends NuxtCommand {
  static resolve(nuxtModule) {
    const resolvers = [
      () => require.resolve(`@nuxt/${nuxtModule}`),
      () => require.resolve(`@nuxtjs/${nuxtModule}`),
      () => require.resolve(`${nuxtModule}`)
    ]  
    do {
      nuxtModule = resolvers.shift()()
      if (nuxtModule) {
        return nuxtModule
      }
    } while (resolvers.length)
  }

  static load(nuxtModule, cmd) {
    const modulePath = this.resolve(nuxtModule)
    const cmdsRoot = resolve(modulePath, 'commands')
    const file = filterCommands(cmdsRoot).find((c) => {
      return parse(c).name === cmd
    })
    const command = requireModule(join(cmdsRoot, file))
    return NuxtCommand.from({ ...command.default, root: modulePath })
  }
}
