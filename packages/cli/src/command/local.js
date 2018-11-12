import { resolve, join, parse } from 'path'
import { existsSync } from 'fs'
import { requireModule, filterCommands } from '../utils'
import NuxtCommand from './index'

export default class LocalNuxtCommand extends NuxtCommand {
  static exists(name, root = '.') {
    const cmdsRoot = resolve(root, 'commands')
    if (existsSync(cmdsRoot)) {
      return filterCommands(cmdsRoot).includes(`${name}.js`)
    }
  }

  static getCommands(root = '.') {
    return filterCommands(resolve(root, 'commands')).map(cmd => parse(cmd).name)
  }

  static loadLocal(cmd, root = '.') {
    const cmdsRoot = resolve(root, 'commands')
    const file = filterCommands(cmdsRoot).find((c) => {
      return parse(c).name === cmd
    })
    const command = requireModule(join(cmdsRoot, file))
    return NuxtCommand.from({ ...command.default, root })
  }
}
