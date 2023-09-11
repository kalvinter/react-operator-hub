export const lineChartBaseOptions = {
    responsive: true,
    pointStyle: "line",
    animations: {
        x: {
            type: 'number',
            easing: 'linear',
            duration: 2,
            }
    },
};

export function generateChartLabels(timeRunning){
    let labels;

    if (timeRunning <= 10) {
        labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]
    } else {
        let rawLabels = Array.from(Array(timeRunning).keys()).slice(-11)
        
        labels = []

        for (let label of rawLabels){
            labels.push((label / 10).toFixed(1))
        }
    }
    return labels
}