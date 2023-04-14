import { BasePlugin } from "./BasePlugin";
import { Severity } from "./util";

export default abstract class ManifestPlugin extends BasePlugin {
    manifestXMLObject: any = null;
    minSdk: number = -1;
    targetSdk: number = -1;
    packageName: string = "PACKAGE_NOT_FOUND";

    // add constructor accepting category, severity and description
    constructor(
        category: string, 
        severity: Severity,
        description: string
    ) {
        console.log("ManifestPlugin constructor")
        super(category, severity, description);
    }
  
    updateManifest(manifestXMLObject: any) {
      // Users of this class should call this method instead of changing class attributes directly
      this.manifestXMLObject = manifestXMLObject;
  
      try {
        this.minSdk = 21;
        this.targetSdk = 31;
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