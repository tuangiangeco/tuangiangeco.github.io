class Node {
	constructor(x, y, z) {
		this.next = null;
		this.val = {order: x.toString(), top: y.toString(), left: z.toString()}
	}
}

class NumberList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(x, y, z) {
		var newNode = new Node(x, y, z)
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		}
		else {
			this.tail.next = newNode;
			this.tail = newNode
		}
		this.length++
		return this
	}

	shift() {
		if (!this.head) return undefined;
		var currentHead = this.head;
		this.head = currentHead.next;
		this.length--;
		if (this.length == 0) this.tail = null;
		return currentHead;
	}
}

listOfNumber = new NumberList();

function drawNumbers(order, top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '30')
	tag.setAttribute('height', '30')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')
	
	var context = tag.getContext("2d");
    context.fillStyle = "black";
    context.font = "bold 18px Arial";
    context.fillText(order, (tag.width / 2) - 10, (tag.height / 2) + 8);

	element = document.getElementById('container');
	element.appendChild(tag);

	if (left == 491) return undefined
	if (order >= 2) drawNumbers(order, 385, 491)

}

function drawRcpt(order, top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '30')
	tag.setAttribute('height', '30')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')
	
	var context = tag.getContext("2d");
    context.fillStyle = "black";
    context.font = "bold 18px Arial";
    context.fillText(order, (tag.width / 2) - 10, (tag.height / 2) + 8);

	element = document.getElementById('container');
	element.appendChild(tag);

}

function getNumbers() {
	if (!listOfNumber.head) {
		var order = listOfNumber.length + 1
	}
	else {
		var order = parseInt(listOfNumber.tail.val.order) + 1
	}

	if (order >= 1 && order <= 19) {
		var top = 190;
		var left = 120 + (order - 1)*30
	}
	else if (order >= 20 && order <= 38) {
		var top = 220;
		var left = 120 + (order - 20)*30		
	}
	else if (order >= 39 && order <= 57) {
		var top = 250;
		var left = 120 + (order - 39)*30		
	}
	else return undefined

	listOfNumber.push(order, top, left)
	drawNumbers(order, top, left)
}

function process1() {
	var order = listOfNumber.head.val.order
	var top = 40
	var left = 120
	drawRcpt(order, top, left)
	drawNumbers('', listOfNumber.head.val.top, listOfNumber.head.val.left)
	listOfNumber.shift()
}

function process2() {
	var order = listOfNumber.head.val.order
	var top = 40
	var left = 420
	drawRcpt(order, top, left)
	drawNumbers('', listOfNumber.head.val.top, listOfNumber.head.val.left)
	listOfNumber.shift()
}

function process3() {
	var order = listOfNumber.head.val.order
	var top = 40
	var left = 690
	drawRcpt(order, top, left)
	drawNumbers('', listOfNumber.head.val.top, listOfNumber.head.val.left)
	listOfNumber.shift()
}

function init() {
	var getNumber = document.getElementById('register');
	getNumber.onclick = getNumbers;

	var rcpt1 = document.getElementById('reception1');
	rcpt1.onclick = process1;
	var rcpt2 = document.getElementById('reception2');
	rcpt2.onclick = process2;
	var rcpt3 = document.getElementById('reception3');
	rcpt3.onclick = process3;
}


window.onload = init;
