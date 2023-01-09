module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@features/(.*)*': '<rootDir>/src/features/$1',
    '@shared/(.*)*': '<rootDir>/src/shared/$1',
    '@config': '<rootDir>/src/shared/config',
    '@exceptions/(.*)*': '<rootDir>/src/shared/exceptions/$1',
    '@databases/(.*)*': '<rootDir>/src/shared/databases/$1',
    '@middlewares/(.*)*': '<rootDir>/src/shared/middlewares/$1',
    '@utils/(.*)*': '<rootDir>/src/shared/utils/$1'
  }
};
