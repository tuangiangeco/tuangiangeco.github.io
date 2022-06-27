// Cac bien chinh cua chuong trinh
var points = [];
var k = 0;
var clusters = [];
var colors = ['red','green','blue','#993333','purple','#003366','orange','#003300','#ff0066'];
var labels = [];
var error = 0;

// Ham tinh khoang cach
function distance(div1, div2) {
	return Math.sqrt((div2[0]-div1[0]) * (div2[0]-div1[0]) + (div2[1]-div1[1]) * (div2[1]-div1[1]))
}

// Ham ve diem
function drawPoint(top, left, color) {
	var tag = document.createElement('canvas');
	tag.setAttribute('width', '10')
	tag.setAttribute('height', '10')
	tag.setAttribute('style', 'top: ' + top + 'px' + '; left: ' + left + 'px; background-color: ' + color + '; position: absolute')
	element = document.getElementById('container');
	element.appendChild(tag);
}

// Ham ve cluster
function drawCluster(i, top, left, color) {
		var tag = document.createElement('canvas');
		tag.setAttribute('id', 'cluster' + i.toString());
		tag.setAttribute('width', '10');
		tag.setAttribute('height', '10');
		tag.setAttribute('style', 'top: ' + top.toString() + 'px' + '; left: ' + left.toString() + 'px; background-color: ' + color + '; position: absolute');
		element = document.getElementById('container');
		element.appendChild(tag);
}

// Ham xoa Clusters
function removeClusters() {
	try {
		for (i = 0; i < k; i++) {
			elementTag = document.getElementById('cluster' + i.toString());
			elementTag.remove();	
		}
	} catch {
		console.log('No cluster');
	}
}

// Ham tao cac diem khi click vao man hinh
function createPoints() {
	point = []
	color = 'black'

	var x = event.clientX - 150;
	var y = event.clientY - 60;

	point.push(x);
	point.push(y);
	points.push(point);

	var left = x.toString();
	var top = y.toString();

	drawPoint(top, left, color);
}

// Cong k
function addClusters() {
	k += 1;
	element = document.getElementById('knumber');
	element.innerHTML = 'K = ' + k.toString();
}

// Tru k
function minusClusters() {
	if (k > 0) {
		k -= 1;
		element = document.getElementById('knumber');
		element.innerHTML = 'K = ' + k.toString();
	}
}


// Random clusters
function randomClusters() {
	// Xoa clusters cu
	removeClusters();

	// Tao clusters moi
	clusters = [];
	for (var i = 0; i < k; i++) {
		cluster = []
		randomLeft = Math.floor(Math.random() * 640) + 50;
		randomTop = Math.floor(Math.random() * 520) + 50;

		cluster.push(randomLeft);
		cluster.push(randomTop);
		clusters.push(cluster);

		drawCluster(i, randomTop, randomLeft, colors[i])
	}
}

// Ham chay chuong trinh
function runPrograms() {
	// Xoa clusters cu
	removeClusters();

	// Tim khoang cach nho nhat cua 1 diem den cac Clusters
	var labels = [];
	for (var i = 0; i < points.length; i++) {
		distance_point_to_clusters = []
		for (var j = 0; j < clusters.length; j++) {
			distance_point_to_cluster = parseInt(distance(points[i], clusters[j]));
			distance_point_to_clusters.push(distance_point_to_cluster);
		}
		min_distance_point_to_cluster = Math.min(...distance_point_to_clusters); // với array phải thêm ... vào trước array để tìm min
		min_index = distance_point_to_clusters.indexOf(min_distance_point_to_cluster);
		labels.push(min_index)
	}

	// Thay doi toa do cua Cluster dua vao giua cac diem gan no nhat
	for (var i = 0; i < k; i++) {
		cluster_new = []
		var count = 0;
		var x_ps = 0;
		var y_ps = 0;
		for (var j = 0; j < labels.length; j++) {
			var labels_index = labels.at(j)
			if (labels_index == i) {
				count += 1;
				x_ps += points[j][0];
				y_ps += points[j][1];
			}
		}
		if (count > 0) {
			x_cluster_new = parseInt(x_ps/count);
			y_cluster_new = parseInt(y_ps/count);
			clusters[i][0] = x_cluster_new;
			clusters[i][1] = y_cluster_new;
		}
	}

	// Ve lai cac Cluster
	for (i = 0; i < k; i++) {
		drawCluster(i, clusters[i][1], clusters[i][0], colors[i])
	}

	// Ve lai cac diem
	for (i = 0; i < points.length; i++) {
		drawPoint(points[i][1], points[i][0], colors[labels[i]])
	}
}

// Tai lai trang
function resetPrograms() {
	location.reload();
}

function init() {
	var createPoint = document.getElementById('frame');
	createPoint.onclick = createPoints;

	var addCluster = document.getElementById('add');
	addCluster.onclick = addClusters;
	var minusCluster = document.getElementById('minus');
	minusCluster.onclick = minusClusters;

	var randomCluster = document.getElementById('random');
	randomCluster.onclick = randomClusters;

	var runProgram = document.getElementById('run');
	runProgram.onclick = runPrograms;

	var resetProgram = document.getElementById('reset');
	resetProgram.onclick = resetPrograms;
}

window.onload = init;
