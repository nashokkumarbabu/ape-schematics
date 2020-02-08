export interface InitOptions {
  projectName: string;
  type: "mern" | "mean";
  packageManager: "npm" | "yarn";
  modelDir?: string;
  appDir?: string;
  seeding?: boolean | string;
  documentation?: boolean | string;
}
