module.exports = {
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test-reports/coverage',
  coverageReporters: ['lcov', 'text-summary', 'json-summary'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'mjs'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Unit tests',
        outputDirectory: './test-reports',
        outputName: 'unit-tests.xml'
      }
    ]
  ],
  rootDir: './',
  transform: {
    '^.+\\.m?(ts|js)$': [
      'esbuild-jest',
      {
        sourcemap: true
      }
    ]
  },
  collectCoverageFrom: ['src/**/*.(ts|js|mjs)'],
  testMatch: ['<rootDir>/tests/**/*.test.+(ts|js)']
};
