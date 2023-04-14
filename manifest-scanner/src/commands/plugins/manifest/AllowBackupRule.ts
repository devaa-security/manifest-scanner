import ManifestPlugin from "../ManifestPlugin";
import {Severity} from "../util";

// write a rule to check if the allowBackup attribute is set to true or false inside class AllowBackupRule extended from BaseRule implemeting run method
export default class AllowBackupRule extends ManifestPlugin {

  // add constructor accepting category, severity and description
  constructor(category: string,
    severity: Severity,
    description: string) {
    super(category, severity, description);
  }

  run(): void {
    console.log("Running AllowBackupRule");
  }
}
