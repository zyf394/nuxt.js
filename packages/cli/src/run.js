import consola from 'consola'
import NuxtCommand from './command'
import * as commands from './commands'
import listCommands from './list'

export default function run() {
  const defaultCommand = 'dev'
  let cmd = process.argv[2]

  if (NuxtCommand.exists(cmd)) { // eslint-disable-line import/namespace    
    cmd = NuxtCommand.load(cmd)
  } else if (NuxtCommand.existsLocal(cmd)) {
    cmd = NuxtCommand.loadLocal(cmd)
  } else if (NuxtCommand.existsExternal(cmd)) {
    cmd = NuxtCommand.loadExternal(cmd)
  } else {
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
      listCommands().then(() => process.exit(0))
      return
    }
    cmd = NuxtCommand.load(defaultCommand)
  }
  process.argv.splice(2, 1)

  return cmd
    .then(command => command.run())
    .catch(error => consola.fatal(error))
}
