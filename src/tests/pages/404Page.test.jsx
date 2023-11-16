
import { render, screen } from '@testing-library/react';

import { test, expect } from 'vitest';

import { MemoryRouter } from 'react-router-dom';

import NotFoundPage from "../../pages/404Page";
import { links } from '../../Config';


test('page loads without error', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    
    // Make sure that the page renders
    expect(screen.getByText(/404/)).toBeInTheDocument();
    
    // Make sure that there is button that leads back to the main page
    let link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", links.rootUrl)
});
