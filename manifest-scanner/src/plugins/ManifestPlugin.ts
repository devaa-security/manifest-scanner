import { BasePlugin } from "./BasePlugin";
import { Severity } from "./util";

export default abstract class ManifestPlugin extends BasePlugin {
  static manifestPath = "";
  static manifestXMLObject: any = null;
  static minSdk = -1;
  static targetSdk = -1;
  static packageName = "PACKAGE_NOT_FOUND";
  static androidProjectDirectory = "";
  static isASTEnabled = false;

  // add constructor accepting category, severity and description
  constructor(category: string, severity: Severity, description: string) {
    // console.log("ManifestPlugin constructor")
    super(category, severity, description);
  }

  static updateManifest(
    manifestXMLObject: any,
    ManifestPath: string,
    projectDirectory: any,
    isASTEnabled: boolean
  ) {
    // Users of this class should call this method instead of changing class attributes directly
    this.manifestXMLObject = manifestXMLObject;
    this.manifestPath = ManifestPath;
    this.androidProjectDirectory = projectDirectory;
    this.isASTEnabled = isASTEnabled;

    try {
      this.minSdk =
        manifestXMLObject.manifest.usesSdk[0].$["android:minSdkVersion"];
      this.targetSdk =
        manifestXMLObject.manifest.usesSdk[0].$["android:targetSdkVersion"];
    } catch {
      // manifest path is not set, assume minSdk and targetSdk
      this.minSdk = this.targetSdk = 1;
    }

    try {
      this.packageName = manifestXMLObject.manifest.$.package;
    } catch {
      this.packageName = "PACKAGE_NOT_FOUND";
    }
  }

  abstract run(): void; // User should define how their plugin runs
}

export { ManifestPlugin };
