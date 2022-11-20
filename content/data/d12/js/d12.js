
var productQuantity = {wardrobe: 20, desk: 19, chair: 18, lamp: 25, sofa: 30, mattress: 14, doormat: 42, shelves: 30, pillows: 40, fan: 33, sink: 35};
var quantity_point = {wardrobe: 70, desk: 100, chair: 130, sofa: 160, mattress: 190, lamp: 220, doormat: 250, shelves: 280, pillows: 310, fan: 340, sink: 370};

class Product {
	constructor() {
		this.val = {wardrobe: {price: 3000, quantity: productQuantity['wardrobe']} , desk: {price: 2000, quantity: productQuantity['desk']}, chair: {price: 1000, quantity: productQuantity['chair']}, lamp: {price: 300, quantity: productQuantity['lamp']}, sofa: {price: 200, quantity: productQuantity['sofa']}, mattress: {price: 1200, quantity: productQuantity['mattress']}, doormat: {price: 50, quantity: productQuantity['doormat']}, shelves: {price: 1400, quantity: productQuantity['shelves']}, pillows: {price: 2000, quantity: productQuantity['pillows']}, fan: {price: 500, quantity: productQuantity['fan']}, sink: {price: 300, quantity: productQuantity['sink']}};
	}
}

class Order {
	constructor(x, y) {
		var product = new Product();
		if (!product.val[x]) return undefined;
		if (product.val[x].quantity < y) return undefined;

		productQuantity[x] = productQuantity[x] - y;

		drawQuantity(productQuantity[x], quantity_point[x] + 7, 215);

		var newOrder = {productName: x, QuantityOrdered: y, Price: product.val[x].price, ExtendedPrice: product.val[x].price * y};

		this.val = newOrder;
		this.next = null;
		this.prev = null;
	}
}

class OrderLine {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(x, y) {
		var number;
		if (this.length == 0) number = 1
		else number = this.tail.val["orderNumber"] + 1;

		var newNode = new Order(x, y);
		newNode.val["orderNumber"] = number;

		if (this.length === 0) {
			this.head = newNode;
			this.tail = newNode;	
		}
		else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	shift() {
		if (this.length === 0) return undefined;

		var oldHead = this.head;
		if (this.length === 1) {
			this.head = null;
			this.tail = null;
		}
		else {
			this.head = oldHead.next;
			this.head.prev = null;
			oldHead.next = null;
		}
		this.length--;
		return oldHead;
	}

	pop() {
		if (this.length === 0) return undefined;

		var oldTail = this.tail;
		if (this.length === 1) {
			this.head = null;
			this.tail = null;
		}
		else {
			this.tail = oldTail.prev;
			this.tail.next = null;
			oldTail.prev = null;
		}
		this.length--;
		return oldTail;
	}

	showOrderList() {
		var count = 0,
			current = this.head,
			orderList = [];

		while (count < this.length) {
			orderList.push(current.val);
			count++;
			current = current.next;
		};

		return orderList;		
	}

	getOrderItem(item) {
		var count = 0,
			current = this.head,
			itemOrder = [];

		while (count < this.length) {
			if (item === current.val["productName"]) itemOrder.push(current.val);
			count++;
			current = current.next
		};

		return itemOrder;
	}

	getOldestOrder(item) {
		var count = 0,
			current = this.head;

		while (count < this.length) {
			if (item === current.val["productName"]) return current.val;
			count++;
			current = current.next
		};

		return undefined;
	}

	getNewestOrder(item) {
		var count = this.length - 1,
			current = this.tail;

		while (count >= 0) {
			if (item === current.val["productName"]) return current.val;
			count--;
			current = current.prev
		};

		return undefined;
	}

	get(orderNumber) {
		var count,
			current;
		if (orderNumber <= this.length/2) {
			count = this.length - 1;
			current = this.tail;
			while (orderNumber != current.val["orderNumber"]) {
				if (count < 0) return undefined;
				current = current.prev;
				count--;
			}
			return current;
		}
		else {
			count = 0;
			current = this.head;
			while (orderNumber != current.val["orderNumber"]) {
				if (count >= this.length) return undefined;
				current = current.next;
				count++;
			}
			return current;
		}
	}

