import { Args, Command, Flags } from "@oclif/core";
import { findFileInDirectory, parseXmlFileToJson } from "../utils/fileutils";
import { ManifestPlugin } from "../plugins/ManifestPlugin";
import path = require("path");
const fs = require("fs/promises");

export default class Scan extends Command {
  static description =
    "DEVAA Manifest Scanner helps to scan for vulnerable configurations in Android Manifest file";

  issues = [];

  static flags = {
    // flag with a value (-f, --file=VALUE)
    file: Flags.string({
      char: "f",
      description: "Path to the Android Project",
    }),
    // flag with no value (-r, --report)
    report: Flags.string({
      char: "r",
      description: "Report format (json)",
    }),
    output: Flags.string({
      char: "o",
      description: "Output File Path",
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
          ManifestPlugin.updateManifest(
            AndroidManifestXML,
            filePath,
            flags.file
          );

          const folders = [path.join(__dirname, "..", "plugins", "manifest")];

          (async () => {
            for (const folder of folders) {
              const files = await fs.readdir(folder);
              for (const file of files) {
                //    console.log(folder + "/" + file);
                let fileWithoutExtension = file.split(".")[0];
                let filePath = path.join(
                  __dirname,
                  "..",
                  "plugins",
                  "manifest",
                  fileWithoutExtension
                );
                const { default: Rule } = await import(filePath);
                let rule = new Rule();
                rule.run();
                // console.log(rule.issues);
                this.issues = this.issues.concat(rule.issues);
              }
            }
          })()
            .then(() => {
              console.log(this.issues);
              if (flags.output) {
                fs.writeFile(
                  flags.output,
                  JSON.stringify(this.issues, null, 2),
                  function (err: any) {
                    if (err) throw err;
                    console.log("Saved!");
                  }
                );
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      this.error(
        "AndroidManifest.xml not found. Please provide a valid path to the Android Project"
      );
    }
  }
}
