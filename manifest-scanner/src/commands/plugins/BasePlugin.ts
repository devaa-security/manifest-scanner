import { Severity } from "./util";

export default abstract class BasePlugin {
  issues: any[];
  category: string;
  severity: Severity;
  description: string;

  // add constructor accepting category, severity and description
  constructor(category: string, severity: Severity, description: string) {
    // console.log("BasePlugin constructor")
    this.category = category;
    this.severity = severity;
    this.description = description;

    this.issues = [];
  }

  abstract run(): void;
}

// export both the BaseRule class and the Severity enum
export { BasePlugin };
