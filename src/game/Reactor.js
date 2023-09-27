
/*
* This class calculates and holds the current state of the reactor 
*/
export class Reactor {
    constructor({baseTemperature, maximumTemperature, minimumTemperature, naturalCoolingFactor}){
        this.baseTemperature = baseTemperature
        
        this.maximumTemperature = maximumTemperature
        this.minimumTemperature = minimumTemperature
        
        this.naturalCoolingFactor = naturalCoolingFactor

        this.currentTemperature = this.baseTemperature

        this.currentFuelInputLevel = 0
        this.currentCoolingLevel = 0

        this.producedEnergy = 0
        this.currentElectricityOutput = 0
        
        this.temperatureHistory = Array(11).fill(0)
        this.electricityOutputHistory = Array(11).fill(0)
    }

    calculateTemperature(currentTemperature, currentFuelInputLevel, currentCoolingLevel){
        currentTemperature += (currentFuelInputLevel * 0.025 - currentCoolingLevel * 0.05)
    
        if (currentTemperature - this.naturalCoolingFactor > this.baseTemperature) {
            currentTemperature -= this.naturalCoolingFactor
        }

        return currentTemperature >= 0 ? currentTemperature : 0
    }

    calculateReactionLevel(currentTemperature){
        let reactionLevel = 1 + (currentTemperature / this.maximumTemperature)

        // If the temperature is below the limit - reactionLevel and thus output falls to 0
        return (currentTemperature > this.minimumTemperature) ? reactionLevel : 0
    }

    calculateElectricityOutput(currentTemperature, currentFuelInputLevel){
        let reactionLevel = this.calculateReactionLevel(currentTemperature)

        // Electricity Output
        return (currentFuelInputLevel * 1.025 + currentTemperature * 0.0125 * currentFuelInputLevel) * reactionLevel
    }

    updateElectricityOutput(currentFuelInputLevel, currentCoolingLevel){
        this.currentFuelInputLevel = currentFuelInputLevel
        this.currentCoolingLevel = currentCoolingLevel

        // Update Temperature
        this.currentTemperature = this.calculateTemperature(this.currentTemperature, this.currentFuelInputLevel, this.currentCoolingLevel)        
        this.temperatureHistory.push(this.currentTemperature)

        // Update Electricity Output
        this.currentElectricityOutput = this.calculateElectricityOutput(this.currentTemperature, this.currentFuelInputLevel)
        this.electricityOutputHistory.push(this.currentElectricityOutput)
        
        // Update produced Energy stats
        this.producedEnergy += this.currentElectricityOutput
    }
}