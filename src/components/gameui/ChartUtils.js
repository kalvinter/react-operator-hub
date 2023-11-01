export const lineChartBaseOptions = {
    responsive: true,
    pointStyle: "line",
    animations: {
        x: {
            type: 'number',
            easing: 'linear',
            duration: 2,
            }
    }    
};

export function generateChartLabels(timeRunning){
    let labels;

    if (timeRunning <= 10) {
        labels = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.10, 0.10]
    } else {
        let rawLabels = Array.from(Array(timeRunning).keys()).slice(-11)
        
        labels = []

        for (let label of rawLabels){
            labels.push((label / 20).toFixed(1))
        }
    }
    return labels
}