# manifest-scanner

Android Manifest Scanner CLI - DEVAA Security

Learn Mobile Application Security Vulnerabilities and how to fix them with [DEVAA Scanner](https://devaasecurity.com/)
 
Documentation Site: https://devaa-security.github.io/manifest-scanner/

<!-- toc -->
* [manifest-scanner](#manifest-scanner)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

- [manifest-scanner](#manifest-scanner)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

```sh-session
$ npm install -g manifest-scanner
$ manifest-scanner scan --file <ANDROID_PROJECT_DIRECTORY> --report json --output <OUTPUT_FILE> --enableAST
✅ Running AllowBackupRule
✅ Running AndroidDebuggableRule
✅ Running APIKeysRule
✅ Running Custom Permission Check Rule
✅ Running Exported Component Rule
✅ Running SingleTaskLaunchMode Rule
✅ Running Task ReParenting Rule
✅ Running WebView setAllowContentAccess Rule
✅ Running WebView SetAllowFileAccess Rule
✅ Running Webview DomStorageEnabled Rule
✅ Running Webview JavaScriptEnabled Rule
✅ Running Webview JavascriptInterface Rule
✅ Running Webview LoadDataWithBaseURL Rule
✅ Running WebView setAllowUniversalAccessFromFileURLs Rule
✅ Running WebView setWebContentsDebuggingEnabled Rule
...
$ manifest-scanner (--version)
manifest-scanner/1.0.1 win32-x64 node-v18.15.0
$ manifest-scanner --help [COMMAND]
USAGE
  $ manifest-scanner COMMAND
...
```

# Commands

- [`manifest-scanner help [COMMANDS]`](#manifest-scanner-help-commands)

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
