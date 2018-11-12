import chalk from 'chalk'
import NuxtCommand from './command'
import LocalNuxtCommand from './command/local'
import { indent, foldLines, startSpaces, optionSpaces, colorize } from './utils/formatting'

export default async function listCommands() {
  const commandsOrder = ['dev', 'build', 'generate', 'start', 'help']
  const localCommands = LocalNuxtCommand.getCommands()

  // Load all commands
  const _commands = await Promise.all(
    commandsOrder.map(cmd => NuxtCommand.load(cmd))
      .concat(localCommands.map(cmd => LocalNuxtCommand.load(cmd)))
  )

  let maxLength = 0
  const commandsHelp = []

  for (const name in _commands) {
    commandsHelp.push([_commands[name].usage, _commands[name].description])
    maxLength = Math.max(maxLength, _commands[name].usage.length)
  }

  const _cmmds = commandsHelp.map(([cmd, description]) => {
    const i = indent(maxLength + optionSpaces - cmd.length)
    return foldLines(
      chalk.green(cmd) + i + description,
      startSpaces + maxLength + optionSpaces * 2,
      startSpaces + optionSpaces
    )
  }).join('\n')

  const usage = foldLines(`Usage: nuxt <command> [--help|-h]`, startSpaces)
  const cmmds = foldLines(`Commands:`, startSpaces) + '\n\n' + _cmmds

  process.stderr.write(colorize(`${usage}\n\n${cmmds}\n\n`))
}
