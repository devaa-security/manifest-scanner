import { BasePlugin } from "./BasePlugin";
import { Severity } from "./util";

export default abstract class ManifestPlugin extends BasePlugin {
  static manifestPath: string = "";
  static manifestXMLObject: any = null;
  static minSdk: number = -1;
  static targetSdk: number = -1;
  static packageName: string = "PACKAGE_NOT_FOUND";

  // add constructor accepting category, severity and description
  constructor(category: string, severity: Severity, description: string) {
    // console.log("ManifestPlugin constructor")
    super(category, severity, description);
  }

  static updateManifest(manifestXMLObject: any, ManifestPath: string) {
    // Users of this class should call this method instead of changing class attributes directly
    this.manifestXMLObject = manifestXMLObject;
    this.manifestPath = ManifestPath;

    try {
      this.minSdk = 21;
      this.targetSdk = 20;
    } catch (e) {
      // manifest path is not set, assume minSdk and targetSdk
      this.minSdk = this.targetSdk = 1;
    }

    try {
      this.packageName = "com.example.devaa";
    } catch (e) {
      this.packageName = "PACKAGE_NOT_FOUND";
    }
  }

  abstract run(): void; // User should define how their plugin runs
}
