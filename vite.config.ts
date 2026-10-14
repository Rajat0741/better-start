import netlify from "@netlify/vite-plugin-tanstack-start";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

const config = defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	fmt: {
		useTabs: true,
		sortImports: true,
		sortTailwindcss: true,
		ignorePatterns: ["**/src/routeTree.gen.ts", "**/src/styles.css", "dist", "pnpm-lock.yaml"],
	},
	lint: {
		plugins: ["typescript", "unicorn", "oxc"],
		categories: { correctness: "error" },
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		env: { builtin: true },
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		options: { typeAware: true, typeCheck: true },
	},
	resolve: { tsconfigPaths: true },
	plugins: lazyPlugins(() => [
		devtools(),
		tailwindcss(),
		tanstackStart(),
		netlify(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	]),
});

export default config;
