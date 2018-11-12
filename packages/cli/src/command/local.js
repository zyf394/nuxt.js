import { resolve, join, parse } from 'path'
import { readdirSync, existsSync } from 'fs'
import { requireModule } from '../utils'
import NuxtCommand from './command'

export class LocalNuxtCommand extends NuxtCommand {
  static existsLocal(cmd) {
    const cmdsRoot = resolve('.', 'commands')
    if (existsSync(cmdsRoot)) {
      return this.filterCommands(cmdsRoot).includes(`${cmd}.js`)
    }
  }

  static filterCommands(dir) {
    return readdirSync(dir).filter(c => c.endsWith('.js'))
  }

  static getLocalCommands() {
    const cmdsRoot = resolve('.', 'commands')
    const cmds = LocalNuxtCommand.filterCommands(cmdsRoot)
    return cmds.map(cmd => parse(cmd).name)
  }

  static loadLocal(cmd) {
    const cmdsRoot = resolve('.', 'commands')
    const file = LocalNuxtCommand.filterCommands(cmdsRoot).find((c) => {
      return parse(c).name === cmd
    })
    const command = requireModule(join(cmdsRoot, file))
    return NuxtCommand.from(command.default)
  }
}
