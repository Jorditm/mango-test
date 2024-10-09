import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config = {
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
} satisfies Config
export default createJestConfig(config)