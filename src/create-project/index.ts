import {
  apply,
  url,
  Source,
  source,
  branchAndMerge,
  mergeWith
} from "@angular-devkit/schematics";
import {
  Rule,
  SchematicContext,
  Tree,
  template
} from "@angular-devkit/schematics";

import { strings } from "@angular-devkit/core";
import {
  NodePackageInstallTask,
  RepositoryInitializerTask
} from "@angular-devkit/schematics/tasks";

export function createProject(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    let templateSource: Source = source(tree);
    if (_options.type === "mern") {
      templateSource = apply(url("./files/mern"), [
        template({ ..._options, ...strings })
      ]);
    }
    if (_options.type === "mean") {
      templateSource = apply(url("./files/mean"), [
        template({ ..._options, ...strings })
      ]);
    }
    tree.create(
      `${_options.projectName}/ape.config.json`,
      JSON.stringify(_options, null, 2)
    );
    if(_options.nodeModuleInstall){
    _context.addTask(
      new NodePackageInstallTask({
        packageManager: `${_options.packageManager}`,
        workingDirectory: `./${_options.projectName}`
      })
    );
    }
    _context.addTask(
      new RepositoryInitializerTask(`./${_options.projectName}`, {
        message: "inital commit by ape"
      })
    );

    return branchAndMerge(mergeWith(templateSource));
  };
}
