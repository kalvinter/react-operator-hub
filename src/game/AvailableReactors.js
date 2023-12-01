import i18n from "../i18n"
import { themeChangingEffectClass } from "./Config"

import { reactorConfigStorage } from "./Storage"


class ReactorConfig {
    constructor({
        key, labelKey, descriptionKey,
        productionDemandDeltaLimit, maximumPossibleDemand, baseDemandAddition, demandChangeStepSize, spaceBetweenEvents,
        minimumTemperature, baseTemperature, maximumTemperature, naturalCoolingFactor, 
    }){
        this.key = key
        this._labelKey = labelKey
        this._descriptionKey = descriptionKey

        this.productionDemandDeltaLimit = productionDemandDeltaLimit

        this.naturalCoolingFactor = naturalCoolingFactor
        this.minimumTemperature = minimumTemperature
        this.baseTemperature = baseTemperature
        this.maximumTemperature = maximumTemperature
    
        this.maximumPossibleDemand = maximumPossibleDemand
        this.baseDemandAddition = baseDemandAddition
    
        this.demandChangeStepSize = demandChangeStepSize

        this.spaceBetweenEvents = spaceBetweenEvents  // higher number increases time between events
    }

    getLabel(){
        return i18n.t(this._labelKey, {ns: "reactorConfigs"})
    }

    getDescription(){
        return i18n.t(this._descriptionKey, {ns: "reactorConfigs"})
    }
}

export const defaultReactorConfig = new ReactorConfig({
    key: "AuxiliaryReactor-Omega-17",
    labelKey: "AuxiliaryReactor-Omega-17-Label",
    descriptionKey: "AuxiliaryReactor-Omega-17-Description",

    productionDemandDeltaLimit: 80,

    naturalCoolingFactor: 0.2,
    minimumTemperature: 50,
    baseTemperature: 30,
    maximumTemperature: 400,

    maximumPossibleDemand: 800,
    baseDemandAddition: 100,

    demandChangeStepSize: 2,

    spaceBetweenEvents: 300
})

const availableReactorConfigs = [
    defaultReactorConfig,
    new ReactorConfig({
        key: "SupportReactor-Gamma-5",
        labelKey: "SupportReactor-Gamma-5-Label",
        descriptionKey: "SupportReactor-Gamma-5-Description",
    
        productionDemandDeltaLimit: 65,
    
        naturalCoolingFactor: 0.2,
        minimumTemperature: 70,
        baseTemperature: 30,
        maximumTemperature: 350,
    
        maximumPossibleDemand: 800,
        baseDemandAddition: 150,
    
        demandChangeStepSize: 3,

        spaceBetweenEvents: 250
    }),
    new ReactorConfig({
        key: "CoreReactor-Alpha-2",
        labelKey: "CoreReactor-Alpha-2-Label",
        descriptionKey: "CoreReactor-Alpha-2-Description",
    
        productionDemandDeltaLimit: 50,
    
        naturalCoolingFactor: 0.1,
        minimumTemperature: 90,
        baseTemperature: 30,
        maximumTemperature: 300,
    
        maximumPossibleDemand: 800,
        baseDemandAddition: 200,
    
        demandChangeStepSize: 3,

        spaceBetweenEvents: 200
    })
]

export let availableReactorConfigsByKey = {}

availableReactorConfigs.map(reactorConfig => {
    availableReactorConfigsByKey[reactorConfig.key] = reactorConfig
})

export class ReactorConfigManager {
    constructor() {
        this.reactorConfigStorage = reactorConfigStorage
        this.availableReactorConfigs = availableReactorConfigs.slice()

        let activeReactorConfigKey = this.reactorConfigStorage.load().reactorConfigKey

        if (!Object.keys(availableReactorConfigsByKey).includes(activeReactorConfigKey)){
            console.warn("WARNING: received an invalid reactor-config key from storage. Using default reactor config instead.")
            activeReactorConfigKey = defaultReactorConfig.key
        }

        this.activeReactorConfig = availableReactorConfigsByKey[activeReactorConfigKey]
    }

    setThemeChangeEffect() {
        let node = document.querySelector('body')
        node.classList.add(themeChangingEffectClass)
    }

    removeThemeChangeEffect() {
        let node = document.querySelector('body')
        node.classList.remove(themeChangingEffectClass)
    }

    setActiveReactorConfig({ reactorConfigKey }) {
        let reactorConfigData = this.reactorConfigStorage.load()
        reactorConfigData["reactorConfigKey"] = reactorConfigKey

        this.reactorConfigStorage.save({ data: reactorConfigData})
        this.activeReactorConfig = availableReactorConfigsByKey[reactorConfigKey]
        
        this.removeThemeChangeEffect()
    }

    getActiveReactorConfig() {
        return this.activeReactorConfig
    }
}
