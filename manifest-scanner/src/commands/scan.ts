import { Args, Command, Flags } from "@oclif/core";
const fs = require("fs");
const path = require("path");
import * as xml2js from "xml2js";
const util = require("util");

export default class Scan extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

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

    const filePath = this.findFileInDirectory(
      flags.file,
      "AndroidManifest.xml"
    );

    if (filePath) {
      console.log(`Found file at: ${filePath}`);
      this.parseXmlFileToJson(filePath)
        .then((result: any) => {
          console.log(JSON.stringify(result, null, 2));
          console.log(result.manifest.application);
        })
        .catch((error: any) => {});
    } else {
      this.error(
        "AndroidManifest.xml not found. Please provide a valid path to the Android Project"
      );
    }
  }

  public findFileInDirectory(directory: any, fileName: any) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const result: any = this.findFileInDirectory(filePath, fileName);
        if (result) {
          return result;
        }
      } else if (file === fileName) {
        return filePath;
      }
    }

    return null;
  }

  public async parseXmlFileToJson(filePath: string): Promise<any> {
    try {
      const xmlStr = fs.readFileSync(filePath, "utf8");
      const parser = new xml2js.Parser();
      const parseString = util.promisify(parser.parseString);
      const result = await parseString(xmlStr);
      return result;
    } catch (error) {
      console.error(`Error parsing XML file ${filePath}:`, error);
      return null;
    }
  }
}
