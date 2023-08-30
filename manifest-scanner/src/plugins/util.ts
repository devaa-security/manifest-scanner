import * as fs from 'node:fs'
import * as path from 'node:path'

export enum Severity {
  INFO,
  WARNING,
  ERROR,
  VULNERABILITY,
}

export function getRelativePath(
  directory: string,
  absolutePath: string,
): string {
  const result = path.normalize(path.relative(directory, absolutePath))
  return result.replace(/\\/g, '/')
}

export function searchKeywordInFile(
  filePath: string,
  keyword: string,
): { line: number; start_column: number; end_column: number } | null {
  const data = fs.readFileSync(filePath, 'utf-8')
  const lines = data.split('\n')
  for (const [i, line] of lines.entries()) {
    const index = line.indexOf(keyword)
    if (index !== -1) {
      return {
        line: i + 1,
        start_column: index + 1,
        end_column: keyword.length + index + 1,
      }
    }
  }

  return null
}

export function getJavaKotlinFiles(dir: string): string[] {
  const files: string[] = []

  const readDir = (dir: string) => {
    const entries = fs.readdirSync(dir, {withFileTypes: true})

    for (const entry of entries) {
      if (entry.isDirectory()) {
        readDir(path.join(dir, entry.name))
      } else {
        const ext = path.extname(entry.name)
        if (ext === '.java' || ext === '.kt') {
          files.push(path.join(dir, entry.name))
        }
      }
    }
  }

  readDir(dir)

  return files
}
