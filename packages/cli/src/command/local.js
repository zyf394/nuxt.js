import { resolve, join, parse } from 'path'
import { existsSync } from 'fs'
import { requireModule, filterCommands } from '../utils'
import NuxtCommand from './command'

export class LocalNuxtCommand extends NuxtCommand {
  static exists(name) {
    const cmdsRoot = resolve('.', 'commands')
    if (existsSync(cmdsRoot)) {
      return filterCommands(cmdsRoot).includes(`${cmd}.js`)
    }
  }

  static getCommands() {
    return filterCommands(resolve('.', 'commands')).map(cmd => parse(cmd).name)
  }

  static loadLocal(cmd) {
    const cmdsRoot = resolve('.', 'commands')
    const file = filterCommands(cmdsRoot).find((c) => {
      return parse(c).name === cmd
    })
    const command = requireModule(join(cmdsRoot, file))
    return NuxtCommand.from({ ...command.default, root: '.' })
  }
}
