
export const productionMatchedBg = "bg-green-600"
export const productionMisMatchBg = "bg-yellow-600"

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