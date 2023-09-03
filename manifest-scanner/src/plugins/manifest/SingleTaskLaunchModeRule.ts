import { ManifestPlugin } from "../ManifestPlugin";
import { Severity, getRelativePath, searchKeywordInFile } from "../util";

export default class SingleTaskLaunchModeRule extends ManifestPlugin {
  // add constructor accepting category, severity and description

  static TASK_LAUNCH_MODE_DESCRIPTION = `This results in AMS either resuming the earlier activity or loads it in a task with same affinity
or the activity is started as a new task. This may result in Task Poisoning.
https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-ren-chuangang.pdf`;

  constructor() {
    super(
      "Manifest",
      Severity.WARNING,
      SingleTaskLaunchModeRule.TASK_LAUNCH_MODE_DESCRIPTION
    );
  }

  run(): void {
    console.log("✅ Running SingleTaskLaunchMode Rule");
    const activityTag =
      ManifestPlugin.manifestXMLObject.manifest.application[0].activity;
    if (activityTag) {
      activityTag.forEach((activity: any) => {
        const launchMode = activity.$["android:launchMode"];

        if (launchMode && launchMode === "singleTask") {
          const result = searchKeywordInFile(
            ManifestPlugin.manifestPath,
            "android:launchMode"
          );
          this.issues.push({
            category: this.category,
            severity: this.severity,
            name: "Single Task Launch Mode Check",
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
