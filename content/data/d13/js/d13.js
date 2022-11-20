
class Customer {
	constructor() {
		this.values = {};
	}

	addCustomerInfo(customerCode, address, details) {
		if (!this.values[customerCode]) this.values[customerCode] = [];
		this.values[customerCode][0] = address;
		this.values[customerCode][1] = details;
		return this.values;
	}

	addCustomerOrder(customerCode, OrderNumber, OrderDate, DeliveryDate, TotalAmount) {
		if (!this.values[customerCode]) return undefined;
		if (!this.values[customerCode][2]) this.values[customerCode][2] = new OrderLine();
		this.values[customerCode][2].insert(OrderNumber, OrderDate, DeliveryDate, TotalAmount);
		return this.values[customerCode][2];
	}

	showCustomerOrder(customerCode) {
		var customerOrderList = [];
		var orderList = this.values[customerCode][2];

		var count = 0;
		var current = orderList.head;

		while (count <= orderList.length - 1) {
			customerOrderList.push(current.val);
			current = current.next;
			count++;
		};

		return customerOrderList;
	}

	removeCustomerOrder(customerCode, OrderNumber) {
		if (!this.values[customerCode]) return undefined;
		if (!this.values[customerCode][2]) return undefined;
		this.values[customerCode][2].remove(OrderNumber);
		return this.values[customerCode][2];
	}
}

class Order {
	constructor(a, b, c, d) {
		this.next = null;
		this.val = {OrderNumber: a, OrderDate: b, DeliveryDate: c, TotalAmount: d}
	}
}

class OrderLine {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(a, b, c, d) {
		var newOrder = new Order(a, b, c, d);
		if (this.length === 0) {
			this.head = newOrder;
			this.tail = newOrder;
		}
		else {
			this.tail.next = newOrder;
			this.tail = newOrder;
		}
		this.length++;
		return this;
	}

	pop() {
		if (this.length == 0) return undefined;

		if (this.length == 1) {
			var nodeHead = this.head;
			this.head = null;
			this.tail = null;
			this.length--;
			return nodeHead;
		}
		else {
			var current = this.head;
			var newTail = current;
			while (current.next) {
				newTail = current;
				current = current.next;
			};
			this.tail = newTail;
			newTail.next = null;
			this.length--;
			return current;
		}
	}
		
	shift() {
		if (this.length == 0) return undefined;

		if (this.length == 1) {
			var nodeHead = this.head;
			this.head = null;
			this.tail = null;
			this.length--;
			return nodeHead;
		}
		else {
			var oldHead = this.head;
			this.head = oldHead.next;
			oldHead.next = null;
			this.length--;
			return oldHead;
		}
	}

	unshift(a, b, c, d) {
		var newOrder = new Order(a, b, c, d);
		if (this.length === 0) {
			this.head = newOrder;
			this.tail = newOrder;
		}
		else {
			newOrder.next = this.head;
			this.head = newOrder;
		}
		this.length++;
		return this;
	}

	remove(orderNumber) {
		var prev,
			removed,
			count;
		prev = this.head;
		removed = this.head;
		count = 0;
		while (removed.val['OrderNumber'] != orderNumber) {
			if (count >= this.length) return undefined;
			prev = removed;
			removed = removed.next;
			count++;
		};
		if (count == this.length - 1) return this.pop();
		if (count == 0) return this.shift();
		prev.next = removed.next;
		removed.next = null;
		this.length--;
		return removed;
	}

	insert(a, b, c, d) {
		if (this.length == 0) return this.push(a, b, c, d);
		if (c >= this.tail.val['DeliveryDate']) return this.push(a, b, c, d);
		if (c <= this.head.val['DeliveryDate']) return this.unshift(a, b, c, d);

		var newOrder = new Order(a, b, c, d);
		var before,
			current,
			count;
		current = this.head.next;
		before = current.next
		count = 2;
		while (!((c >= current.val['DeliveryDate']) && (c < before.val['DeliveryDate']))) {
			if (count == this.length - 1) break;
			current = current.next;
			before = current.next;
			count++;
		};
		current.next = newOrder;
		newOrder.next = before;
		this.length++;
		return this;
	}
}

var customers = new Customer();

function drawEmpty(top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '700')
	tag.setAttribute('height', '300')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')

	element = document.getElementById('container');
	element.appendChild(tag);
}

function drawOrderList(quantity, top, left) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '70')
	tag.setAttribute('height', '16')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + '#ffffcc' + '; position: absolute')
	
	var context = tag.getContext("2d");
    context.fillStyle = "black";
    context.font = "bold 12px Arial";
    context.fillText(quantity, (tag.width / 2) - 27, (tag.height / 2) + 1);

	element = document.getElementById('container');
	element.appendChild(tag);
}

function createOrderList() {
	var customer_code = document.getElementById('customer_code_order1_input').value.toString();
	var orderList = customers.showCustomerOrder(customer_code);
	var top = 175;
	drawEmpty(175, 65)
	for (let node of orderList) {
		drawOrderList(customer_code, top, 65);
		var left = 210;
		for (let key in node) {
			drawOrderList(node[key], top, left);
			left += 130;
		};
		top += 20;
	}
}

function drawRemoveOrder() {
	var customer_code = document.getElementById('customer_code_order1_input').value.toString();
	var order_number = document.getElementById('order1_number_input').value.toString();
	customers.removeCustomerOrder(customer_code, order_number);
	createOrderList();
}

function addOrder() {
	var customer_code_order = document.getElementById('customer_code_order_input').value.toString();
	var order_number = document.getElementById('order_number_input').value.toString();
	var order_date = document.getElementById('order_date_input').value.toString();
	var ship_date = document.getElementById('ship_date_input').value.toString();
	var totalAmount = document.getElementById('amount_input').value.toString();
	customers.addCustomerOrder(customer_code_order, order_number, order_date, ship_date, totalAmount);
}

function addCustomer() {
	var customer_code = document.getElementById('customer_code_input').value.toString();
	var customer_address = document.getElementById('customer_address_input').value.toString();
	var customer_details = document.getElementById('customer_details_input').value.toString();
	customers.addCustomerInfo(customer_code, customer_address, customer_details);
}

function resetPrograms() {
	location.reload();
}

function init() {
	var add_customer = document.getElementById('add_customer_button');
	add_customer.onclick = addCustomer;

	var add_order = document.getElementById('add_order_button');
	add_order.onclick = addOrder;

	var order_list = document.getElementById("order_list_button");
	order_list.onclick = createOrderList;

	var remove_order = document.getElementById("remove_order_button");
	remove_order.onclick = drawRemoveOrder;

	var resetButton = document.getElementById('reset_button');
	resetButton.onclick = resetPrograms;
}

window.onload = init;



