export const GameConfig = {
    productionDemandDeltaLimit: 80,

    naturalCoolingFactor: 0.1,
    minimumTemperature: 90,
    baseTemperature: 30,
    maximumTemperature: 300,

    maximumPossibleDemand: 800,
    baseDemandAddition: 200,

    demandChangeStepSize: 3,

    // 50 * 20 = 1 second * 60 * X = X Minutes
    shiftDuration: 50 * 20 * 60 * 2,
    // shiftDuration: 50 * 20 * 5  // for testing
}

export const GameEndTypes = {
    shiftWasFinished: 'Finished',
    lost: 'Lost',
    aborted: 'Aborted',
}

export const themeChangingEffectClass = 'theme-is-changing'
