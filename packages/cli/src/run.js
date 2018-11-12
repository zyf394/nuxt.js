import consola from 'consola'
import NuxtCommand from './command'
import LocalNuxtCommand from './command/local'
import ExternalNuxtCommand from './command/external'
import listCommands from './list'

export default function run() {
  const defaultCommand = 'dev'
  // eslint-disable-next-line prefer-const
  let [cmd, subcmd] = process.argv.slice(2, 3)

  if (typeof subcmd === 'string') {
    process.argv.splice(-3, 2)
    cmd = ExternalNuxtCommand.load(cmd, subcmd)
  } else if (NuxtCommand.exists(cmd)) {
    process.argv.splice(2, 1)
    cmd = NuxtCommand.load(cmd)
  } else if (LocalNuxtCommand.exists(cmd)) {
    process.argv.splice(2, 1)
    cmd = LocalNuxtCommand.load(cmd)
  } else {
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
      listCommands().then(() => process.exit(0))
      return
    }
    cmd = NuxtCommand.load(defaultCommand)
  }

  return cmd
    .then(command => command.run())
    .catch(error => consola.fatal(error))
}
