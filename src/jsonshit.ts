import { readJsonSync } from "fs-extra";
import { getAbsFile } from "./files";
import { uwuify } from "./uwu";

export type csObjectOutput = {
  id: string;
  startdescription?: string;
  description?: string;
  descriptionunlocked?: string;
  label: string;
};
export type csDataType =
  | "recipes"
  | "elements"
  | "endings"
  | ""
  | "legacies"
  | "verbs"
  | "achievements"
  | "portals";
export function csJsonUwuify(input: string): {
  type: csDataType;
  objs: csObjectOutput[];
} {
  let raw = readJsonSync(getAbsFile(input));
  let recipes = raw["recipes"];
  let elements = raw["elements"];
  let legacies = raw["legacies"];
  let endings = raw["endings"];
  let verbs = raw["verbs"];
  let portals = raw["portals"];
  let achievements = raw["achievements"];
  let returner: { type: csDataType; objs: csObjectOutput[] } = {
    type: "",
    objs: [],
  };
  for (let list of [
    recipes,
    elements,
    legacies,
    endings,
    verbs,
    portals,
    achievements,
  ]) {
    if (list == null || list == undefined) {
      continue;
    }
    returner.type = input.split("/")[0] as csDataType;
    for (let element of list) {
      let thisone: csObjectOutput = {
        id: "",
        label: "",
      };
      if (element["id"] == null) {
        continue;
      }
      thisone.id = element["id"];
      if (element["startdescription"] != null) {
        thisone.startdescription = uwuify(
          element["startdescription"]
        ).trimEnd();
      }

      if (element["descriptionunlocked"] != null) {
        thisone.descriptionunlocked = uwuify(
          element["descriptionunlocked"]
        ).trimEnd();
      }

      if (element["description"] != null) {
        thisone.description = uwuify(element["description"]).trimEnd();
      }

      if (element["label"] != null) {
        thisone.label = uwuify(element["label"]).trimEnd();
      }
      returner.objs.push(thisone);
    }
  }
  return returner;
}
