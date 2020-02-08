import {
  FileDoesNotExistException,
  apply,
  url,
  mergeWith,
  noop,
  chain
} from "@angular-devkit/schematics";
import {
  Rule,
  SchematicContext,
  Tree,
  template
} from "@angular-devkit/schematics";
import { safeLoad } from "js-yaml";
import { strings } from "@angular-devkit/core";
import * as path from 'path';
import { GenerateSchema } from "../utils/generateModel/GenerateSchema";

export function generateApi(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const openapiyaml = tree.read(`templates/openapi/yaml/${_options.yamlFile}.yaml`);
    if (!openapiyaml) {
      throw new FileDoesNotExistException("./openapi.yaml");
    }
    let openapijson = safeLoad(openapiyaml.toString());
    let model = new GenerateSchema(openapijson);
    let res = model.generateMongooseSchema();
    if (res) {
      for (let i = 0; i < res["__arrayFiles"].length; i++) {
        tree.create(
          `server/db/models/${res["__arrayFiles"][i]}`,
          res["__arrayDefinition"][i]
        );
      }
    }
    let api: any = {};
    Object.keys(openapijson["paths"]).forEach(path => {
      Object.keys(openapijson["paths"][path]).forEach(route => {
        if (openapijson["paths"][path][route]["x-api-name"] in api) {
          api[openapijson["paths"][path][route]["x-api-name"]].push(
            openapijson["paths"][path][route]
          );
        } else {
          api[openapijson["paths"][path][route]["x-api-name"]] = [
            openapijson["paths"][path][route]
          ];
        }
      });
    });
    let temp: any = api;
    api = [];
    Object.keys(temp).forEach(r => {
      api.push({ name: r, routes: temp[r] });
    });
    let ruleList: [Rule] = [noop()];
    let templatespath = path.relative(__dirname,_options.path+`\\templates\\openapi\\templates\\${_options.templateName}`); 
    console.log(templatespath);
    api.forEach((element: {}) => {
      ruleList.push(
        mergeWith(
          apply(url(templatespath), [template({ ...element, ...strings })])
        )
      );
    });
    return chain(ruleList);
  };
}
