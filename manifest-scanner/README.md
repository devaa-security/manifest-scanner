# oclif-hello-world

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->

- [oclif-hello-world](#oclif-hello-world)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g manifest-scanner
$ manifest-scanner COMMAND
running command...
$ manifest-scanner (--version)
manifest-scanner/1.0.0 win32-x64 node-v18.15.0
$ manifest-scanner --help [COMMAND]
USAGE
  $ manifest-scanner COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`manifest-scanner help [COMMANDS]`](#manifest-scanner-help-commands)
- [`manifest-scanner plugins`](#manifest-scanner-plugins)
- [`manifest-scanner plugins:install PLUGIN...`](#manifest-scanner-pluginsinstall-plugin)
- [`manifest-scanner plugins:inspect PLUGIN...`](#manifest-scanner-pluginsinspect-plugin)
- [`manifest-scanner plugins:install PLUGIN...`](#manifest-scanner-pluginsinstall-plugin-1)
- [`manifest-scanner plugins:link PLUGIN`](#manifest-scanner-pluginslink-plugin)
- [`manifest-scanner plugins:uninstall PLUGIN...`](#manifest-scanner-pluginsuninstall-plugin)
- [`manifest-scanner plugins:uninstall PLUGIN...`](#manifest-scanner-pluginsuninstall-plugin-1)
- [`manifest-scanner plugins:uninstall PLUGIN...`](#manifest-scanner-pluginsuninstall-plugin-2)
- [`manifest-scanner plugins update`](#manifest-scanner-plugins-update)
- [`manifest-scanner scan`](#manifest-scanner-scan)

## `manifest-scanner help [COMMANDS]`

Display help for manifest-scanner.

```
USAGE
  $ manifest-scanner help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for manifest-scanner.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `manifest-scanner plugins`

List installed plugins.

```
USAGE
  $ manifest-scanner plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ manifest-scanner plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.4/src/commands/plugins/index.ts)_

## `manifest-scanner plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ manifest-scanner plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ manifest-scanner plugins add

EXAMPLES
  $ manifest-scanner plugins:install myplugin

  $ manifest-scanner plugins:install https://github.com/someuser/someplugin

  $ manifest-scanner plugins:install someuser/someplugin
```

## `manifest-scanner plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ manifest-scanner plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ manifest-scanner plugins:inspect myplugin
```

## `manifest-scanner plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ manifest-scanner plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ manifest-scanner plugins add

EXAMPLES
  $ manifest-scanner plugins:install myplugin

  $ manifest-scanner plugins:install https://github.com/someuser/someplugin

  $ manifest-scanner plugins:install someuser/someplugin
```

## `manifest-scanner plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ manifest-scanner plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ manifest-scanner plugins:link myplugin
```

## `manifest-scanner plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ manifest-scanner plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ manifest-scanner plugins unlink
  $ manifest-scanner plugins remove
```

## `manifest-scanner plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ manifest-scanner plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ manifest-scanner plugins unlink
  $ manifest-scanner plugins remove
```

## `manifest-scanner plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ manifest-scanner plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ manifest-scanner plugins unlink
  $ manifest-scanner plugins remove
```

## `manifest-scanner plugins update`

Update installed plugins.

```
USAGE
  $ manifest-scanner plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `manifest-scanner scan`

describe the command here

```
USAGE
  $ manifest-scanner scan [-f <value>] [-r <value>]

FLAGS
  -f, --file=<value>    Path to the Android Project
  -r, --report=<value>  Report format (json, text)

DESCRIPTION
  describe the command here

EXAMPLES
  $ manifest-scanner scan
```

_See code: [dist/commands/scan.ts](https://github.com/devaa-security/manifest-scanner/blob/v1.0.0/dist/commands/scan.ts)_

<!-- commandsstop -->
