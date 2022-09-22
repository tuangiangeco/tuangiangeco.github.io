var points = {c: {left: 275, top: 50}, cl: {left: 150, top: 160}, cr: {left: 400, top: 160}, cll: {left: 75, top: 320}, clr: {left: 225, top: 320}, crl: {left: 325, top: 320}, crr: {left: 475, top: 320}, clll: {left: 45, top: 480}, cllr: {left: 105, top: 480}, clrl: {left: 195, top: 480}, clrr: {left: 255, top: 480}, crll: {left: 295, top: 480}, crlr: {left: 355, top: 480}, crrl: {left: 445, top: 480}, crrr: {left: 505, top: 480}}

class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(val) {
		var newNode = new Node(val);
		var position = 'c'
		if (!this.root) {
			this.root = newNode
			return position
		}
		else {
			var current = this.root;
			while (true) {
				if (val < current.value) {
					if (current.left == null) {
						current.left = newNode
						position = position + 'l'
						return position
					}
					else {
						current = current.left
						position = position + 'l'
					}
				}
				else if (val > current.value) {
					if (current.right == null) {
						current.right = newNode
						position = position + 'r'
						return position
					}
					else {
						current = current.right
						position = position + 'r'
					}
				}
				else return undefined
			}
		}
	}
	
	find(val) {
		if (this.root == null) return undefined;
		var position = 'c'
		var current = this.root,
			found = false;
		while (current && !found) {
			if (val < current.value) {
				current = current.left;
				position = position + 'l';
			}
			else if (val > current.value) {
				current = current.right;
				position = position + 'r';
			}
			else {
				found = true;
			}
		}
		if (!found) return undefined
		return position
	}
}

function drawLine(x1, y1, x2, y2) {
	var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
	newLine.setAttribute('x1', x1);
	newLine.setAttribute('y1', y1);
	newLine.setAttribute('x2', x2);
	newLine.setAttribute('y2', y2);
	newLine.setAttribute("stroke", "blue")
	element = document.getElementById('number_line')
	element.appendChild(newLine)
}

function drawNumbers(order, top, left) {
	var tag = document.createElement('p');

	tag.innerText = order.toString();
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; color: ' + 'white' + '; position: absolute');

	element = document.getElementById('container');
	element.appendChild(tag);
}

function drawCircle(top, left) {
	var tag = document.createElement('span');
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; width:  36px; height: 36px; background-color: red; border-radius: 50%; position: absolute');
	element = document.getElementById('container');
	element.appendChild(tag);
}

var tree = new BinaryTree()

function insertNumber() {
	var numberInput = document.getElementById('number_input').value;
	numberInput = parseInt(numberInput)
	var position = tree.insert(numberInput)
	var ex_position = position.slice(0,-1)

	if (ex_position != "") {
		var x1 = points[ex_position].left + 20
		var y1 = points[ex_position].top + 20
		var x2 = points[position].left + 20
		var y2 = points[position].top + 20
		drawLine(x1.toString(), y1.toString(), x2.toString(), y2.toString())
	}

	var top = points[position].top - 8
	var left = points[position].left + 10
	drawNumbers(numberInput, top.toString(), left.toString())
}

function findNumber() {
	var numberFind = document.getElementById('number_find').value;
	numberFind = parseInt(numberFind)
	var position = tree.find(numberFind)
	var top = points[position].top
	var left = points[position].left
	drawCircle(top.toString(), left.toString())

	var top = top - 8
	var left = left + 10
	drawNumbers(numberFind, top.toString(), left.toString())
}

function resetPrograms() {
	location.reload();
}

function init() {
	var numberValue = document.getElementById('number_button');
	numberValue.onclick = insertNumber;

	var numberFind = document.getElementById('find_button');
	numberFind.onclick = findNumber;

	var resetButton = document.getElementById('reset');
	resetButton.onclick = resetPrograms;
}

window.onload = init;