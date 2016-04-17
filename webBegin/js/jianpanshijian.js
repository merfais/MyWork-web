var data = ["iphone5", "Ipad", "sumsong", "canol", "hp", "thank you", "50RMB", "100RMB"],
	timer = null,
	flag = true;
window.onload = function() {

	var play = document.getElementById("play"),
		stop = document.getElementById("stop");
	//开始抽奖
	play.onclick = playFun;
	//停止抽奖
	stop.onclick = stopFun;
	// 键盘事件
	document.onkeyup = function(e) {
		e = e || window.event;
		if (e.keyCode == 13) {	//回车事件
			if (flag) {
				playFun();
			} else {
				stopFun();
			}
		}
	}
}

function playFun() {
	clearInterval(timer);
	timer = setInterval(function() {
		var title = document.getElementById("title");
		var random = Math.floor(Math.random() * data.length);
		title.innerHTML = data[random];
	}, 50);
	document.getElementById("play").style.background = "#999";
	flag = false;
}

function stopFun() {
	clearInterval(timer);
	document.getElementById("play").style.background = "#003366";
	flag = true;
}