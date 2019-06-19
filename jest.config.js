module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    coverageReporters: ['text-summary', 'json'],
};
