import { render, screen, fireEvent } from '@testing-library/react'

import { afterEach, test, describe, expect } from 'vitest'

import Game from '../../pages/Game'

import { pauseButtonTestId } from '../../components/gameui/TopBar'

import { MemoryRouter } from 'react-router-dom'

import { gameTestId } from '../../pages/Game'
import { quitButtonTestId } from '../../components/gameui/TopBar'
import { eventsBarTestId } from '../../components/gameui/EventsBar'
import { inputBarTestId } from '../../components/gameui/InputBar'
import { outputChartTestId } from '../../components/gameui/OutputChart'
import { shiftProgessBarTestId } from '../../components/gameui/ShiftProgressBar'
import { temperatureChartTestId } from '../../components/gameui/TemperatureChart'
import { defaultReactorConfig } from '../../game/AvailableReactors'


afterEach(() => {
    localStorage.clear()
})

test('page loads with no GameHistory', () => {
    render(
        <MemoryRouter>
            <Game 
                activeReactorConfig={defaultReactorConfig}
            />
        </MemoryRouter>
    )
    
    expect(screen.getByTestId(gameTestId)).toBeInTheDocument()
    expect(screen.getByTestId(quitButtonTestId)).toBeInTheDocument()
    expect(screen.getByTestId(pauseButtonTestId)).toBeInTheDocument()
    
    // Eventsbar is added multiple times so that it changes place in mobile vs desktop version
    screen.getAllByTestId(eventsBarTestId).map((element) => expect(element).toBeInTheDocument())


    expect(screen.getByTestId(shiftProgessBarTestId)).toBeInTheDocument()    
    
    expect(screen.getByTestId(outputChartTestId)).toBeInTheDocument()
    expect(screen.getByTestId(temperatureChartTestId)).toBeInTheDocument()

    expect(screen.getByTestId(inputBarTestId)).toBeInTheDocument()

})
