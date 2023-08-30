import {ManifestPlugin} from '../ManifestPlugin'
import {Severity, searchKeywordInFile, getRelativePath, getJavaKotlinFiles} from '../util'

// write a rule to check if the javascript is set to true or false inside class WebView extended from BaseRule implemeting run method
export default class JavaScriptEnabled extends ManifestPlugin {
  // add constructor accepting category, severity and description
  constructor() {
    super(
      'WebView',
      Severity.INFO,
      'While not a vulnerability by itself, it appears this app has JavaScript enabled in the WebView: If this is not expressly necessary, you should disable it, to prevent the possibility of XSS (cross-site scripting) attacks',
    )
  }

  run(): void {
    console.log('✅ Running JavaScriptEnabled Rule')

    // get all files from directory
    const files = getJavaKotlinFiles(ManifestPlugin.androidProjectDirectory)
    for (const file of files) {
      const result = searchKeywordInFile(
        file,
        'setJavaScriptEnabled(true)',
      )
      if (result) {
        // TODO: optimize the code: execute jar command and get method arguments
        this.issues.push({
          category: this.category,
          name: 'Webview Javascript Enabled',
          severity: this.severity,
          description: this.description,
          file: getRelativePath(
            ManifestPlugin.androidProjectDirectory,
            file,
          ),
          line: result?.line,
          start_column: result?.start_column,
          end_column: result?.end_column,
        })
      }
    }
  }
}
