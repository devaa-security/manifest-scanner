import {ManifestPlugin} from '../ManifestPlugin'
import {Severity, searchKeywordInFile, getRelativePath, getJavaKotlinFiles} from '../util'

// write a rule to check if the javascript is set to true or false inside class WebView extended from BaseRule implemeting run method
export default class SetAllowContentAccess extends ManifestPlugin {
  // add constructor accepting category, severity and description

  constructor() {
    super(
      'WebView',
      Severity.VULNERABILITY,
      'Although it\'s not inherently a security flaw, the app doesn\'t seem to specifically block Content Provider access from WebViews. If these WebViews process untrusted input, it could potentially lead to data theft.'  
    )
  }

  run(): void {
    console.log('✅ Running WebView setAllowContentAccess Rule')

    // get all files from directory
    const files = getJavaKotlinFiles(ManifestPlugin.androidProjectDirectory)
    for (const file of files) {
      const result = searchKeywordInFile(
        file,
        'setAllowContentAccess(false)',
      )
      if (!result) {
        // TODO: optimize the code: execute jar command and get method arguments
        this.issues.push({
          category: this.category,
          name: 'WebView setAllowContentAccess',
          severity: this.severity,
          description: this.description,
          file: getRelativePath(
            ManifestPlugin.androidProjectDirectory,
            file,
          ),
          line: 0,
          start_column: 0,
          end_column: 0,
        })
      }
    }
  }
}
