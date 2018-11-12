import NuxtCommand from './index'

export class LocalNuxtCommand extends NuxtCommand () {

  static existsLocal(cmd) {
    const cmdsRoot = resolve('.', 'commands')
    if (existsSync(cmdsRoot)) {
      return this.filterCommands(cmdsRoot).includes(`${cmd}.js`)
    }
  }

}
