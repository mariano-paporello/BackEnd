import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleDirectories: ['<rootDir>/src', 'node_modules']
  // moduleNameMapper: {
  //   "^@root/(.)$": ["/$1"],
  //   "^@configs/(.*)$": ["src/configs/$1"],
  //   "^@components/(.*)$": ["src/components/$1"],
  //   "^@entities/(.*)$": ["src/entities/$1"],
  //   "^@services/(.*)$": ["src/services/$1"],
  //   "^@models/(.*)$": ["src/models/$1"],
  //   "^@libs/(.*)$": ["src/libs/$1"],
  //   "^@icons/(.*)$": ["src/icons/$1"],
  //   "^@styles/(.*)$": ["styles/$1"],
  // }
};

export default config;