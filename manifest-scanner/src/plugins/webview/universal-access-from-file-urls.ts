import { ManifestPlugin } from "../ManifestPlugin";
import {
  Severity,
  searchKeywordInFile,
  getRelativePath,
  getJavaKotlinFiles,
} from "../util";

// write a rule to check if the javascript is set to true or false inside class WebView extended from BaseRule implemeting run method
export default class setAllowUniversalAccessFromFileURLs extends ManifestPlugin {
  // add constructor accepting category, severity and description

  constructor() {
    super(
      "WebView",
      Severity.VULNERABILITY,
      "In Android apps with a minSdkVersion less than 16, or in later versions where setAllowUniversalAccessFromFileURLs has been overridden, JavaScript running in a file scheme context has the ability to access content from any origin. This is considered a security risk due to the insecure default setting."
    );
  }

  run(): void {
    console.log("✅ Running WebView setAllowUniversalAccessFromFileURLs Rule");

    // get all files from directory
    const files = getJavaKotlinFiles(ManifestPlugin.androidProjectDirectory);
    for (const file of files) {
      const result = searchKeywordInFile(
        file,
        "setAllowUniversalAccessFromFileURLs(true)"
      );
      if (result) {
        // TODO: optimize the code: execute jar command and get method arguments
        this.issues.push({
          category: this.category,
          name: "WebView setAllowUniversalAccessFromFileURLs",
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
