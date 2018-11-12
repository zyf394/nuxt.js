## Proposal: App Modules

Currently, Nuxt modules must be simple exported functions, either provided 
directly or via an installed package. As a means of providing both the ability
to run bundled Nuxt apps (in a module package) and  any custom commands it may 
expose, I propose we extend the Nuxt Module spec to also allow adding Nuxt 
application files to the package's root directory.

This means that `sample-module` (a NPM-published package) may have as its main
module a file that properly exports a function, like Nuxt expects -- but also
include files such as `nuxt.config.js`, `pages` and `commands` as part of the
package, which can be resolved and loaded by `@nuxt/cli`.
