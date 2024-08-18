// script.js
const ctx = document.getElementById('myChart').getContext('2d');

const datasets = {
    dataset1: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    },
    dataset2: {
        labels: ['August', 'September', 'October', 'November', 'December'],
        data: [28, 48, 40, 19, 86],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
    }
};

let currentDataset = 'dataset1';

let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: datasets[currentDataset].labels,
        datasets: [{
            label: datasets[currentDataset].label,
            data: datasets[currentDataset].data,
            backgroundColor: datasets[currentDataset].backgroundColor,
            borderColor: datasets[currentDataset].borderColor,
            borderWidth: datasets[currentDataset].borderWidth
        }]
    },
    
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});

document.getElementById('dataset-selector').addEventListener('change', (event) => {
    const selectedDataset = event.target.value;

    myChart.data.labels = datasets[selectedDataset].labels;
    myChart.data.datasets[0].data = datasets[selectedDataset].data;
    myChart.data.datasets[0].backgroundColor = datasets[selectedDataset].backgroundColor;
    myChart.data.datasets[0].borderColor = datasets[selectedDataset].borderColor;
    myChart.data.datasets[0].borderWidth = datasets[selectedDataset].borderWidth;

    myChart.update();
});