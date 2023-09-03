import {ManifestPlugin} from '../ManifestPlugin'
import {Severity, searchKeywordInFile, getRelativePath, getJavaKotlinFiles} from '../util'

// write a rule to check if the javascript is set to true or false inside class WebView extended from BaseRule implemeting run method
export default class DomStorageEnabled extends ManifestPlugin {
  // add constructor accepting category, severity and description

  constructor() {
    super(
      'WebView',
      Severity.INFO,
      'DOM Storage enabled for this WebView, there is a potential for caching sensitive information.'  
    )
  }

  run(): void {
    console.log('✅ Running Webview DomStorageEnabled Rule')

    // get all files from directory
    const files = getJavaKotlinFiles(ManifestPlugin.androidProjectDirectory)
    for (const file of files) {
      const result = searchKeywordInFile(
        file,
        'setDomStorageEnabled(true)',
      )
      if (result) {
        // TODO: optimize the code: execute jar command and get method arguments
        this.issues.push({
          category: this.category,
          name: 'Webview DomStorage',
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
