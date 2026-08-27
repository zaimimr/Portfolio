import { modules } from "@valbuild/next";
import { config } from "./val.config";

export default modules(config, [
  { def: () => import("./src/content/settings.val") },
  { def: () => import("./src/content/profile.val") },
  { def: () => import("./src/content/projects.val") },
  { def: () => import("./src/content/cv.val") },
  { def: () => import("./src/content/playground.val") },
  { def: () => import("./src/content/pages.val") },
  { def: () => import("./src/content/admin-links.val") },
]);
