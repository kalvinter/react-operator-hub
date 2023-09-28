export const effectLevels = {
    large: 1,
    medium: 0.75,
    low: 0.5
}

export const effectDirection = {
    increase: "Increase",
    decrease: "Decrease",
}

export const noEventText = "Electricity Demand is stable."

const decreaseEvents = [
    {
        title: "High wind energy output",
        textStart: "Strong winds increase electricity generated from wind farms. Medium demand decrease expected shortly!",
        textEnd: "Winds have returned to normal. Medium demand decrease expected shortly!",
        effect: effectLevels.medium,
        direction: effectDirection.decrease,
    },
    {
        title: "High solar energy output",
        textStart: "A cloudless sky and strong sun increase electricity generated from solar energy farms. Low demand decrease expected shortly!",
        textEnd: "Solar output decreased again. Low demand decrease expected shortly!",
        effect: effectLevels.low,
        direction: effectDirection.decrease,
    },
]

const increaseEvents = [
    {
        title: "Reactor #7 is down",
        textStart: "Technical difficulties at reactor #7. Large demand surge expected shortly!",
        textEnd: "Reactor #7 will soon be back online. Large demand decrease expected shortly!",
        effect: effectLevels.large,
        direction: effectDirection.increase,
    },
    {
        title: "High demand from industry",
        textStart: "Temporary double-shifts were introduced at the industrial center. Medium demand surge expected shortly!",
        textEnd: "Temporary double-shifts at the industrial center ended. Medium demand decrease expected shortly!",
        effect: effectLevels.medium,
        direction: effectDirection.increase,
    },
    {
        title: "New LLM app launched",
        textStart: "A new LLM wrapper app was launched and everyone is hyped. Medium demand surge by our data centers expected shortly!",
        textEnd: "People realised that the new app was not so good. Medium demand decrease expected shortly!",
        effect: effectLevels.medium,
        direction: effectDirection.increase,
    },
    {
        title: "New Netflix series",
        textStart: "Everybody is about to watch the new series on Netflix. Low demand surge expected shortly!",
        textEnd: "Most people have finished wathcing the new episode. Low demand decrease decrease shortly!",
        effect: effectLevels.low,
        direction: effectDirection.increase,
    }
]



export class AvailableEventHandler {
    constructor() {
        this.increaseEvents = increaseEvents

        this.increaseEvents.forEach((element, index) => {
            element.id = `I${index}`
        })

        this.decreaseEvents = decreaseEvents

        this.decreaseEvents.forEach((element, index) => {
            element.id = `D${index}`
        })
    }

    getAvailableEvents(direction){
        return direction === effectDirection.increase ? this.increaseEvents : this.decreaseEvents
    }

    addEvent(event){
        if (event.direction === effectDirection.increase){
            increaseEvents.push(event)
        } else {
            decreaseEvents.push(event)
        }
    }
    
    removeEvent(index, direction) {
        if (direction === effectDirection.increase){
            this.increaseEvents.splice(index, 1)
        } else {
            this.decreaseEvents.splice(index, 1)
        }
        
    }
    
}