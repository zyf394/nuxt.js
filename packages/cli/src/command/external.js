import { join } from 'path'
import { requireModule } from '../utils'
import LocalNuxtCommand from './local'
import NuxtCommand from './index'

export default class ExternalNuxtCommand extends NuxtCommand {
  static resolve(nuxtModule) {
    const resolvers = [
      () => require.resolve(`@nuxt/${nuxtModule}`),
      () => require.resolve(`@nuxtjs/${nuxtModule}`),
      () => require.resolve(nuxtModule)
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
    if (LocalNuxtCommand.exists(cmd, modulePath)) {
      cmd = NuxtCommand.from({
        ...requireModule(join(modulePath, 'commands', `${cmd}.js`)),
        root: modulePath
      })
    } else if (NuxtCommand.exists(cmd)) {
      cmd = NuxtCommand.load(cmd, modulePath)
    }
    return cmd
  }
}
