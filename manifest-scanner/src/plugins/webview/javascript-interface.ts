import { ManifestPlugin } from "../ManifestPlugin";
import {
  Severity,
  searchKeywordInFile,
  getRelativePath,
  getJavaKotlinFiles,
} from "../util";

// write a rule to check if the javascript is set to true or false inside class WebView extended from BaseRule implemeting run method
export default class JavascriptInterface extends ManifestPlugin {
  // add constructor accepting category, severity and description

  constructor() {
    super(
      "WebView",
      Severity.VULNERABILITY,
      "The vulnerability pertains to the use of the addJavascriptInterface method in apps that run on Android versions prior to API 17. In such scenarios, all public methods become accessible to JavaScript code executing within the WebView. This can pose a significant security risk, as malicious JavaScript can exploit these methods, potentially leading to unintended behaviors or data breaches. It's crucial for developers to be aware of this vulnerability and take necessary precautions, especially if the app is designed for older Android versions."
    );
  }

  run(): void {
    console.log("✅ Running Webview JavascriptInterface Rule");

    // get all files from directory
    const files = getJavaKotlinFiles(ManifestPlugin.androidProjectDirectory);
    for (const file of files) {
      const result = searchKeywordInFile(file, "addJavascriptInterface");
      if (result) {
        // TODO: optimize the code: execute jar command and get method arguments
        this.issues.push({
          category: this.category,
          name: "Webview Javascript Interface",
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
