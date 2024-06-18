import LinkedList from "./LinkedList.mjs";

export default class Graph {
    #matrizAdyacencia = []; 
    #map = new Map();        

   
    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push([]);
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1);
            return true;
        }
        return false;
    }

    addEdge(vertex1, vertex2, weight) {
        const index1 = this.#map.get(vertex1);
        const index2 = this.#map.get(vertex2);
        
        if (index1 !== undefined && index2 !== undefined) {
            this.#matrizAdyacencia[index1].push([vertex2, weight]);
            this.#matrizAdyacencia[index2].push([vertex1, weight]); 
            return true;
        }
        return false;
    }

    dfs(vertex, visitCallback) {
        const visited = new Set();
        const stack = [vertex];
        visited.add(vertex);
        while (stack.length > 0) {
            const current = stack.pop();
            visitCallback(current);
            const neighbors = this.#matrizAdyacencia[this.#map.get(current)];
            neighbors.forEach(([neighbor, weight]) => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            });
        }
    }

 
    bfs(vertex, visitCallback) {
        const visited = new Set();
        const queue = [vertex];
        visited.add(vertex);
        while (queue.length > 0) {
            const current = queue.shift();
            visitCallback(current);
            const neighbors = this.#matrizAdyacencia[this.#map.get(current)];
            neighbors.forEach(([neighbor, weight]) => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }
    }

    dijkstra(startVertex) {
        if (!this.#map.has(startVertex)) return null;

        const distances = {};
        const visited = new Set();
        const queue = [];
        

        for (let vertex of this.getVertices()) {
            distances[vertex] = vertex === startVertex ? 0 : Infinity;
            queue.push(vertex);
        }
        
        while (queue.length > 0) {
            let minVertex = this.getMinVertex(queue, distances, visited);
            if (minVertex === null) break;

            visited.add(minVertex);
            const neighbors = this.#matrizAdyacencia[this.#map.get(minVertex)];
            neighbors.forEach(([neighbor, weight]) => {
                if (!visited.has(neighbor)) {
                    const dist = distances[minVertex] + weight;
                    if (dist < distances[neighbor]) {
                        distances[neighbor] = dist;
                    }
                }
            });
        }
        
        return { distances };
    }

    getMinVertex(queue, distances, visited) {
        let minVertex = null;
        for (let vertex of queue) {
            if (!visited.has(vertex) && (minVertex === null || distances[vertex] < distances[minVertex])) {
                minVertex = vertex;
            }
        }
        return minVertex;
    }

    getVertices() {
        return this.#map.keys();
    }
}
