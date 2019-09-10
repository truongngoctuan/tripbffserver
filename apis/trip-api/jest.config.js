module.exports = {
  globalSetup: '../tests/setup.js',
  globalTeardown: '../tests/teardown.js',
  testEnvironment: '../tests/mongo-environment.js',
  rootDir: 'dist/',
  snapshotResolver: "../customSnapshotResolver.js",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"]
};