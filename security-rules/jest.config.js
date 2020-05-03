module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "__tests__(.*|(\\.|/)(test|spec|d))\\.(ts?|tsx?)$",
  testPathIgnorePatterns: ["lib/", "node_modules/", "__tests__/config.ts"],
  testEnvironment: "node",
  moduleFileExtensions:['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'd.ts'],
};
