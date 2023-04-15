import ManifestPlugin from "../ManifestPlugin";
import { Severity, searchKeywordInFile } from "../util";

export default class ExportedComponentRule extends ManifestPlugin {
  // add constructor accepting category, severity and description

  BAD_EXPORTED_TAGS = [
    "activity",
    "activity-alias",
    "service",
    "receiver",
    "provider",
  ];

  constructor() {
    super("Manifest", Severity.VULNERABILITY, "Exported components:");
  }

  run(): void {
    console.log("✅ Running Exported Component Rule");
    // Parse Android Manifest for exported components
    // filter noise permission usage
    // filter noise exported=false
    // Parse Android:name value and Start finding Implementation
    // using JavaParser / KotlinParser and build AST
    // find lifecycle method implementation first
    // find for method invocation of Intent accepting APIs
    // Mark these classes as vulnerable
  }
}
