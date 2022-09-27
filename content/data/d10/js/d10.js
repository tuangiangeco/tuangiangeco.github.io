class Node {
	constructor(value, priority) {
		this.value = value;
		this.priority = priority
	}
}

class PriorityBinaryHeap {
	constructor() {
		this.values = []
	}

	insert(value, priority) {
		var newNode = new Node(value, priority);
		this.values.push(newNode)
		this.bubbleUp();
		return this.values;
	}
    
    bubbleUp() {
    	let idx = this.values.length - 1;
    	while (idx > 0) {
    		let parentIdx = Math.floor((idx-1)/2);
    		if (this.values[parentIdx].priority >= this.values[idx].priority) break;
    		let childValue = this.values[idx];
    		this.values[idx] = this.values[parentIdx];
    		this.values[parentIdx] = childValue;
    		idx = parentIdx
    	}
    	return this.values;
    }
    
	extractMax() {
		let max = this.values[0];
		let end = this.values.pop();
		if (this.values.length > 0) {
			this.values[0] = end;
			this.sinkDown();
        }
		return max
	}

	sinkDown() {
		let idx = 0;
		let length = this.values.length;

		while (true) {
			let element = this.values[idx].priority
			let leftChildIdx = 2 * idx + 1;
			let rightChildIdx = 2 * idx + 2;
			let leftchild,
				rightchild;
			let swap = null

			if (leftChildIdx < length) {
				leftchild = this.values[leftChildIdx].priority;
				if (leftchild > element) swap = leftChildIdx;
			}
			if (rightChildIdx < length) {
				rightchild = this.values[rightChildIdx].priority;
				if ((swap == null && rightchild > element) || (swap != null && rightchild > leftchild)) swap = rightChildIdx;
			}

			if (swap == null) break;
			this.values[idx] = this.values[swap];
			this.values[swap] = element;
			idx = swap
		}
	}
}

let heap = new PriorityBinaryHeap()

let priority_a = 150;
let priority_b = 100;
let priority_c = 50;

function drawInfo(num, top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '100')
	tag.setAttribute('height', '30')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')
	
	var context = tag.getContext("2d");
    context.fillStyle = "black";
    context.font = "bold 18px Arial";
    context.fillText(num, (tag.width / 2) - 10, (tag.height / 2) + 8);

	element = document.getElementById('container');
	element.appendChild(tag);

}

function getInfo() {
	var name = document.getElementById('name_input').value;
	var type = document.getElementById('select').value;

	if (type == 'a') {
		priority_a = priority_a - 1;
		heap.insert(name, priority_a)
		drawInfo(priority_a.toString(), '412', '300')
	}
	if (type == 'b') {
		priority_b = priority_b - 1;
		heap.insert(name, priority_b)
		drawInfo(priority_b.toString(), '412', '300')
	}
	if (type == 'c') {
		priority_c = priority_c - 1;
		heap.insert(name, priority_c)
		drawInfo(priority_c.toString(), '412', '300')
	}
}

function process1() {
	if (heap.values.length != 0) {
		let maxValue = heap.extractMax();
		let name = maxValue.value;
		let num = maxValue.priority;
		drawInfo(name, '80', '7')
		drawInfo(num, '115', '7')
	}
	if (heap.values.length != 0) {
		let next_name = heap.values[0].value;
		let next_num = heap.values[0].priority;
		drawInfo(next_name, '193', '265');
		drawInfo(next_num, '230', '265')
	}
}

function process2() {
	if (heap.values.length != 0) {
		let maxValue = heap.extractMax();
		let name = maxValue.value;
		let num = maxValue.priority;
		drawInfo(name, '80', '310')
		drawInfo(num, '115', '310')
	}
	if (heap.values.length != 0) {
		let next_name = heap.values[0].value;
		let next_num = heap.values[0].priority;
		drawInfo(next_name, '193', '265');
		drawInfo(next_num, '230', '265')
	}
}

function process3() {
	if (heap.values.length != 0) {
		let maxValue = heap.extractMax();
		let name = maxValue.value;
		let num = maxValue.priority;
		drawInfo(name, '80', '580')
		drawInfo(num, '115', '580')
	}
	if (heap.values.length != 0) {
		let next_name = heap.values[0].value;
		let next_num = heap.values[0].priority;
		drawInfo(next_name, '193', '265');
		drawInfo(next_num, '230', '265')
	}
}

function init() {
	var registerButton = document.getElementById('register');
	registerButton.onclick = getInfo;

	var rcpt1Button = document.getElementById('reception1');
	rcpt1Button.onclick = process1;
	var rcpt2Button = document.getElementById('reception2');
	rcpt2Button.onclick = process2;
	var rcpt3Button = document.getElementById('reception3');
	rcpt3Button.onclick = process3;

}

window.onload = init