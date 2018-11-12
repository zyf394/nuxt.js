import NuxtCommand from './index'

export class ExternalNuxtCommand extends NuxtCommand {
  static resolve(cmd) {
    const resolvers = [
      () => require.resolve(`@nuxt/${cmd}`),
      () => require.resolve(`@nuxtjs/${cmd}`),
      () => require.resolve(`${cmd}`)
    ]  
    do {
      const command = resolvers.shift()()
      if (command) {
        return command
      }
    } while (resolvers.length)
  }

  static load(nuxtModule, cmd) {
    const modulePath = this.resolve(nuxtModule)
    const cmdsRoot = resolve(modulePath, 'commands')
    const file = ExternalNuxtCommand.filterCommands(cmdsRoot).find((c) => {
      return parse(c).name === cmd
    })
    const command = requireModule(join(cmdsRoot, file))
    return NuxtCommand.from({ ...command.default, root: modulePath })
  }
}
