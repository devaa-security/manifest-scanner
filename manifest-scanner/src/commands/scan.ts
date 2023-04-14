import { Args, Command, Flags } from "@oclif/core";
import { findFileInDirectory, parseXmlFileToJson } from "./utils/fileutils";
import AllowBackupRule from "./plugins/manifest/AllowBackupRule";
import AndroidDebuggableRule from "./plugins/manifest/AndroidDebuggableRule";

export default class Scan extends Command {
  static description =
    "DEVAA Manifest Scanner helps to scan for vulnerable configurations in Android Manifest file";

  static flags = {
    // flag with a value (-f, --file=VALUE)
    file: Flags.string({
      char: "f",
      description: "Path to the Android Project",
    }),
    // flag with no value (-r, --report)
    report: Flags.string({
      char: "r",
      description: "Report format (json, text)",
    }),
  };

  // static args = {
  //   file: Args.string({description: 'file to read'}),
  // }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Scan);

    const name = flags.name ?? "world";
    this.log(`hello ${name} from scan.ts`);
    if (flags.file && flags.report) {
      this.log(
        `you input --report and --file: ${flags.file} and ${flags.report}`
      );
    }

    // throw error if required flags are not provided
    if (!flags.file) {
      this.error("Please provide a file path");
    }

    if (!flags.report) {
      this.error("Please provide a report format");
    }

    const filePath = findFileInDirectory(flags.file, "AndroidManifest.xml");

    if (filePath) {
      console.log(`Found file at: ${filePath}`);
      parseXmlFileToJson(filePath)
        .then((result: any) => {
          //  console.log(JSON.stringify(result, null, 2));
          let AndroidManifestXML = JSON.parse(JSON.stringify(result, null, 2));
          try {
            let allowBackupRule = new AllowBackupRule();
            allowBackupRule.updateManifest(AndroidManifestXML, filePath);
            allowBackupRule.run();
            console.log(allowBackupRule.issues);

            let androidDebuggableRule = new AndroidDebuggableRule();
            androidDebuggableRule.updateManifest(AndroidManifestXML, filePath);
            androidDebuggableRule.run();
            console.log(androidDebuggableRule.issues);
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error: any) => {});
    } else {
      this.error(
        "AndroidManifest.xml not found. Please provide a valid path to the Android Project"
      );
    }
  }
}
