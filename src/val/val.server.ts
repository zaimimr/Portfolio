import "server-only";
import { initValServer } from "@valbuild/next/server";
import { draftMode } from "next/headers";
import prettier from "prettier";
import { config } from "../../val.config";
import valModules from "../../val.modules";

const { valNextAppRouter } = initValServer(
  valModules,
  { ...config },
  {
    draftMode,
    formatter: async (code, filePath) => {
      const prettierConfig = await prettier.resolveConfig(filePath);
      return prettier.format(code, { ...prettierConfig, filepath: filePath });
    },
  },
);

export { valNextAppRouter };
