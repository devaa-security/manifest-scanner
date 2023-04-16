import * as fs from "fs";
import * as path from "path";
import * as xml2js from "xml2js";
let util = require("util");

export function findFileInDirectory(directory: any, fileName: any) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const result: any = findFileInDirectory(filePath, fileName);
      if (result) {
        return result;
      }
    } else if (file === fileName) {
      return filePath;
    }
  }

  return null;
}

export async function parseXmlFileToJson(filePath: string): Promise<any> {
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

export function getJavaFiles(dir: string): string[] {
  let javaFiles: string[] = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      javaFiles = javaFiles.concat(getJavaFiles(filePath));
    } else if (path.extname(file) === ".java") {
      javaFiles.push(filePath);
    }
  }
  return javaFiles;
}
