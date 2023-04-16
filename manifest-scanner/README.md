# manifest-scanner

Android Manifest Scanner CLI - DEVAA Security

<!-- toc -->
* [manifest-scanner](#manifest-scanner)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g manifest-scanner
$ manifest-scanner COMMAND
running command...
$ manifest-scanner (--version)
manifest-scanner/1.0.1 win32-x64 node-v18.15.0
$ manifest-scanner --help [COMMAND]
USAGE
  $ manifest-scanner COMMAND
...
```
<!-- usagestop -->

# Commands

* [`manifest-scanner help [COMMANDS]`](#manifest-scanner-help-commands)


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


## `manifest-scanner scan`

DEVAA Manifest Scanner helps to scan for vulnerable configurations in Android Manifest file

```
USAGE
  $ manifest-scanner scan [-f <value>] [-r <value>] [-o <value>]

FLAGS
  -f, --file=<value>    Path to the Android Project
  -o, --output=<value>  Output File Path
  -r, --report=<value>  Report format (json)

DESCRIPTION
  DEVAA Manifest Scanner helps to scan for vulnerable configurations in Android Manifest file
```

_See code: [dist/commands/scan.ts](https://github.com/devaa-security/manifest-scanner/blob/v1.0.1/dist/commands/scan.ts)_
<!-- commandsstop -->
