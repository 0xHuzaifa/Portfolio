// Type declarations for static imports used in the project
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";
declare module "*.avif";
declare module "*.svg" {
  const src: string;
  export default src;
}

// allow importing JSON modules without errors
declare module "*.json";
