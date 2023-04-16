## Manifest Scanner

`Manifest Scanner` is upcoming drop-in replacement for `linkedin/qark` scanner tool. This scanner scans Android source code project and leverages plugins to find vulnerabilities and vulnerable configurations within the project 📱

## `manifest-scanner scan`

DEVAA Manifest Scanner helps to scan for vulnerable configurations in Android Manifest file

```
USAGE
  $ manifest-scanner scan [-f <value>] [-r <value>]

FLAGS
  -f, --file=<value>    Path to the Android Project
  -r, --report=<value>  Report format (json)

DESCRIPTION
  DEVAA Manifest Scanner helps to scan for vulnerable configurations in Android Manifest file
```

_See code: [dist/commands/scan.ts](https://github.com/devaa-security/manifest-scanner/blob/v1.0.0/dist/commands/scan.ts)_

<!-- commandsstop -->

## Manifest Plugins

### AllowBackup Flag

### Android Debuggable Flag

### Exported Components Flag
