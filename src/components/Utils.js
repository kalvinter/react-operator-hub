export const productionMatchedBg = 'bg-success'
export const productionMisMatchBg = 'bg-warning'

export function getProductionBg(props) {
    let deltaBg = productionMatchedBg

    if (props.overProduction || props.underProduction) {
        deltaBg = productionMisMatchBg
    } else {
        deltaBg = productionMatchedBg
    }
    return deltaBg
}
