module.exports = {
    testPathForConsistencyCheck: 'some/example.test.js',

    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return (
            testPath.replace('src/', 'tests/__snapshots__/') + snapshotExtension
        );
    },
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        return snapshotFilePath
            .replace('tests/__snapshots__/', 'src/')
            .slice(0, -snapshotExtension.length);
    }
};
