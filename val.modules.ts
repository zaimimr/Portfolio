import { modules } from "@valbuild/next";
import { config } from "./val.config";

export default modules(config, [
  { def: () => import("./src/content/settings.val") },
]);
