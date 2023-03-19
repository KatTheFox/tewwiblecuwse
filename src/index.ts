import { writeFileSync } from "fs-extra";
import { files, getOutFilePath } from "./files";
import { csDataType, csJsonUwuify, csObjectOutput } from "./jsonshit";
for (let file of files) {
  console.log(file);
  writeFileSync(getOutFilePath(file), jsonIfy(csJsonUwuify(file)));
}
function jsonIfy(c: { type: csDataType; objs: csObjectOutput[] }) {
  return '{"' + c.type + '":' + JSON.stringify(c.objs) + "}";
}
