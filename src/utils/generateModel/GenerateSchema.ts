import { capitalizeInalterate } from "../functions";

const mongooseFieldPattern: { [k: string]: any } = {
  type: String,
  index: false,
  unique: false,
  sparse: null,
  required: false,
  default: null,
  lowercase: null,
  uppercase: null,
  match: null,
  minlength: null,
  maxlength: null,
  min: null,
  max: null,
  trim: null,
  validate: null,
  get: null,
  set: null,
  // select: 1,
  enum: null
};
export class GenerateSchema {
  private _yamlParsed: any;

  constructor(openapi: any) {
    this._yamlParsed = openapi;
  }

  generateMongooseSchema() {
    let __arraySchemas: string[] = [];
    let __arrayFiles: string[] = [];
    let __arrayDefinition: string[] = [];
    const schemas = this._yamlParsed.components.schemas;
    if(!schemas) return;
    
    try {
      Object.keys(schemas).forEach(k => {
        let __definition: string = "";
        const nomeSchema = capitalizeInalterate(k);
        __arraySchemas.push(nomeSchema);
        const fileName = nomeSchema + ".model.js";
        __arrayFiles.push(fileName);
        __definition += this.generateMongooseSchemaDefinition(schemas[k], k);
        __definition = `
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 ${__definition}  

const ${nomeSchema}Model = mongoose.model('${nomeSchema}', ${nomeSchema}MongooseSchema);
module.exports =${nomeSchema}Model;
`;
        __arrayDefinition.push(__definition);
      });
    } catch (e) {
      console.log(e);
      return;
    }
    return { __arraySchemas, __arrayFiles, __arrayDefinition };
  }

  generateMongooseSchemaDefinition(
    field: any,
    name: string,
    prefix: string = "",
    nivel = 0
  ) {
    let __preSchemaDefinition: string = "";
    let __schemaDefinition: string = "";
    let __postSchemaDefinition: string = "";
    if (field.type.toLowerCase() === "object") {
      __schemaDefinition =
        "const " +
        capitalizeInalterate(prefix) +
        (prefix === "" ? "" : "_") +
        capitalizeInalterate(name) +
        "MongooseSchema = new mongoose.Schema({\n";
      let prop = field.properties;
      Object.keys(prop).forEach(k => {
        let __schemaDefinitionObj: { [k: string]: any } = {};
        __schemaDefinitionObj[k] = Object.assign({}, mongooseFieldPattern);

       
        const __tipoOriginal = prop[k].hasOwnProperty("type")
          ? prop[k].type.toLowerCase()
          : "";
        __schemaDefinitionObj[k].type = this.getType(prop[k], k);
        if (__schemaDefinitionObj[k].type == "object") {
          __postSchemaDefinition += this.generateMongooseSchemaDefinition(
            prop[k],
            k,
            name,
            nivel + 1
          );
          __schemaDefinitionObj[k] =
            capitalizeInalterate(name) +
            "_" +
            capitalizeInalterate(k) +
            "MongooseSchema,";
        } else {
          if (__schemaDefinitionObj[k].type === "String")
            __schemaDefinitionObj[k].trim = true;
        }

        if (prop[k].hasOwnProperty("default"))
          __schemaDefinitionObj[k].default = prop[k].default;
        if (prop[k].hasOwnProperty("pattern"))
          __schemaDefinitionObj[k].match = prop[k].pattern;
        if (prop[k].hasOwnProperty("enum"))
          __schemaDefinitionObj[k].enum = prop[k].enum;

      
        if (prop[k].hasOwnProperty("x-mongose")) {
          const __modifiersMongoose = prop[k]["x-mongose"];
          Object.keys(__modifiersMongoose).forEach(m => {
            __schemaDefinitionObj[k][m] = __modifiersMongoose[m];
          });
        }

       
        Object.keys(__schemaDefinitionObj[k]).forEach(j => {
          if (__schemaDefinitionObj[k][j] === null) {
            delete __schemaDefinitionObj[k][j];
          }
        });


        if (prop[k].hasOwnProperty("$ref")) {
          const __modName = prop[k]["$ref"].replace(/^(.*)\//gim, "");
          __schemaDefinition += `    "${k}" :  ${__modName}MongooseSchema,`;
          __preSchemaDefinition += `const  ${__modName}MongooseSchema  =require('./${__modName}.model.js');`;
        } else {
          if (__tipoOriginal == "array") {
            __schemaDefinition +=
              "    " +
              JSON.stringify(__schemaDefinitionObj)
                .replace(/[:]/i, ": [")
                .replace(/^\{/i, "")
                .replace(/\}$/i, "") +
              " ],\n";
          } else {
            __schemaDefinition +=
              "    " +
              JSON.stringify(__schemaDefinitionObj)
                .replace(/^\{/i, "")
                .replace(/\}$/i, "") +
              ",\n";
          }
        }
      });

   
      __schemaDefinition +=
        "\n}, " + (nivel === 0 ? "{_id: true}" : "{_id: false}") + " );";
      __schemaDefinition =
        __preSchemaDefinition +
        "\n\n" +
        __postSchemaDefinition +
        "\n\n" +
        __schemaDefinition;
      __schemaDefinition = __schemaDefinition.replace(
        /["][:]["](.*?)[,]["][,]$/gim,
        '": $1,'
      );
      __schemaDefinition = __schemaDefinition.replace(
        /["]type["][:]["](.*?)["]/gim,
        '"type":$1'
      );

      
      while (/[^;]\n\n/gim.test(__schemaDefinition))
        __schemaDefinition = __schemaDefinition.replace(/[^;]\n\n/gim, "\n");

      return __schemaDefinition;
    }
  }

   getType(field: any, name: string): string  {
    if (field.type) {
      if (name === "id" || name === "_id") {
        return "Schema.Types.ObjectId";
      } else {
        switch (field.type.toLowerCase()) {
          case "number":
          case "integer":
            return "Number";
          case "boolean":
            return "Boolean";
          case "string":
            if (field.format) {
              switch (field.type.toLowerCase()) {
                case "date":
                case "date-time":
                  return "Date";
                default:
                  return "String";
              }
            }
            return "String";
          case "array":
            return this.getType(field.items, name);
          case "object":
            return "object";
        }
      }
    }
    return '';
  }
}
