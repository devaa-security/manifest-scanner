import {ManifestPlugin} from '../ManifestPlugin'
import {Severity, getRelativePath, searchKeywordInFile} from '../util'
import * as fs from 'node:fs'

// write a rule to check if the allowBackup attribute is set to true or false inside class AllowBackupRule extended from BaseRule implemeting run method
export default class APIKeysRule extends ManifestPlugin {
  // add constructor accepting category, severity and description

  API_KEY_REGEX = '(?=.{20,})(?=.+d)(?=.+[a-z])(?=.+[A-Z])';
  SPECIAL_CHARACTER_REGEX = '(?=.+[!$%^~])';
  HARDCODED_API_KEY_REGEX = 'api_key|api|key';
  META_DATA_REGEX = '<meta-data';

  constructor() {
    super(
      'Manifest',
      Severity.INFO,
      'Found API Keys: Please evaluate the sensitivity of the API keys and remove them if they are not required.',
    )
  }

  run(): void {
    console.log('✅ Running APIKeysRule')
    // read Manifest file line by line using fs sync read
    const manifestFile = fs.readFileSync(ManifestPlugin.manifestPath, 'utf8')
    const lines = manifestFile.split('\n')
    let lineNum = 1
    for (const line of lines) {
      // check if line contains API key regex
      // TODO: Improve check by parsing meta-data and calculate entropy
      if (
        line.indexOf(this.META_DATA_REGEX) > 0 &&
        (this.HARDCODED_API_KEY_REGEX.test(line) ||
          this.API_KEY_REGEX.test(line))
      ) {
        this.issues.push({
          category: this.category,
          name: 'API Keys Check',
          severity: this.severity,
          description: this.description,
          file: getRelativePath(
            ManifestPlugin.androidProjectDirectory,
            ManifestPlugin.manifestPath,
          ), // TODO: return only relative path from root
          line: lineNum,
          start_column: 0, // TODO: Fix this
          end_column: 0, // TODO: Fix this
        })
      }

      lineNum++
    }
  }
}
