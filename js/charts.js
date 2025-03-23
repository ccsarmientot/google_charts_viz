google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(loadData);

function loadData() {
    const data = [
        {
            title:"Garena Free Fire- World Series",
            category:"GAME_ACTION",
            US_Sales:644036.0,
            EU_Sales:813832.0,
            Global_Sales:449410.0,
            JP_Sales:586095.0,
            User_Rating:4.0,
            Critic_Rating:2.0
        },
        {
            title:"PUBG MOBILE - Traverse",
            category:"GAME_ACTION",
            US_Sales:647580.0,
            EU_Sales:760325.0,
            Global_Sales:860449.0,
            JP_Sales:265192.0,
            User_Rating:7.0,
            Critic_Rating:4.0
        },
        {
            title:"Mobile Legends: Bang Bang",
            category:"GAME_ACTION",
            US_Sales:811867.0,
            EU_Sales:133075.0,
            Global_Sales:797335.0,
            JP_Sales:582151.0,
            User_Rating:8.0,
            Critic_Rating:1.0
        },
        {
            title:"Brawl Stars",
            category:"GAME_ACTION",
            US_Sales:700329.0,
            EU_Sales:958875.0,
            Global_Sales:895912.0,
            JP_Sales:637512.0,
            User_Rating:5.0,
            Critic_Rating:9.0
        },
        {
            title:"Sniper 3D: Fun Free Online FPS Shooting Game",
            category:"GAME_ACTIO",
            US_Sales:757943.0,
            EU_Sales:635674.0,
            Global_Sales:546729.0,
            JP_Sales:649200.0,
            User_Rating:3.0,
            Critic_Rating:1.0
        }
    ];
    processChartData(data);
}

function processChartData(data) {
    drawPieChart(data);
    drawBarChart(data);
    drawLineChart(data);
    drawScatterChart(data);
    drawColumnChart(data);
    drawBubbleChart(data);
}

function drawPieChart(data) {
    let chartData = [['Categoría', 'Ventas Globales']];
    data.forEach(row => chartData.push([row.category, row.Global_Sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.PieChart(document.getElementById('chart1'));
    chart.draw(dataTable, { title: 'Ventas Globales por Categoría' });
}

function drawBarChart(data) {
    let chartData = [['Juego', 'Ventas en EE.UU.', 'Ventas en Europa']];
    data.forEach(row => chartData.push([row.title, row.US_Sales, row.EU_Sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.BarChart(document.getElementById('chart2'));
    chart.draw(dataTable, { title: 'Comparación de Ventas EE.UU. vs Europa' });
}

function drawLineChart(data) {
    let chartData = [['Juego', 'Ventas en Japón']];
    data.forEach(row => chartData.push([row.title, row.JP_Sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.LineChart(document.getElementById('chart3'));
    chart.draw(dataTable, { title: 'Ventas en Japón a lo Largo del Tiempo' });
}

function drawScatterChart(data) {
    let chartData = [['Calificación de Usuario', 'Calificación de Críticos']];
    data.forEach(row => chartData.push([row.User_Rating, row.Critic_Rating]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.ScatterChart(document.getElementById('chart4'));
    chart.draw(dataTable, { title: 'Relación entre Calificación de Usuarios y Críticos' });
}

function drawColumnChart(data) {
    let chartData = [['Juego', 'Ventas Globales']];
    data.forEach(row => chartData.push([row.title, row.Global_Sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.ColumnChart(document.getElementById('chart5'));
    chart.draw(dataTable, { title: 'Ventas Globales por Juego' });
}

function drawBubbleChart(data) {
    let chartData = [['Juego', 'Calificación de Usuario', 'Ventas Globales']];
    data.forEach(row => chartData.push([row.title, row.User_Rating, row.Global_Sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.BubbleChart(document.getElementById('chart6'));
    chart.draw(dataTable, { title: 'Relación entre Calificación y Ventas Globales' });
}
