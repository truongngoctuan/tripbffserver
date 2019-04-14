https://github.com/facebook/jest/blob/master/e2e/snapshot-resolver/customSnapshotResolver.js

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace('dist', 'src').replace('__tests__', '__snapshots__') + snapshotExtension,

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace('__snapshots__', '__tests__')
      .slice(0, -snapshotExtension.length),

  testPathForConsistencyCheck: 'foo/__tests__/bar.test.js',
};