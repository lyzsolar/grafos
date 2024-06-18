
import Graph from "../models/Graph.mjs";

const graph = new Graph();

const btnAgregarColonia = document.getElementById("agregarColonia");
const btnAgregarConexion = document.getElementById("AddConexion");
const btnRecorrProf = document.getElementById("RecorrProf");
const btnRecorrAnch = document.getElementById("RecorrAnch");
const btndis = document.getElementById("distrak");
const tbodyProfundidad = document.getElementById("tbodyProfundidad");
const tbodyAnchura = document.getElementById("tbodyAnchura");

function mostrarAlerta(icon, title, message) {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: '#007bff'
    });
}

btnAgregarColonia.addEventListener("click", () => {
    const colonia = document.getElementById("colonia").value.trim();
    
    if (colonia !== "") {
        if (graph.addVertex(colonia)) {
            mostrarAlerta('success', 'Registro Exitoso', `Colonia ${colonia} registrada exitosamente`);
        } else {
            mostrarAlerta('error', 'Error', 'La colonia no se registró');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar una colonia');
    }
});

btnAgregarConexion.addEventListener("click", () => {
    const coloniaA = document.getElementById("coloniaA").value.trim();
    const coloniaB = document.getElementById("coloniaB").value.trim();
    const km = parseInt(document.getElementById("km").value);

    if (coloniaA !== "" && coloniaB !== "" && !isNaN(km) && km > 0) {
        if (graph.addEdge(coloniaA, coloniaB, km)) {
            mostrarAlerta('success', 'Conexión Agregada', `Conexión entre ${coloniaA} y ${coloniaB} agregada exitosamente`);
        } else {
            mostrarAlerta('error', 'Error', 'La conexión no se pudo agregar');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar ambas colonias y un valor válido de kilómetros');
    }
});


btndis.addEventListener("click", () => {
    const startVertex = document.getElementById("startVertex").value.trim();

    if (startVertex !== "") {
        const result = graph.dijkstra(startVertex);
        if (result) {
            let message = `Distancias mínimas desde ${startVertex}:\n`;
            for (let vertex in result.distances) {
                message += `${vertex}: ${result.distances[vertex]}\n`;
            }
            mostrarAlerta('info', 'Resultados Dijkstra', message);
        } else {
            mostrarAlerta('error', 'Error', 'El vértice inicial no existe en el grafo');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe seleccionar un vértice inicial para ejecutar Dijkstra');
    }
});


btnRecorrProf.addEventListener("click", () => {
    tbodyProfundidad.innerHTML = ''; 
    const vertices = [...graph.getVertices()][0]; 
    graph.dfs(vertices, (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyProfundidad.appendChild(row);
    });
});


btnRecorrAnch.addEventListener("click", () => {
    tbodyAnchura.innerHTML = ''; 
    const vertices = [...graph.getVertices()][0]; 
    graph.bfs(vertices, (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyAnchura.appendChild(row);
    });
});
