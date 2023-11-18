import { afterEach, beforeAll } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'

beforeAll(() => {
    // Mocking canvas for chart js requires a ResizeObserver class
    // This is probably the worst way to solve this issue but right now
    // I could not come up with a better solution
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
        observe() {
          // do nothing
        }
        unobserve() {
          // do nothing
        }
        disconnect() {
          // do nothing
        }
    };    
})

afterEach(() => {
    cleanup()
})
