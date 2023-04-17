import { ManifestPlugin } from "../ManifestPlugin";
import { Severity, getRelativePath, searchKeywordInFile } from "../util";

// write a rule to check if the custom permission tag is available
export default class CustomPermissionRule extends ManifestPlugin {
  // add constructor accepting category, severity and description

  SIGNATURE_OR_SIGNATURE_OR_SYSTEM_DESCRIPTION =
    "This permission can be obtained by malicious apps installed prior to this \
one, without the proper signature. Applicable to Android Devices prior to \
L (Lollipop). More info: \
https://github.com/commonsguy/cwac-security/blob/master/PERMS.md";

  DANGEROUS_PERMISSION_DESCRIPTION =
    "This permission can give a requesting application access to private user data or control over the \
device that can negatively impact the user.";

  constructor() {
    super(
      "Manifest",
      Severity.WARNING,
      "Custom Permission: The application is using a custom permission."
    );
  }

  run(): void {
    console.log("✅ Running Custom Permission Check Rule");
    let permissions = ManifestPlugin.manifestXMLObject.manifest.permission;

    if (permissions) {
      for (let permission of permissions) {
        let permissionName = permission.$["android:name"];
        if (permissionName) {
          if (permissionName.startsWith("android.permission.")) {
            continue;
          }
          let result = searchKeywordInFile(
            ManifestPlugin.manifestPath,
            permissionName
          );

          // check if protection level is dangerous and add to issues
          let protectionLevel = permission.$["android:protectionLevel"];
          if (protectionLevel) {
            if (protectionLevel === "dangerous") {
              this.issues.push({
                category: this.category,
                severity: Severity.INFO,
                name: "Custom Permission Check",
                description: this.DANGEROUS_PERMISSION_DESCRIPTION,
                file: getRelativePath(
                  ManifestPlugin.androidProjectDirectory,
                  ManifestPlugin.manifestPath
                ), // TODO: return only relative path from root
                line: result?.line,
                start_column: result?.start_column,
                end_column: result?.end_column,
              });
            }
            // else if protection level is signature or signatureOrSystem  add to issues
            else if (
              protectionLevel === "signature" ||
              protectionLevel === "signatureOrSystem"
            ) {
              if (ManifestPlugin.targetSdk < 21) {
                this.issues.push({
                  category: this.category,
                  name: "Custom Permission Check",
                  severity: this.severity,
                  description:
                    this.SIGNATURE_OR_SIGNATURE_OR_SYSTEM_DESCRIPTION,
                  file: getRelativePath(
                    ManifestPlugin.androidProjectDirectory,
                    ManifestPlugin.manifestPath
                  ), // TODO: return only relative path from root
                  line: result?.line,
                  start_column: result?.start_column,
                  end_column: result?.end_column,
                });
              }
            }
          }
        }
      }
    }
  }
}
