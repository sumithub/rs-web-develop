import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // 👇 This tells Jest to use the __mocks__/axios.ts file when `axios` is imported
  moduleNameMapper: {
    "^axios$": "<rootDir>/src/__mocks__/axios.ts",
  },
};

export default createJestConfig(config);