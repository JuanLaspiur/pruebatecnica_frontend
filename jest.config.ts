import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', 
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1', 
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1', 
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@some-esm-package)/)', 
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
