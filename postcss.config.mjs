// Avoid requiring the Tailwind postcss plugin during test runs (vitest) because
// some downstream native bindings (lightningcss) may attempt to load platform
// specific binaries which can fail in the test environment.
const isTest = !!(process.env.VITEST || process.env.NODE_ENV === "test");

const config = {
  plugins: isTest ? [] : ["@tailwindcss/postcss"],
};

export default config;