	remove(orderNumber) {
		var removedNode = this.get(orderNumber);
		if (removedNode.prev === null) return this.shift();
		if (removedNode.next === null) return this.pop();
		// Xac dinh beforeNode & afterNode
		var beforeNode = removedNode.prev;
		var afterNode = removedNode.next;
		// Tro beforeNode & afterNode vao nhau
		beforeNode.next = afterNode;
		afterNode.prev = beforeNode;
		// Xoa con tro cua removedNode
		removedNode.prev = null;
		removedNode.next = null;

		this.length--;
		return removedNode.val;
	}
}

var orders = new OrderLine();

function drawOrderList(quantity, top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '60')
	tag.setAttribute('height', '15')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')
	
	var context = tag.getContext("2d");
    context.fillStyle = "black";
    context.font = "bold 12px Arial";
    context.fillText(quantity, (tag.width / 2) - 27, (tag.height / 2) + 1);

	element = document.getElementById('container');
	element.appendChild(tag);
}

function drawQuantity(quantity, top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '30')
	tag.setAttribute('height', '30')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')
	
	var context = tag.getContext("2d");
    context.fillStyle = "black";
    context.font = "bold 18px Arial";
    context.fillText(quantity, (tag.width / 2) - 10, (tag.height / 2) + 8);

	element = document.getElementById('container');
	element.appendChild(tag);
}

function drawEmpty(top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '445')
	tag.setAttribute('height', '300')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')

	element = document.getElementById('container');
	element.appendChild(tag);
}


function createOrder() {
	var quantity = document.getElementById('quantity_input').value;
	var item = document.getElementById('item_select').value.toString();
	orders.push(item, quantity);
}

function createOrderList() {
	var orderList = orders.showOrderList();
	var top = 410;
	for (let node of orderList) {
		var left = 300;
		for (let key in node) {
			drawOrderList(node[key], top, left);
			left += 87;
		};
		top += 20;
	}
}

function drawGetOrder() {
	var item = document.getElementById('item_choose').value.toString();
	var item_order = orders.getOrderItem(item);
	drawEmpty(400,300);
	var top = 410;
	for (let node of item_order) {
		var left = 300;
		for (let key in node) {
			drawOrderList(node[key], top, left);
			left += 87;
		};
		top += 20;
	}
}

function drawOldestOrder() {
	var item = document.getElementById('item_choose').value.toString();
	var oldest_order = orders.getOldestOrder(item);
	drawEmpty(400,300);
	var top = 410;
	var left = 300;
	for (let key in oldest_order) {
		drawOrderList(oldest_order[key], top, left);
		left += 87;
	};
}

function drawNewestOrder() {
	var item = document.getElementById('item_choose').value.toString();
	var oldest_order = orders.getNewestOrder(item);
	drawEmpty(400,300);
	var top = 410;
	var left = 300;
	for (let key in oldest_order) {
		drawOrderList(oldest_order[key], top, left);
		left += 87;
	};
}

function drawGetOrderByNumber() {
	var orderNumber = document.getElementById('order_input').value;
	var orderByNumber = orders.get(orderNumber);
	drawEmpty(400,300);
	var top = 410;
	var left = 300;
	for (let key in orderByNumber.val) {
		drawOrderList(orderByNumber.val[key], top, left);
		left += 87;
	};
}

function drawRemoveOrderByNumber() {
	var orderNumber = document.getElementById('order_input').value;
	var removeOrder = orders.remove(orderNumber);
	drawEmpty(400,300);
	var top = 410;
	var left = 300;
	for (let key in removeOrder.val) {
		drawOrderList(removeOrder.val[key], top, left);
		left += 87;
	};
}

function cancelPrograms() {
	location.reload();
}

function init() {
	var orderNow = document.getElementById('order_button');
	orderNow.onclick = createOrder;

	var order_list = document.getElementById('order_list_button');
	order_list.onclick = createOrderList;

	var get_order = document.getElementById('get_order');
	get_order.onclick = drawGetOrder;

	var oldest_order = document.getElementById('get_oldest_order');
	oldest_order.onclick = drawOldestOrder;

	var newest_order = document.getElementById('get_newest_order');
	newest_order.onclick = drawNewestOrder;

	var get_order_by_number = document.getElementById('get_order_number');
	get_order_by_number.onclick = drawGetOrderByNumber;

	var remove_order_by_number = document.getElementById('remove_order_number');
	remove_order_by_number.onclick = drawRemoveOrderByNumber;

	var cancelButton = document.getElementById('cancel_button');
	cancelButton.onclick = cancelPrograms;
}

window.onload = init;





