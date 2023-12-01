import { render, screen } from '@testing-library/react'

import { test, expect, afterEach, beforeEach, vi } from 'vitest'

import { createMemoryRouter } from 'react-router-dom'

import { routerConfiguration } from '../../Router'

import { RouterProvider } from 'react-router-dom'

import { links } from '../../Config'
import { errorPageTestId } from '../../pages/ErrorPage'

beforeEach(() => {
    vi.mock('../../game/Storage', async () => {
        const actual = await vi.importActual("../../game/Storage")
        return {
            ...actual,
            gameHistoryStorage: {
                load: () => {
                    console.log("Inside the mocked load method")
                    throw new Error("Mocked error")
                }
            }
        }
    })
})

afterEach(() => {
    localStorage.clear()
    vi.resetModules()
})

test('page loads without error', () => {
    let router = createMemoryRouter(routerConfiguration, { initialEntries: ["/"] })

    render(<RouterProvider router={router} />)

    // Make sure that the page renders
    expect(screen.getByText(/ERROR/)).toBeInTheDocument()
    expect(screen.getByTestId(errorPageTestId)).toBeInTheDocument()

    // Make sure that there is button that leads to github for creating an issue
    let link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', links.repositoryOnGithub)
})
