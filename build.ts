const { build } = require("esbuild");

build({
  entryPoints: ["src/index.tsx"],
  bundle: true,
  outdir: "dist",
  sourcemap: true,
  minify: true,
  format: "esm",
  target: ["esnext"],
  external: ["react", "react-dom"],
}).catch(() => process.exit(1));
