import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.mts";

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			//environment: "happy-dom",
			coverage: {
				include: ["../**/*.{test,spec}.?(c|m)[jt]s?(x)"],
				reportsDirectory: "./tests/coverage",
			},
		},
	})
);
