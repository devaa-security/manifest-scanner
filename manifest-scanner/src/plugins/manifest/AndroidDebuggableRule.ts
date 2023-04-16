import ManifestPlugin from "../ManifestPlugin";
import { Severity, getRelativePath, searchKeywordInFile } from "../util";

// write a rule to check if the allowBackup attribute is set to true or false inside class AndroidDebuggable extended from BaseRule implemeting run method
export default class AndroidDebuggableRule extends ManifestPlugin {
  // add constructor accepting category, severity and description
  constructor() {
    super(
      "Manifest",
      Severity.VULNERABILITY,
      "The android:debuggable flag is manually set to true in the AndroidManifest.xml. This will cause your application to be debuggable \
in production builds and can result in data leakage \
and other security issues. It is not necessary to set the \
android:debuggable flag in the manifest, it will be set appropriately \
automatically by the tools"
    );
  }

  run(): void {
    console.log("✅ Running AndroidDebuggableRule");
    let applicationTag = ManifestPlugin.manifestXMLObject.manifest.application;
    if (applicationTag) {
      let allowBackupAttribute = applicationTag[0].$["android:debuggable"];

      if (allowBackupAttribute) {
        if (allowBackupAttribute === "true") {
          let result = searchKeywordInFile(
            ManifestPlugin.manifestPath,
            "android:debuggable"
          );
          this.issues.push({
            category: this.category,
            name: "Android Debuggable Check",
            severity: this.severity,
            description: this.description,
            file: getRelativePath(
              ManifestPlugin.androidProjectDirectory,
              ManifestPlugin.manifestPath
            ), // TODO: return only relative path from root
            line: result?.line,
            column: result?.column,
          });
        }
      }
    }
  }
}
