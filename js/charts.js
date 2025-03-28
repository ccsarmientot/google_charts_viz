google.charts.load('current', { packages: ['corechart', 'table', 'geochart', 'map', 'treemap'] });
google.charts.setOnLoadCallback(loadData);

async function loadData() {
    const data = [
        {
            category:"RACING",
            US_Sales:51125689.0,
            EU_sales:60300310.0,
            Global_sales:47787420.0
        },
        {
            category:"ADVENTURE",
            US_Sales:55864580.0,
            EU_sales:53395745.0,
            Global_sales:50949923.0
        },
        {
            category:"CASINO",
            US_Sales:53425725.0,
            EU_sales:48724925.0,
            Global_sales:52946257.0
        },
        {
            category:"MUSIC",
            US_Sales:52007850.0,
            EU_sales:52838117.0,
            Global_sales:52995671.0
        },
        {
            category:"ACTION",
            US_Sales:55933050.0,
            EU_sales:57526026.0,
            Global_sales:53279574.0
        }
    
    ];
    const excelData = await loadExcelData();
    processChartData(data, excelData);
}

// Función para cargar los datos del archivo Excel
async function loadExcelData() {
    try {
        // Cargar el archivo Excel
        const response = await fetch('data/ventas.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        
        // Leer el archivo Excel
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Obtener la primera hoja del libro
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Convertir la hoja a JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Procesar los datos para los gráficos
        return jsonData;
    } catch (error) {
        console.error('Error al cargar el archivo Excel:', error);
        alert('No se pudo cargar el archivo Excel. Usando datos de ejemplo.');
        return [];
    }
}

function processChartData(data, excelData) {
    drawPieChart(data);
    drawBarChart(data);
    drawGeoChart(excelData);     // Gráfico 3
    drawComboChart(excelData);   // Gráfico 4
    drawColumnChart(excelData);
    drawBubbleChart(excelData);
}

// Gráfico 1: Distribución de ventas globales por categorías
function drawPieChart(data) {
    let chartData = [['Categoría', 'Ventas Globales']];
    data.forEach(row => chartData.push([row.category, row.Global_sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.PieChart(document.getElementById('chart1'));
    chart.draw(dataTable, { title: 'Ventas Globales en top 5 Categorías' });
}

// Gráfico 2: Comparativa de ventas de EU y Europa con respecto a la categoría
function drawBarChart(data) {
    let chartData = [['Categoría', 'Ventas en EE.UU.', 'Ventas en Europa']];
    data.forEach(row => chartData.push([row.category, row.US_Sales, row.EU_sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.BarChart(document.getElementById('chart2'));
    chart.draw(dataTable, { title: 'Comparación de Ventas EE.UU. vs Europa en top 5 categorías' });
}

// Gráfico 3: Gráfico que compara las ventas de los 3 primeros juegos en EU, US y JP para las 3 categorías más grandes
function drawGeoChart(data) {
    // Primero, encontrar las 3 categorías con mayores ventas globales
    const categorySales = {};
    
    // Calcular ventas totales por categoría
    data.forEach(row => {
        const category = row.category || 'Sin categoría';
        if (!categorySales[category]) {
            categorySales[category] = 0;
        }
        categorySales[category] += row.Global_sales || 0;
    });
    
    // Ordenar categorías por ventas totales y obtener las 3 principales
    const top3Categories = Object.entries(categorySales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(entry => entry[0]);
    
    // Filtrar juegos por las 3 categorías principales
    const filteredGames = data.filter(game => top3Categories.includes(game.category));
    
    // Agrupar juegos por categoría
    const gamesByCategory = {};
    top3Categories.forEach(category => {
        // Obtener juegos de esta categoría, ordenados por rank
        gamesByCategory[category] = filteredGames
            .filter(game => game.category === category)
            .sort((a, b) => (a.rank || 9999) - (b.rank || 9999))
            .slice(0, 3); // Tomar los 3 primeros por ranking
    });
    
    // Preparar datos para el gráfico
    const chartData = [];
    
    // Añadir encabezados
    chartData.push(['Juego', 'Ventas EE.UU. (millones)', 'Ventas Europa (millones)', 'Ventas Japón (millones)', { role: 'annotation' }]);
    
    // Añadir datos de cada categoría
    top3Categories.forEach(category => {
        const topGames = gamesByCategory[category];
        
        // Añadir los 3 mejores juegos de esta categoría
        topGames.forEach(game => {
            const title = game.title || 'Sin título';
            const usSales = game.US_Sales / 1000000 || 0; // Convertir a millones
            const euSales = game.EU_sales / 1000000 || 0; // Convertir a millones
            const jpSales = game.JP_sales / 1000000 || 0; // Convertir a millones
            const rank = game.rank || 'N/A';
            
            chartData.push([`${title} (${category})`, usSales, euSales, jpSales, `Rank: ${rank}`]);
        });
    });
    
    const dataTable = google.visualization.arrayToDataTable(chartData);
    const chart = new google.visualization.ColumnChart(document.getElementById('chart3'));
    
    const options = {
        title: 'Comparación de ventas regionales para los mejores juegos de las 3 categorías principales',
        subtitle: `Categorías: ${top3Categories.join(', ')}`,
        isStacked: false,
        height: 300,
        width: 600,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        hAxis: {
            title: 'Juego',
            slantedText: true,
            slantedTextAngle: 45
        },
        vAxis: {
            title: 'Ventas (millones)',
            minValue: 0
        },
        colors: ['#4285F4', '#0F9D58', '#DB4437'],
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out'
        }
    };
    
    chart.draw(dataTable, options);
}

// Gráfico 4: Treemap que muestra la distribución de ventas globales por categoría y por juego
function drawComboChart(data) {
    // Preparar datos para el treemap
    // El treemap necesita datos en formato: [['Categoría', 'Padre', 'Ventas Globales (millones)', 'Color']]
    let chartData = [
        ['ID', 'Padre', 'Ventas Globales (millones)', 'Color']
    ];
    
    // Añadir el nodo raíz
    chartData.push(['Ventas Globales', null, 0, 0]);
    
    // Agrupar datos por categoría
    const categorySales = {};
    const gameData = {};
    
    // Calcular ventas totales por categoría y recopilar datos de juegos
    data.forEach(row => {
        const category = row.category || 'Sin categoría';
        const title = row.title || 'Sin título';
        const sales = row.Global_sales / 1000000 || 0; // Convertir a millones
        
        // Agregar categoría si no existe
        if (!categorySales[category]) {
            categorySales[category] = 0;
        }
        
        // Sumar ventas a la categoría
        categorySales[category] += sales;
        
        // Guardar datos del juego si tiene ventas significativas (mayor a 0.1 millones)
        if (sales > 0.1) {
            const gameId = `${category}-${title}`;
            gameData[gameId] = {
                title,
                category,
                sales
            };
        }
    });
    
    // Añadir categorías al treemap
    Object.entries(categorySales)
        .sort((a, b) => b[1] - a[1]) // Ordenar por ventas (de mayor a menor)
        .forEach(([category, sales], index) => {
            // Solo incluir categorías con ventas significativas
            if (sales > 0.5) { // Más de 0.5 millones en ventas
                chartData.push([category, 'Ventas Globales', sales, sales]);
            }
        });
    
    // Añadir juegos al treemap (como hijos de sus categorías)
    Object.values(gameData)
        .sort((a, b) => b.sales - a.sales) // Ordenar por ventas (de mayor a menor)
        .slice(0, 50) // Limitar a los 50 juegos con mayores ventas para no sobrecargar el treemap
        .forEach(game => {
            chartData.push([`${game.category}-${game.title}`, game.category, game.sales, game.sales]);
        });
    
    const dataTable = google.visualization.arrayToDataTable(chartData);
    const chart = new google.visualization.TreeMap(document.getElementById('chart4'));
    
    const options = {
        title: '¿Cómo se distribuyen las ventas globales por categoría y por juego?',
        minColor: '#b3e0ff',
        midColor: '#4285F4',
        maxColor: '#0F52BA',
        headerHeight: 25,
        fontColor: 'black',
        showScale: false,
        height: 350,
        generateTooltip: function(row, size, value) {
            const id = dataTable.getValue(row, 0);
            const parent = dataTable.getValue(row, 1);
            const sales = dataTable.getValue(row, 2);
            
            if (parent === 'Ventas Globales') {
                // Es una categoría
                return '<div style="background:#fd9; padding:10px; border-style:solid">' +
                    `<span style="font-family:Courier"><b>Categoría:</b> ${id}</span><br>` +
                    `<span style="font-family:Courier"><b>Ventas Globales:</b> ${sales.toFixed(2)} millones</span><br>` +
                    '</div>';
            } else if (parent !== null) {
                // Es un juego
                const title = id.substring(parent.length + 1); // Eliminar el prefijo de categoría
                return '<div style="background:#fd9; padding:10px; border-style:solid">' +
                    `<span style="font-family:Courier"><b>Juego:</b> ${title}</span><br>` +
                    `<span style="font-family:Courier"><b>Categoría:</b> ${parent}</span><br>` +
                    `<span style="font-family:Courier"><b>Ventas Globales:</b> ${sales.toFixed(2)} millones</span><br>` +
                    '</div>';
            }
        }
    };
    
    chart.draw(dataTable, options);
}

function drawColumnChart(data) {
    let chartData = [['Juego', 'Ventas Globales']];
    data.forEach(row => chartData.push([row.title, row.Global_sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.ColumnChart(document.getElementById('chart5'));
    chart.draw(dataTable, { title: 'Ventas Globales por Juego' });
}

function drawBubbleChart(data) {
    let chartData = [['Juego', 'Calificación de Usuario', 'Ventas Globales']];
    data.forEach(row => chartData.push([row.title, row.User_rating, row.Global_sales]));
    let dataTable = google.visualization.arrayToDataTable(chartData);
    let chart = new google.visualization.BubbleChart(document.getElementById('chart6'));
    chart.draw(dataTable, { title: 'Relación entre Calificación y Ventas Globales' });
}
