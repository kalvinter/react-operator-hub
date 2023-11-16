import { render, screen } from '@testing-library/react'

import { test, expect, afterEach } from 'vitest'

import { createMemoryRouter } from 'react-router-dom'

import { routerConfiguration } from '../../Router'

import { RouterProvider } from 'react-router-dom'

import { links } from '../../Config'
import { errorPageTestId } from '../../pages/ErrorPage'

import { gameHistoryManager } from '../../game/GameHistoryManager'

afterEach(() => {
    // reset loaded game history
    gameHistoryManager.reloadHistoryFromStorage()
})

test('page loads without error', () => {
    // Set gameHistory to a non-sensical value to cause an error during app rendering
    gameHistoryManager.gameHistory = false

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
