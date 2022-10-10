var points = {A: {top: 66, left: 103}, B: {top: 186, left: 60}, C: {top: 100, left: 347}, D: {top: 198, left: 205}, E: {top: 356, left: 126}, F: {top: 275, left: 261}, G: {top: 189, left: 435}, H: {top: 71, left: 529}, I: {top: 374, left: 334}, J: {top: 220, left: 547}, K: {top: 314, left: 480}, L: {top: 433, left: 476}, M: {top: 162, left: 680}, N: {top: 397, left: 600}, O: {top: 475, left: 680}, P: {top: 290, left: 725}}

class PriorityQueue {
	constructor() {
		this.values = [];
	}

	sort() {
		this.values.sort((a,b) => a.priority - b.priority)
	}

	enqueue(value, priority) {
		this.values.push({value, priority});
		this.sort();
		return this.values
	}

	dequeue() {
		return this.values.shift()
	}
}

class WeightedGraph {
	constructor() {
		this.adjacencyList = {}
	}

	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	addEdge(vertex1, vertex2, weight) {
		if (vertex1 == "B" && vertex2 == "D") {
			this.adjacencyList[vertex1].push({node: vertex2, weight: weight});
			this.adjacencyList[vertex2].push({node: vertex1, weight: Infinity});
		}
		else if (vertex1 == "L" && vertex2 == "N") {
			this.adjacencyList[vertex1].push({node: vertex2, weight: weight});
			this.adjacencyList[vertex2].push({node: vertex1, weight: Infinity});
		}
		else if (vertex1 == "N" && vertex2 == "O") {
			this.adjacencyList[vertex1].push({node: vertex2, weight: weight});
			this.adjacencyList[vertex2].push({node: vertex1, weight: Infinity});
		}
		else if (vertex1 == "F" && vertex2 == "G") {
			this.adjacencyList[vertex1].push({node: vertex2, weight: Infinity});
			this.adjacencyList[vertex2].push({node: vertex1, weight: weight});
		}
		else if (vertex1 == "F" && vertex2 == "I") {
			this.adjacencyList[vertex1].push({node: vertex2, weight: Infinity});
			this.adjacencyList[vertex2].push({node: vertex1, weight: weight});
		}
		else if (vertex1 == "G" && vertex2 == "J") {
			this.adjacencyList[vertex1].push({node: vertex2, weight: Infinity});
			this.adjacencyList[vertex2].push({node: vertex1, weight: weight});
		}
		else {
			this.adjacencyList[vertex1].push({node: vertex2, weight: weight});
			this.adjacencyList[vertex2].push({node: vertex1, weight: weight});			
		}
	}

	Dijkstra(start, finish) {
		var nodes = new PriorityQueue();
		var distances = {};
		var previous = {};
		let smallest;
		let path = [];
		for (let vertex in this.adjacencyList) {
			if (vertex == start) {
				distances[start] = 0;
				nodes.enqueue(start, 0);
			}
			else {
				distances[vertex] = Infinity;
				nodes.enqueue(vertex, Infinity);
			}
			previous[vertex] = null;
		}

		while (nodes.values.length) {
			smallest = nodes.dequeue().value;
			if (smallest == finish) {
				while (previous[smallest]) {
					path.push(smallest);
					smallest = previous[smallest];
				}
				break;
			}
			if (smallest && distances[smallest] != Infinity) {
				for (let nextNode of this.adjacencyList[smallest]) {
					var nextNeighbor = nextNode.node;
					var gap = distances[smallest] + nextNode.weight;
					if (gap < distances[nextNeighbor]) {
						previous[nextNeighbor] = smallest;
						distances[nextNeighbor] = gap;
						nodes.enqueue(nextNeighbor, gap)
					}
				}
			}
		}
		return path.concat(smallest).reverse();
	}
}

var graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');
graph.addVertex('J');
graph.addVertex('K');
graph.addVertex('L');
graph.addVertex('M');
graph.addVertex('N');
graph.addVertex('O');
graph.addVertex('P');

graph.addEdge('A', 'B', 2.1);
graph.addEdge('A', 'C', 4);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2.8);
graph.addEdge("C", "F", 3.2);
graph.addEdge("D", "F", 1.5);
graph.addEdge("F", "E", 2.5);
graph.addEdge('B', 'D', 2.3);
graph.addEdge('A', 'D', 2.7);
graph.addEdge("E", "I", 3.4);
graph.addEdge("F", "I", 2);
graph.addEdge("F", "G", 3.1);
graph.addEdge("F", "K", 3.6);
graph.addEdge("I", "L", 2.5);
graph.addEdge('C', 'G', 2);
graph.addEdge('C', 'H', 3);
graph.addEdge("G", "H", 2.5);
graph.addEdge("G", "J", 1.9);
graph.addEdge("K", "J", 1.9);
graph.addEdge("K", "P", 4);
graph.addEdge("K", "N", 2.3);
graph.addEdge('L', 'N', 2);
graph.addEdge('L', 'O', 3.4);
graph.addEdge("H", "M", 2.9);
graph.addEdge("J", "M", 2.4);
graph.addEdge("N", "O", 1.8);
graph.addEdge("M", "P", 2.2);
graph.addEdge("P", "O", 3.1);

function drawLine(x1, y1, x2, y2) {
	var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
	newLine.setAttribute('x1', x1);
	newLine.setAttribute('y1', y1);
	newLine.setAttribute('x2', x2);
	newLine.setAttribute('y2', y2);
	newLine.setAttribute("stroke", "white")
	element = document.getElementById('number_line')
	element.appendChild(newLine)
}

function drawCircle(top, left) {
	var tag = document.createElement('span');
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; width:  30px; height: 30px; background-color: orange; border-radius: 50%; position: absolute');
	element = document.getElementById('container');
	element.appendChild(tag);
}

function drawLetter(order, top, left) {
	var tag = document.createElement('p');

	tag.innerText = order.toString();
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; color: ' + 'white' + '; position: absolute');

	element = document.getElementById('container');
	element.appendChild(tag);
}

function minPath() {
	var startPoint = document.getElementById('start_point').value;
	var finishPoint = document.getElementById('finish_point').value;
	var path_min = graph.Dijkstra(startPoint,finishPoint);
	
	var linePath = [];
	var dot_min = [];
	(function finalPath(path) {
		if (path.length == 1) {
			dot_min.push(path[0]);
			return undefined;
		}
		var first = path.pop();
		dot_min.push(first)
		var next = path.at(-1);
		linePath.push(first + next);
		finalPath(path)
	})(path_min)

	for (let i = 0; i < linePath.length; i++) {
		drawLine(points[linePath[i][0]].left, points[linePath[i][0]].top, points[linePath[i][1]].left, points[linePath[i][1]].top)
	}

	for (let i = 0; i < dot_min.length; i++) {
		drawCircle(points[dot_min[i]].top - 10, points[dot_min[i]].left - 10)
	}

	for (let i = 0; i < dot_min.length; i++) {
		drawLetter(dot_min[i], points[dot_min[i]].top - 20, points[dot_min[i]].left)
	}
}

function resetPrograms() {
	location.reload();
}

function init() {
	var findButton = document.getElementById('find');
	findButton.onclick = minPath;

	var resetButton = document.getElementById('reset');
	resetButton.onclick = resetPrograms;
}

window.onload = init









