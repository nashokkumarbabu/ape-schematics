import { Rule, SchematicContext, Tree, FileDoesNotExistException } from "@angular-devkit/schematics";


export function init(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if(!tree.exists('./package.json')){
      _context.logger.log("error",`Not in correct project DIR( package.json not found )  or \n create a new project with Ape cli tools`);
      throw new FileDoesNotExistException(`${tree.root.path}/package.json`);
    }
    if(tree.exists('./ape.config.json')){
      _context.logger.log("error","Ape configuration is already present");
    }
    tree.create("ape.config.json", JSON.stringify(options, null, 2));
    return tree;
  };
}
