module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/tests/**/*.test.(ts|js)"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "dist"
    ],
    testEnvironment: "node"
};