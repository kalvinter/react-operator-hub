
function Percentage(props) {
    let formattedMatchedRate = (props.decimalFigure * 100).toFixed(2)

    /*  Add an invisible 1 if the decimal figure is below 10 % to achieve that the width stays the same.
        For some reason - probably because of the used font - an nbsp; sign has not the same width as a single number
    */
    return (
        <span>{(formattedMatchedRate.length < 5) ? <span className='invisible'>1</span> : ''}{formattedMatchedRate}</span>
    )
}

export default Percentage