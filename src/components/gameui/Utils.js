
export function getProductionLabelBg(props){
    let deltaLabel = "";
    let deltaBg = "bg-green-600"

    if (props.overProduction){
        deltaLabel = "Overproduction"
        deltaBg = "bg-yellow-600"

    } else if (props.underProduction) {
        deltaLabel = "Underproduction"
        deltaBg = "bg-yellow-600"
    } else {
        deltaBg = "bg-green-600"
    }
    return {
        deltaBg: deltaBg,
        deltaLabel: deltaLabel
    }
}