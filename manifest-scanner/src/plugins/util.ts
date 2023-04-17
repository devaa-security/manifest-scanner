import * as fs from "fs";
import * as path from "path";

export enum Severity {
  INFO,
  WARNING,
  ERROR,
  VULNERABILITY,
}

export function getRelativePath(
  directory: string,
  absolutePath: string
): string {
  let result = path.normalize(path.relative(directory, absolutePath));
  return result.replace(/\\/g, "/");
}

export function searchKeywordInFile(
  filePath: string,
  keyword: string
): { line: number; start_column: number; end_column: number } | null {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const index = lines[i].indexOf(keyword);
    if (index !== -1) {
      return {
        line: i + 1,
        start_column: index + 1,
        end_column: keyword.length + index + 1,
      };
    }
  }
  return null;
}
