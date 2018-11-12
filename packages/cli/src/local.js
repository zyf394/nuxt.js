
const filterCommands = (dir) => {
  return readdirSync(dir).filter(c => c.endsWith('.js'))
}

export function getLocalCommands() {
  const cmdsRoot = resolve('.', 'commands')
  const cmds = filterCommands(cmdsRoot)
  return cmds.map(cmd => parse(cmd).name)
}

export 

export function 