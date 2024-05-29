module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    testMatch: [
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ],
    transform: {
        '^.+\\.[tj]s?$': 'ts-jest'
    },
    testEnvironment: 'node'
};
