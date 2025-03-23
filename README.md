# 📊 Proyecto de Visualización de Datos con Google Charts
Andrés Caicedo, Juan Manuel Silva, Cristian Sarmiento

## 📌 Descripción
Este proyecto carga y visualiza datos de ventas de videojuegos almacenados en un archivo Excel (`data/ventas.xlsx`). Utiliza **Google Charts** para mostrar 6 gráficos diferentes que presentan información clave sobre las ventas y calificaciones de los juegos.

## 🛠️ Generación de datos random:
Se generaron datos random usando la función ALEATORIO.ENTRE de excel. Para las columnas de sales los números van de 100.000 hasta 1.000.000 y para los score van de 1 a 10

## 🛠️ Tecnologías Utilizadas
- **HTML, CSS, JavaScript**
- **Google Charts** para la visualización de datos
- **Live Server / Servidor local**

## 📁 Estructura del Proyecto
```
📂 proyecto-visualizacion
├── 📂 data
│   ├── ventas.xlsx  # Archivo con los datos de ventas
├── 📂 css
│   ├── styles.css   # Estilos de la página
├── 📂 js
│   ├── charts.js    # Código JavaScript para cargar y mostrar los gráficos
├── index.html       # Página principal con la estructura de la visualización
└── readme.md        # Documentación del proyecto
```

## 📊 Gráficos Implementados
1. **Gráfico de Pastel** - Ventas globales por categoría
2. **Gráfico de Barras** - Comparación de ventas en EE.UU. y Europa
3. **Gráfico de Líneas** - Ventas en Japón por juego
4. **Gráfico de Dispersión** - Relación entre calificación de usuarios y críticos
5. **Gráfico de Columnas** - Ventas globales por juego
6. **Gráfico de Burbujas** - Relación entre calificación y ventas globales

## 🚀 Cómo Ejecutar el Proyecto
### 1️⃣ Requisitos Previos
- Tener instalado **VS Code** (opcional)
- Tener **Live Server** (extensión de VS Code) o un servidor local

### 2️⃣ Iniciar un Servidor Local
**Opción 1: Usando Live Server** (Recomendado)
1. Abrir `index.html` en VS Code
2. Hacer clic derecho → **"Open with Live Server"**
3. Acceder en el navegador a `http://127.0.0.1:5500/`

**Opción 2: Usando Python (Alternativa)**
Ejecutar en la terminal dentro del proyecto:
```sh
python -m http.server 5500
```
Abrir en el navegador `http://127.0.0.1:5500/`

