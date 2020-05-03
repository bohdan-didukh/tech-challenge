module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "__tests__(.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$",
  testPathIgnorePatterns: ["lib/", "node_modules/", "__tests__/config.ts"],
  testEnvironment: "node"
};
