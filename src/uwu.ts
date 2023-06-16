import { execFileSync } from "child_process";

export function uwuify(s: string): string {
  let returner = "";
  let st = execFileSync("/home/katrina/tewwiblecuwse/uwuify.sh", [s]);
  returner += st.toString();
  return returner;
}
