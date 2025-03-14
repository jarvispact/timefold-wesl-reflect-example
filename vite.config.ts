import { UserConfig } from "vite";
import { linkBuildPlugin } from "wesl-plugin";
import viteWesl from "wesl-plugin/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { simpleReflect } from "./simple-reflect";

const thisPath = fileURLToPath(import.meta.url);
const weslToml = path.join(path.dirname(thisPath), "wesl.toml");
const typesDir = path.join(path.dirname(thisPath), "src");

const config: UserConfig = {
  plugins: [
    viteWesl({
      weslToml,
      extensions: [linkBuildPlugin, simpleReflect({ typesDir })],
    }),
  ],
};

export default config;
