import ManifestPlugin from "../ManifestPlugin";
import { Severity, searchKeywordInFile } from "../util";

// write a rule to check if the allowBackup attribute is set to true or false inside class AllowBackupRule extended from BaseRule implemeting run method
export default class AllowBackupRule extends ManifestPlugin {
  // add constructor accepting category, severity and description
  constructor() {
    super(
      "Manifest",
      Severity.WARNING,
      "Backups enabled: Potential for data theft via local attacks via adb backup, if the device has USB debugging enabled (not common). "
    );
  }

  run(): void {
    console.log("✅ Running AllowBackupRule");
    let applicationTag = ManifestPlugin.manifestXMLObject.manifest.application;
    if (applicationTag) {
      let allowBackupAttribute = applicationTag[0].$["android:allowBackup"];

      if (allowBackupAttribute) {
        if (allowBackupAttribute === "true") {
          let result = searchKeywordInFile(
            ManifestPlugin.manifestPath,
            "android:allowBackup"
          );
          this.issues.push({
            category: this.category,
            severity: this.severity,
            description: this.description,
            location: {
              file: ManifestPlugin.manifestPath, // TODO: return only relative path from root
              line: result?.line,
              column: result?.column,
            },
          });
        }
      }
    }
  }
}
