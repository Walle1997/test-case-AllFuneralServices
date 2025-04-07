import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: {
        '\\.tsx?$': 'babel-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    snapshotResolver: '<rootDir>/tests/snapshotResolver.js',
    testRegex: '(.+)\\.test\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/fileMock.js'
    }
};
export default config;
