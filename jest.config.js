const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
	coverageDirectory: '<rootDir>/coverage',
	coverageProvider: 'v8',
	coverageReporters: ['html'],
	coveragePathIgnorePatterns: [
		'<rootDir>/.next/',
		'<rootDir>/__tests__/',
		'<rootDir>/node_modules/',
		'<rootDir>/src/config/',
		'<rootDir>/src/constants/',
		'<rootDir>/src/styles/',
		'<rootDir>/src/types/',
		'<rootDir>/vendors/'
	],
	// coverageThreshold: {
	// 	global: {
	// 		branches: 70,
	// 		functions: 10,
	// 		lines: 20,
	// 		statements: -10
	// 	}
	// },
	moduleNameMapper: {
		/* Convert typescript config paths to module names for testing
		https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping */
		...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

		/* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/__tests__/__mocks__/styleMock.js',

		/* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
		'^.+\\.(jpg|jpeg|png|gif|webp|avif)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
		'^.+\\.(svg)$': '<rootDir>/__tests__/__mocks__/iconMock.js'
	},
	testPathIgnorePatterns: [
		'<rootDir>/.github/',
		'<rootDir>/.next/',
		'<rootDir>/.vscode/',
		'<rootDir>/.yarn/',
		'<rootDir>/__tests__/__mocks__', // these are handled by playwright
		'<rootDir>/__tests__/e2e', // these are handled by playwright
		'<rootDir>/docs/',
		'<rootDir>/no_commit/',
		'<rootDir>/node_modules/',
		'<rootDir>/public/'
	],
	testEnvironment: 'jsdom',
	transform: {
		/* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
	},
	transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleDirectories: ['node_modules', './src'] // Needed for tsconfig paths
}
