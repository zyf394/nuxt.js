import NuxtCommand from './index'

export class ExternalNuxtCommand extends NuxtCommand {
  static resolveExternal(cmd) {
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
  
  static loadExternal(cmd) {
    const cmdsRoot = resolve(getExternalCommand(cmd), 'commands')
    const file = filterCommands(cmdsRoot).find((c) => {
      return parse(c).name === cmd
    })
    const command = requireModule(join(cmdsRoot, file))
    return NuxtCommand.from(command.default)
  }
}
