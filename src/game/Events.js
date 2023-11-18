import i18next from "i18next"

export const effectLevels = {
    large: 1,
    medium: 0.75,
    low: 0.5,
}

export const effectDirection = {
    increase: 'Increase',
    decrease: 'Decrease',
}

export const noEventText = 'Electricity Demand is stable.'

class Event{
    constructor({titleKey, textStartKey, textEndKey, effect, direction}){
        this.titleKey = titleKey
        this.textStartKey = textStartKey
        this.textEndKey = textEndKey
        this.effect = effect
        this.direction = direction
    }

    getTitle(){
        return i18next.t(this.titleKey, {ns: "events"})
    }
    getTextStart(){
        return i18next.t(this.textStartKey, {ns: "events"})
    }
    getTextEnd(){
        return i18next.t(this.textEndKey, {ns: "events"})
    }
}

const decreaseEventsLegacy = [
    {
        title: 'Blackout Drill in Industrial Area',
        textStart: 'One of the largest factories is conducting a blackout drill for emergency preparedness. Small demand decrease expected shortly!',
        textEnd: 'The blackout drill has ended. Small demand increase expected shortly!',
        effect: effectLevels.low,
        direction: effectDirection.decrease,
    },
    {
        title: 'Major Streaming Platforms are down',
        textStart: 'Major streaming platforms are down, significantly reducing internet activity. Small demand decrease expected shortly!',
        textEnd: 'The streaming platforms are online again. Small demand increase expected shortly!',
        effect: effectLevels.low,
        direction: effectDirection.decrease,
    },
    {
        title: 'Celebrity calls for Social Media Break',
        textStart: 'A major celebrity has called on people for a social media break to improve their mental health. Small demand decrease expected shortly!',
        textEnd: 'Despite pledges, few could resist the pull of social media for long. Small demand increase expected shortly!',
        effect: effectLevels.low,
        direction: effectDirection.decrease,
    },
    {
        title: 'Major online Platforms are down',
        textStart: 'Due to a cyber attack, several large online platforms are down. People are now less online. Low demand decrease expected shortly!',
        textEnd: 'The platforms are up again. Low demand increase expected shortly!',
        effect: effectLevels.low,
        direction: effectDirection.decrease,
    },
    {
        title: 'Scheduled Maintenance at Factories',
        textStart: 'Several factory buildings are shut down due to scheduled maintenance of the machinery. Medium demand decrease expeceted shortly!',
        textEnd: 'The scheduled factory maintenance has ended. Medium demand increase expected shortly!',
        effect: effectLevels.medium,
        direction: effectDirection.decrease,
    },
    {
        title: 'High Solar Energy Output',
        textStart:
            'A cloudless sky and strong sun increase electricity generated from solar energy farms. Medium demand decrease expected shortly!',
        textEnd: 'Solar output decreased again. Medium demand increase expected shortly!',
        effect: effectLevels.medium,
        direction: effectDirection.decrease,
    },
    {
        title: 'High Wind Energy Output',
        textStart:
            'Strong winds increase electricity generated from wind farms. Medium demand decrease expected shortly!',
        textEnd: 'Winds have returned to normal. Medium demand increase expected shortly!',
        effect: effectLevels.medium,
        direction: effectDirection.decrease,
    },
    {
        title: 'Earth Hour started',
        textStart: 'People participate in Earth Hour, turning off lights and electronics. Large demand decrease expected shortly!',
        textEnd: 'Earth hour has ended. Large demand increase expected shortly!',
        effect: effectLevels.large,
        direction: effectDirection.decrease,
    },
    {
        title: 'Partial Power Grid Failure',
        textStart: 'Construction workers caused a district-wide power outage. Large demand decrease expected shortly!',
        textEnd: 'Power grid stability restored. Large demand increase expected shortly!',
        effect: effectLevels.large,
        direction: effectDirection.decrease,
    },
    {
        title: 'Climate protesters disrupting Factories',
        textStart: 'Climate protesters glued themselves to roads shutting down most adjacent factories. Large demand decrease expected shortly!',
        textEnd: 'The protesters were removed by police. Large demand increase expected shortly!',
        effect: effectLevels.large,
        direction: effectDirection.decrease,
    },
]

const increaseEventsLegacy = [
    {
        title: 'New Netflix Series',
        textStart: 'Everybody is about to watch the new series on Netflix. Low demand increase expected shortly!',
        textEnd: 'Most people have finished watching the new episode. Low demand decrease shortly!',
        effect: effectLevels.low,
        direction: effectDirection.increase,
    },
    {
        title: 'AI-Powered Fridge Leak',
        textStart: "A leak about a prototype for an AI-powered fridge goes viral on social media. Low demand surge expected!",
        textEnd: 'The leak turned out to be a fake. Low demand decrease expected shortly!',
        effect: effectLevels.low,
        direction: effectDirection.increase,
    },
    {
        title: 'Real Estate Firm Rumors',
        textStart: "Rumors about a large real estate firm struggling spur hectic online trading and social media buzz. Low demand surge expected!",
        textEnd: 'The rumors were found to be exaggerrated. Low demand decrease expected shortly!',
        effect: effectLevels.low,
        direction: effectDirection.increase,
    },
    {
        title: 'Celebrity Scandal causes Social Media Frenzy',
        textStart: 'A celebrity scandal just broke, leading a nation-wide social media frenzy. Low demand increase shorty!',
        textEnd: 'The scandal has died down. Low demand decrease shortly!',
        effect: effectLevels.low,
        direction: effectDirection.increase,
    },
    {
        title: 'Double-Shifts at Factories',
        textStart:
            'Temporary double-shifts were introduced at the industrial center. Medium demand surge expected shortly!',
        textEnd: 'Temporary double-shifts at the industrial center ended. Medium demand decrease expected shortly!',
        effect: effectLevels.medium,
        direction: effectDirection.increase,
    },
    {
        title: 'New LLM-App launched',
        textStart:
            'A new LLM wrapper app was launched and everyone is hyped. Medium demand surge by our data centers expected shortly!',
        textEnd: 'People realised that the new app was not so good. Medium demand decrease expected shortly!',
        effect: effectLevels.medium,
        direction: effectDirection.increase,
    },
    {
        title: 'Government Press Conference',
        textStart: 'A highly anticipated government press conference on inflation measures has started. Medium demand surge expected shortly!',
        textEnd: 'The press conference has concluded and social media activity is subsiding. Medium demand decrease expected shortly!',
        effect: effectLevels.medium,
        direction: effectDirection.increase,
    },
    {
        title: 'Championship Game',
        textStart: 'The national sports championship is about to begin, leading to increased TV and appliance use. Large demand surge expected shortly!',
        textEnd: 'The game has ended. Large demand decrease expected shortly!',
        effect: effectLevels.large,
        direction: effectDirection.increase,
    },
    {
        title: 'City-wide Festival lights up the Night',
        textStart: 'A large city-wide festival with extensive lighting and sound systems is underway. Large demand surge expected shortly!',
        textEnd: 'The festival has concluded for the night. Large demand decrease expected shortly!',
        effect: effectLevels.large,
        direction: effectDirection.increase
    },
    {
        title: 'Reactor #7 is down',
        textStart: 'Technical difficulties at reactor #7. Large demand surge expected shortly!',
        textEnd: 'Reactor #7 will soon be back online. Large demand decrease expected shortly!',
        effect: effectLevels.large,
        direction: effectDirection.increase,
    }
]


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
            increaseEvents.push(event)
        } else {
            decreaseEvents.push(event)
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
