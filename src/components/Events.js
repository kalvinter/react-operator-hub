export const effectLevels = {
    large: "Large",
    medium: "Medium",
    low: "Low"
}

export const noEventText = "Electricity Demand is stable."

export const events = [
    {
        textStart: "Technical difficulties at reactor #7. Large demand surge expected shortly!",
        textEnd: "Reactor #7 will soon be back online. Large demand decrease expected shortly!",
        effect: effectLevels.large,
    },
    {
        textStart: "Temporary double-shifts were introduced at the industrial center. Medium demand surge expected shortly!",
        textEnd: "Temporary double-shifts at the industrial center ended. Medium demand decrease expected shortly!",
        effect: effectLevels.medium,
    },
    {
        textStart: "Everybody is about to watch the new series on Netflix. Low demand surge expected shortly!",
        textEnd: "Most people have finished wathcing the new episode. Low demand surge decrease shortly!",
        effect: effectLevels.low,
    }
]