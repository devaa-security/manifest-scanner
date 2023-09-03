## Manifest Scanner

[![npm version](https://badge.fury.io/js/manifest-scanner.svg)](https://badge.fury.io/js/manifest-scanner)

`Manifest Scanner` is a opensource drop-in replacement for outdated `linkedin/qark` scanner tool. This scanner scans Android source code project and leverages plugins (such as Java AST) to find vulnerabilities and vulnerable configurations within the Android project 📱. Try [DEVAA Scanner](https://devaasecurity.com/) which has advanced security rules check, reduces false positives and nice integrates with your app development workflow.

## Usage

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
```

### Vulnerable Configuration Checks

Learn Mobile Application Security Vulnerabilities and how to fix them with [DEVAA Scanner](https://devaasecurity.com/)
 
Documentation Site: https://devaa-security.github.io/manifest-scanner/

| **Rule**                     | **Description**                                                                                                                                                                                                                                                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Allow Backup Config Rule     | Enabling this config could allow backup sensitive information from Android app's internal storage. Local access to the phone with adb command could dump the backup from the apps enabled with backup config.                                                                                                                                    |
| Android Debuggable Config    | The android:debuggable flag is manually set to true in the AndroidManifest.xml. This will cause your application to be debuggable in production builds and can result in data leakage and other security issues. It is not necessary to set the android:debuggable flag in the manifest, it will be set appropriately automatically by the tools |
|  API Keys Rule               | Detects any API keys that embedded within AndroidManifest.XML file                                                                                                                                                                                                                                                                               |
| Exported Components Rule     | This rule helps in identifying components that are exported, but not protected by any permissions. Failing to protect components could leave them vulnerable to attack by malicious apps. The exported tag should be reviewed for vulnerabilities, such as injection and information leakage.                                                    |
| Single Task Launch Mode Rule | This results in Apps either resuming the earlier activity or loads it in a task with same affinity or the activity is started as a new task. This may result in Task Poisoning. https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-ren-chuangang.pdf                                                                    |
| Task Reparenting Rule        | This allows an existing activity to be reparented to a new native task i.e task having the same affinity as the activity. This may lead to UI spoofing attack on this application. https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-ren-chuangang.pdf                                                                 |



### Contribution

- @s5dev

### License

MIT License
