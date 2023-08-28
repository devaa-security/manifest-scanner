# Manifest-Scanner

OpenSource Android Project Vulnerability Scanner from [Devaa Security](https://devaasecurity.com) helps in identifying vulnerabilities and configurations in Android source code during development and in CI/CD pipelines.

## Overview

Manifest-Scanner is a command line tool that scans Android source code for vulnerabilities and configurations. It can be used to scan source code for vulnerabilities and configurations during development and in CI/CD pipelines. OWASP MASVS and MSTG security standards are used as a reference to scan for vulnerabilities and configurations. 

## Capabilities

Manifest-Scanner can scan Android source code for the following vulnerabilities and configurations:

* [CWE-732: Incorrect Permission Assignment for Critical Resource](https://cwe.mitre.org/data/definitions/732.html)
* [CWE-489: Leftover Debug Code](https://cwe.mitre.org/data/definitions/489.html)
* [CWE-926: Improper Export of Android Application Components](https://cwe.mitre.org/data/definitions/926.html)
* [CWE-530: Exposure of Backup File to an Unauthorized Control Sphere](https://cwe.mitre.org/data/definitions/530.html)

## Install

Manifest-Scanner can be installed using npm:

```shell
$ npm install -g manifest-scanner

$ manifest-scanner scan --file <ANDROID_PROJECT_DIRECTORY> --report json --output <OUTPUT_FILE>

✅ Running AllowBackupRule
✅ Running AndroidDebuggableRule
✅ Running APIKeysRule
✅ Running Custom Permission Check Rule
✅ Running Exported Component Rule
✅ Running SingleTaskLaunchMode Rule
✅ Running Task ReParenting Rule
...

$ manifest-scanner (--version)
manifest-scanner/1.1.0 win32-x64 node-v18.15.0
```



