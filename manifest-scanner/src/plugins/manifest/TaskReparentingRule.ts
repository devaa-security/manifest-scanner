import { ManifestPlugin } from "../ManifestPlugin";
import { Severity, getRelativePath, searchKeywordInFile } from "../util";

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
    const activityTag =
      ManifestPlugin.manifestXMLObject.manifest.application[0].activity;
    if (activityTag) {
      activityTag.forEach((activity: any) => {
        const launchMode = activity.$["android:allowTaskReparenting"];

        if (launchMode && launchMode === "true") {
          const result = searchKeywordInFile(
            ManifestPlugin.manifestPath,
            "android:allowTaskReparenting"
          );
          this.issues.push({
            category: this.category,
            severity: this.severity,
            name: "Task ReParenting Check",
            description: this.description,
            file: getRelativePath(
              ManifestPlugin.androidProjectDirectory,
              ManifestPlugin.manifestPath
            ), // TODO: return only relative path from root
            line: result?.line,
            start_column: result?.start_column,
            end_column: result?.end_column,
          });
        }
      });
    }
  }
}
