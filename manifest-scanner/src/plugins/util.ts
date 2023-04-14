import * as fs from "fs";

export enum Severity {
  INFO,
  WARNING,
  ERROR,
  VULNERABILITY,
}

export function searchKeywordInFile(
  filePath: string,
  keyword: string
): { line: number; column: number } | null {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const index = lines[i].indexOf(keyword);
    if (index !== -1) {
      return { line: i + 1, column: index + 1 };
    }
  }
  return null;
}
