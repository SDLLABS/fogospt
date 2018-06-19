$(document).ready(function () {
    plot();
    plotWeekStats();
});

function plot() {
    var url = 'https://api-beta.fogos.pt/v1/now/data';
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            data = JSON.parse(data);
            if (data.success && data.data.length) {
                labels = [];
                var man = [];
                var terrain = [];
                var aerial = [];
                var total = [];
                for (d in data.data) {
                    labels.push(data.data[d].label);
                    man.push(data.data[d].man);
                    terrain.push(data.data[d].terrain);
                    aerial.push(data.data[d].aerial);
                    total.push(data.data[d].total);
                }

                var ctx = document.getElementById("myChart");
                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    omitXLabels: true,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Humanos',
                            data: man,
                            fill: false,
                            backgroundColor: '#EFC800',
                            borderColor: '#EFC800'
                        },
                            {
                                label: 'Terrestres',
                                data: terrain,
                                fill: false,
                                backgroundColor: '#6D720B',
                                borderColor: '#6D720B'
                            },
                            {
                                label: 'Aéreos',
                                data: aerial,
                                fill: false,
                                backgroundColor: '#4E88B2',
                                borderColor: '#4E88B2'
                            },
                            {
                                label: 'Incêndios ativos',
                                data: total,
                                fill: false,
                                backgroundColor: '#ff512f',
                                borderColor: '#ff512f'
                            }]
                    },
                    options: {
                        elements: {
                            line: {
                                tension: 0, // disables bezier curves
                                showXLabels: 5,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    stepSize:20
                                }
                            }]
                        }
                    }
                });
            } else {
                $('#info').find('canvas').remove();
                $('#info').append('<p>Não há dados disponiveis</p> ');
            }
        }
    });
}

function plotWeekStats() {
    var url = 'https://api-beta.fogos.pt/v1/stats/week';
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            data = JSON.parse(data);
            if (data.success && data.data.length) {
                labels = [];
                var total = [];
                var falseFires = [];
                for (d in data.data) {
                    labels.push(data.data[d].label);
                    falseFires.push(data.data[d].false);
                    total.push(data.data[d].total);
                }

                var ctx = document.getElementById("myChartStatsWeek");
                var myLineChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Total',
                            data: total,
                            fill: false,
                            backgroundColor: '#fe5130',
                            borderColor: '#fe5130'
                        },
                            {
                                label: 'Falsos Alarmes',
                                data: falseFires,
                                fill: false,
                                backgroundColor: '#000000',
                                borderColor: '#000000'
                            },
                            ]
                    },
                    options: {
                        elements: {
                            line: {
                                tension: 0, // disables bezier curves
                                showXLabels: 5,
                            }
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true,
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                });
            } else {
                $('#info').find('canvas').remove();
                $('#info').append('<p>Não há dados disponiveis</p> ');
            }
        }
    });

}