import i18n from '../i18n.js'

export const effectLevels = {
    large: 1,
    medium: 0.75,
    low: 0.5,
}

export const effectDirection = {
    increase: 'Increase',
    decrease: 'Decrease',
}

class Event{
    constructor({titleKey, textStartKey, textEndKey, effect, direction}){
        this.titleKey = titleKey
        this.textStartKey = textStartKey
        this.textEndKey = textEndKey
        this.effect = effect
        this.direction = direction
    }

    getTitle(){
        return i18n.t(this.titleKey, {ns: "events"})
    }
    getTextStart(){
        return i18n.t(this.textStartKey, {ns: "events"})
    }
    getTextEnd(){
        return i18n.t(this.textEndKey, {ns: "events"})
    }
}

const getDecreaseEvents = () => {
    let decreaseEvents = [
        new Event({
            titleKey: 'Decrease-Blackout-Drill',
            textStartKey: 'Decrease-Blackout-Drill-textStart',
            textEndKey: 'Decrease-Blackout-Drill-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-Streaming-Platforms-Down',
            textStartKey: 'Decrease-Streaming-Platforms-Down-textStart',
            textEndKey: 'Decrease-Streaming-Platforms-Down-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-Social-Media-Break',
            textStartKey: 'Decrease-Social-Media-Break-textStart',
            textEndKey: 'Decrease-Social-Media-Break-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-Online-Platforms-Down',
            textStartKey: 'Decrease-Online-Platforms-Down-textStart',
            textEndKey: 'Decrease-Online-Platforms-Down-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-Factory-Maintenance',
            textStartKey: 'Decrease-Factory-Maintenance-textStart',
            textEndKey: 'Decrease-Factory-Maintenance-textEnd',
            effect: effectLevels.medium,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-High-Solar-Output',
            textStartKey: 'Decrease-High-Solar-Output-textStart',
            textEndKey: 'Decrease-High-Solar-Output-textEnd',
            effect: effectLevels.medium,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-High-Wind-Output',
            textStartKey: 'Decrease-High-Wind-Output-textStart',
            textEndKey: 'Decrease-High-Wind-Output-textEnd',
            effect: effectLevels.medium,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-Earth-Hour',
            textStartKey: 'Decrease-Earth-Hour-textStart',
            textEndKey: 'Decrease-Earth-Hour-textEnd',
            effect: effectLevels.large,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-Power-Grid-Failure',
            textStartKey: 'Decrease-Power-Grid-Failure-textStart',
            textEndKey: 'Decrease-Power-Grid-Failure-textEnd',
            effect: effectLevels.large,
            direction: effectDirection.decrease,
        }),
        new Event({
            titleKey: 'Decrease-Climate-Protest',
            textStartKey: 'Decrease-Climate-Protest-textStart',
            textEndKey: 'Decrease-Climate-Protest-textEnd',
            effect: effectLevels.large,
            direction: effectDirection.decrease,
        }),
    ]
    
    decreaseEvents.forEach((element, index) => {
        element.id = `D-${index}`
    })

    return decreaseEvents
}

const getIncreaseEvents = () => {
    let increaseEvents = [
        new Event({
            titleKey: 'Increase-New-Netflix-Series',
            textStartKey: 'Increase-New-Netflix-Series-textStart',
            textEndKey: 'Increase-New-Netflix-Series-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-AI-Fridge-Leak',
            textStartKey: 'Increase-AI-Fridge-Leak-textStart',
            textEndKey: 'Increase-AI-Fridge-Leak-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-Real-Estate-Rumors',
            textStartKey: 'Increase-Real-Estate-Rumors-textStart',
            textEndKey: 'Increase-Real-Estate-Rumors-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-Celebrity-Scandal',
            textStartKey: 'Increase-Celebrity-Scandal-textStart',
            textEndKey: 'Increase-Celebrity-Scandal-textEnd',
            effect: effectLevels.low,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-Double-Shifts-Factory',
            textStartKey: 'Increase-Double-Shifts-Factory-textStart',
            textEndKey: 'Increase-Double-Shifts-Factory-textEnd',
            effect: effectLevels.medium,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-LLM-App-Launch',
            textStartKey: 'Increase-LLM-App-Launch-textStart',
            textEndKey: 'Increase-LLM-App-Launch-textEnd',
            effect: effectLevels.medium,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-Government-Press-Conference',
            textStartKey: 'Increase-Government-Press-Conference-textStart',
            textEndKey: 'Increase-Government-Press-Conference-textEnd',
            effect: effectLevels.medium,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-Championship-Game',
            textStartKey: 'Increase-Championship-Game-textStart',
            textEndKey: 'Increase-Championship-Game-textEnd',
            effect: effectLevels.large,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-Citywide-Festival',
            textStartKey: 'Increase-Citywide-Festival-textStart',
            textEndKey: 'Increase-Citywide-Festival-textEnd',
            effect: effectLevels.large,
            direction: effectDirection.increase,
        }),
        new Event({
            titleKey: 'Increase-Reactor-7-Down',
            textStartKey: 'Increase-Reactor-7-Down-textStart',
            textEndKey: 'Increase-Reactor-7-Down-textEnd',
            effect: effectLevels.large,
            direction: effectDirection.increase,
        })
    ];

    increaseEvents.forEach((element, index) => {
        element.id = `I-${index}`
    })

    return increaseEvents
}

export class AvailableEventHandler {
    constructor() {
        this.increaseEvents = getIncreaseEvents()
        this.decreaseEvents = getDecreaseEvents()
    }

    getAvailableEvents(direction) {
        return direction === effectDirection.increase ? this.increaseEvents : this.decreaseEvents
    }

    addEvent(event) {
        if (event.direction === effectDirection.increase) {
            this.increaseEvents.push(event)
        } else {
            this.decreaseEvents.push(event)
        }
    }

    removeEvent(index, direction) {
        if (direction === effectDirection.increase) {
            this.increaseEvents.splice(index, 1)
        } else {
            this.decreaseEvents.splice(index, 1)
        }
    }
}
