export const productionMatchedBg = 'bg-success'
export const productionMisMatchBg = 'bg-warning'

export function getProductionLabelBg(props) {
    let deltaLabel = ''
    let deltaBg = productionMatchedBg

    if (props.overProduction) {
        deltaLabel = 'Overproduction'
        deltaBg = productionMisMatchBg
    } else if (props.underProduction) {
        deltaLabel = 'Underproduction'
        deltaBg = productionMisMatchBg
    } else {
        deltaBg = productionMatchedBg
    }
    return {
        deltaBg: deltaBg,
        deltaLabel: deltaLabel,
    }
}
