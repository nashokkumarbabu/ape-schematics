import {
  Rule,
  SchematicContext,
  Tree,
  FileDoesNotExistException,
  template,
  url,
  apply,
  branchAndMerge,
  mergeWith
} from "@angular-devkit/schematics";
import { safeLoad } from "js-yaml";
import { strings } from "@angular-devkit/core";
import * as path from "path";
import { generateMaterial } from "../utils/ui/library/react/materialUi/genUi";

export function generateUi(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const inputyaml = tree.read(`templates/ui/yaml/${_options.yamlFile}.yaml`);
    if (!inputyaml) {
      throw new FileDoesNotExistException(
        `templates/ui/yaml/${_options.yamlFile}.yaml`
      );
    }
    let inputjson = safeLoad(inputyaml.toString());
    let templatespath = path.relative(
      __dirname,
      `${_options.path}\\templates\\ui\\templates\\${_options.templateName}`
    );
    let templateSource = apply(url(templatespath), [
      template({ ...inputjson, ...strings, generateMaterial })
    ]);
    return branchAndMerge(mergeWith(templateSource));
  };
}
