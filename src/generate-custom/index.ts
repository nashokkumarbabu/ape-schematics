import {
  Rule,
  SchematicContext,
  Tree,
  FileDoesNotExistException,
  apply,
  branchAndMerge,
  mergeWith,
  url,
  template,
  Source,
  empty
} from "@angular-devkit/schematics";
import { safeLoad } from "js-yaml";
import { strings } from "@angular-devkit/core";
import * as path from "path";

export function generateCustom(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const inputyaml = tree.read(
      `templates/custom-templates/${_options.templateName}.yaml`
    );
    if (!inputyaml) {
      throw new FileDoesNotExistException(
        `templates/custom-templates/${_options.templateName}.yaml`
      );
    }
    let inputjson = safeLoad(inputyaml.toString());
    let templatespath = path.relative(
      __dirname,
      `${_options.path}\\templates\\custom-templates\\${_options.templateName}`
    );
    let templateSource: Source = empty();
    let m = await import(`${templatespath}.js`);
    templateSource = await apply(url(templatespath), [
      template({ ...inputjson, ...strings, ...m })
    ]);
    return branchAndMerge(mergeWith(templateSource));
  };
}
