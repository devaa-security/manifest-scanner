import { ManifestPlugin } from "../ManifestPlugin";
import { Severity, searchKeywordInFile, getRelativePath } from "../util";

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
    const applicationTag =
      ManifestPlugin.manifestXMLObject.manifest.application;
    if (applicationTag && applicationTag.length > 0 && applicationTag[0].$) {
      const allowBackupAttribute = applicationTag[0].$["android:allowBackup"];

      if (allowBackupAttribute && allowBackupAttribute === "true") {
        const result = searchKeywordInFile(
          ManifestPlugin.manifestPath,
          "android:allowBackup"
        );
        this.issues.push({
          category: this.category,
          name: "Allow Backup Check",
          severity: this.severity,
          description: this.description,
          file: getRelativePath(
            ManifestPlugin.androidProjectDirectory,
            ManifestPlugin.manifestPath
          ),
          line: result?.line,
          start_column: result?.start_column,
          end_column: result?.end_column,
        });
      }
    }
  }
}
