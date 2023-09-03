import { ManifestPlugin } from "../ManifestPlugin";
import {
  Severity,
  searchKeywordInFile,
  getRelativePath,
  getJavaKotlinFiles,
} from "../util";

// write a rule to check if the javascript is set to true or false inside class WebView extended from BaseRule implemeting run method
export default class LoadDataWithBaseURL extends ManifestPlugin {
  // add constructor accepting category, severity and description

  constructor() {
    super(
      "WebView",
      Severity.INFO,
      "The vulnerability is related to the WebView setting the BaseURL. It's essential to ensure that content is loaded exclusively from the specified domain. If content is loaded from an uncontrolled domain or via unencrypted plain-text HTTP, it exposes the BaseURL domain to potential injection attacks. Developers should be vigilant about this risk and ensure that only trusted and secure sources are used in conjunction with the BaseURL setting."
    );
  }

  run(): void {
    console.log("✅ Running Webview LoadDataWithBaseURL Rule");

    // get all files from directory
    const files = getJavaKotlinFiles(ManifestPlugin.androidProjectDirectory);
    for (const file of files) {
      const result = searchKeywordInFile(file, "loadDataWithBaseURL");
      if (result) {
        // TODO: optimize the code: execute jar command and get method arguments
        this.issues.push({
          category: this.category,
          name: "WebView LoadDataWithBaseURL",
          severity: this.severity,
          description: this.description,
          file: getRelativePath(ManifestPlugin.androidProjectDirectory, file),
          line: result?.line,
          start_column: result?.start_column,
          end_column: result?.end_column,
        });
      }
    }
  }
}
