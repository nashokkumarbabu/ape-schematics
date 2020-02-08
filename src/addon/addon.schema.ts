export interface AddonSchema{
    addon?:"seeding"| "documentation"| "templates";
    seeding?:boolean;
    documentation?:boolean;
    templates?:boolean;
    nodeModules?:boolean;
}