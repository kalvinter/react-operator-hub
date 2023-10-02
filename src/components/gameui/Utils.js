
export const greenBg = "bg-green-600"
export const orangeBg = "bg-yellow-600"
export const redBg = "bg-red-600"

export const productionMatchedBg = greenBg
export const productionMisMatchBg = orangeBg

export function getProductionLabelBg(props){
    let deltaLabel = "";
    let deltaBg = productionMatchedBg

    if (props.overProduction){
        deltaLabel = "Overproduction"
        deltaBg = productionMisMatchBg

    } else if (props.underProduction) {
        deltaLabel = "Underproduction"
        deltaBg = productionMisMatchBg
    } else {
        deltaBg = productionMatchedBg
    }
    return {
        deltaBg: deltaBg,
        deltaLabel: deltaLabel
    }
}