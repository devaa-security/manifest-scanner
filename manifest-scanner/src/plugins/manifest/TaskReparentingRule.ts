import ManifestPlugin from "../ManifestPlugin";
import { Severity, searchKeywordInFile } from "../util";

export default class TaskReParentingRule extends ManifestPlugin {
  // add constructor accepting category, severity and description

  static TASK_REPARENTING_DESCRIPTION = `This allows an existing activity to be reparented to a new native task i.e task having the same affinity as the
activity. This may lead to UI spoofing attack on this application.
https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-ren-chuangang.pdf`;

  constructor() {
    super(
      "Manifest",
      Severity.WARNING,
      TaskReParentingRule.TASK_REPARENTING_DESCRIPTION
    );
  }

  run(): void {
    console.log("✅ Running Task ReParenting Rule");
    let activityTag =
      ManifestPlugin.manifestXMLObject.manifest.application[0].activity;
    if (activityTag) {
      activityTag.forEach((activity: any) => {
        let launchMode = activity.$["android:allowTaskReparenting"];

        if (launchMode) {
          if (launchMode === "true") {
            let result = searchKeywordInFile(
              ManifestPlugin.manifestPath,
              "android:allowTaskReparenting"
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
      });
    }
  }
}
