import {ManifestPlugin} from '../ManifestPlugin'
import {Severity, searchKeywordInFile, getRelativePath, getJavaKotlinFiles} from '../util'

// write a rule to check if the javascript is set to true or false inside class WebView extended from BaseRule implemeting run method
export default class SetAllowFileAccess extends ManifestPlugin {
  // add constructor accepting category, severity and description

  constructor() {
    super(
      'WebView',
      Severity.VULNERABILITY,
      'The vulnerability concerns the WebView having file system access enabled. When a WebView can access the file system and untrusted data is used to determine the URL it opens, there\'s a risk that a malicious app or website could read the private files of your app, especially if the response is returned to them. It\'s crucial to be cautious about the sources from which the WebView loads content to prevent potential data breaches.'  
    )
  }

  run(): void {
    console.log('✅ Running WebView SetAllowFileAccess Rule')

    // get all files from directory
    const files = getJavaKotlinFiles(ManifestPlugin.androidProjectDirectory)
    for (const file of files) {
      const result = searchKeywordInFile(
        file,
        'setAllowFileAccess(false)',
      )
      if (result) {
        // TODO: optimize the code: execute jar command and get method arguments
        this.issues.push({
          category: this.category,
          name: 'WebView setAllowFileAccess',
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
