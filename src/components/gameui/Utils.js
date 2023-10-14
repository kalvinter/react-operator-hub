import { greenBg, orangeBg } from "../Utils";

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