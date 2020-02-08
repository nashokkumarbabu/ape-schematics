import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  move,
  mergeWith,
  branchAndMerge,
  Source,
  source,
  chain,
  FileDoesNotExistException
} from "@angular-devkit/schematics";

import {
  NodeDependency,
  addPackageJsonDependency,
  NodeDependencyType
} from "schematics-utilities";

export function addon(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    if (!tree.exists("./package.json")) {
      throw new FileDoesNotExistException(`${tree.root.path}/package.json`);
    }
    if (!tree.exists("./ape.config.json")) {
      throw new FileDoesNotExistException(`${tree.root.path}/ape.config.json`);
    }
    let templateSourceSeeding: Source = source(tree);
    let templateSourceDocs: Source = source(tree);
    let templateSourcetemplateOai = source(tree);
    if (options.addon === "seeding") {
      const sourceTextConfig = tree.read("/ape.config.json");
      if (sourceTextConfig !== null) {
        const json = JSON.parse(sourceTextConfig.toString());
        
        json.seeding = "true";
        tree.overwrite("./ape.config.json", JSON.stringify(json, null, 2));
      }
      const sourceTextPackage = tree.read("/package.json");
      if (sourceTextPackage !== null) {
        const json = JSON.parse(sourceTextPackage.toString());
        json.scripts = { ...json.scripts, seeding: "node seeding/index.js" };
        tree.overwrite("./package.json", JSON.stringify(json, null, 2));
      }
      templateSourceSeeding = apply(url("./files/seeding"), [
        move("./seeding")
      ]);
      const dependencies: NodeDependency[] = [
        { type: NodeDependencyType.Default, version: "^4.1.0", name: "faker" },
        {
          type: NodeDependencyType.Default,
          version: "^1.0.3",
          name: "mongo-seed-faker"
        },
        { type: NodeDependencyType.Default, version: "^3.5.0", name: "mongodb" }
      ];
      dependencies.forEach(dependency => {
        addPackageJsonDependency(tree, dependency);
        _context.logger.log(
          "info",
          `✅️  Added "${dependency.name}" into ${dependency.type}`
        );
      });
    }
    if (options.addon ==="documentation") {
      const sourceTextConfig = tree.read("/ape.config.json");
      if (sourceTextConfig !== null) {
        const json = JSON.parse(sourceTextConfig.toString());
        json.documentation = "true";
        tree.overwrite("./ape.config.json", JSON.stringify(json, null, 2));
      }
      const sourceTextPackage = tree.read("/package.json");
      if (sourceTextPackage !== null) {
        const json = JSON.parse(sourceTextPackage.toString());
        json.scripts = { ...json.scripts, docs: "node documentation/index.js" };
        tree.overwrite("./package.json", JSON.stringify(json, null, 2));
      }
      templateSourceDocs = apply(url("./files/documentation"), [
        move("./documentation")
      ]);
    }
    if (options.addon ==="templates") {
      templateSourceDocs = apply(url("./files/templates"), [
        move("./templates")
      ]);     
    }
    
    if (options.nodeModules) _context.addTask(new NodePackageInstallTask());
    return chain([
      branchAndMerge(mergeWith(templateSourceSeeding)),
      branchAndMerge(mergeWith(templateSourceDocs)),
      branchAndMerge(mergeWith(templateSourcetemplateOai))
    ]);
  };
}
