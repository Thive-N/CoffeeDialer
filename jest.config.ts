import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
	coverageDirectory: './coverage/',
	coveragePathIgnorePatterns: [
		'./src/main/main.ts',
		'./src/main/preload.ts',
		'./src/main/util.ts',
		'./src/main/menu.ts',
		'./src/renderer/index.tsx',
	],

	moduleDirectories: ['node_modules', 'release/app/node_modules', 'src'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/.erb/mocks/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
	},
	setupFiles: ['./.erb/scripts/check-build-exists.ts'],
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		url: 'http://localhost/',
	},
	testPathIgnorePatterns: ['release/app/dist', '.erb/dll'],
	transform: {
		'\\.(ts|tsx|js|jsx)$': 'ts-jest',
	},
};

export default config;
