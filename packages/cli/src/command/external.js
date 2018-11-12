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
}
