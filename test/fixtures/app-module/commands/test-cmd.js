import consola from 'consola'

export default {
  name: 'test-cmd',
  description: 'App Module Command',
  usage: 'test-cmd <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Simple test string'
    }
  },
  run(cmd) {
    try {
      const argv = cmd.getArgv()
      consola.info(argv._[1])
      process.exit(0)
    } catch (err) {
      consola.fatal(err)
    }
  }
}
