window.onload = function() {
	var gundong = document.getElementById("gundong");
	gundong.innerHTML += gundong.innerHTML;

	//setTimeout(move(), delay);
	move();
}

function getStyle(obj, att) {
	if (obj.currentStyle) {
		return obj.currentStyle[att];
	} else {
		return getComputedStyle(obj, null)[att];
	}
}

function move() {
	var gundong = document.getElementById("gundong");
	var innerH = parseInt(getStyle(gundong.getElementsByTagName("a")[0], "height"));
	//var innerH = 24;
	var speed = 30;
	var delay = 1000;
	var timer = setInterval(function() {
		gundong.scrollTop++;
		if (gundong.scrollTop % innerH == 0) {
			clearInterval(timer);
			setTimeout(move, delay);
		}
		if (gundong.scrollTop >= gundong.scrollHeight / 2) {
			gundong.scrollTop = 0;
		}

	}, speed);
}

function startMove() {

}