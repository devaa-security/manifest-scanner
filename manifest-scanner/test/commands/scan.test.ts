import { expect, test } from "@oclif/test";

describe("scan", () => {
  test
    .stdout()
    .command(["help", "scan"])
    .it("runs scan help command", (ctx) => {
      expect(ctx.stdout).to.contain(
        "DEVAA Manifest Scanner helps to scan for vulnerable configurations in Android Studio Project"
      );
    });

  test
    .stdout()
    .command([
      "scan",
      "--file",
      "C:\\Users\\Shiva\\AndroidStudioProjects\\DEVAAVulnerableApp",
      "--report",
      "json",
    ])
    .it("runs scan with file and report parameter", (ctx) => {
      console.log(ctx.stdout.indexOf("Running"));
      expect(ctx.stdout).to.contain("Running");
    });
});
