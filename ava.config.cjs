module.exports = {
  timeout: '180s',
  files: ['**/__tests__/**/*.ava.ts', '**/__tests__/**/*.ava.ts', '**/__tests__/**/*.test.ts'],
  extensions: ['ts', 'js'],
  require: ['ts-node/register', 'tsconfig-paths/register', 'dotenv/config'],
  environmentVariables: {},
}
