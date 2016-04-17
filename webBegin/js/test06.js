window.onload = function() {
	var box = document.getElementById('divselect'),
		title = box.getElementsByTagName('cite')[0],
		menu = box.getElementsByTagName('ul')[0],
		as = box.getElementsByTagName('a'),
		index = -1;
	var tri = document.getElementById("triangle");
	var lists = menu.getElementsByTagName("li");
	var max = lists.length - 1;

	// 点击三角时
	title.onclick = titleClick;
	tri.onclick = titleClick;
	// 滑过滑过、离开、点击每个选项时
	// 执行脚本

	// 点击页面空白处时
	document.onclick = function() {
		menu.style.display = "none";
	}

	// 点击列表内容，选中
	for (var i = 0; i < lists.length; i++) {
		lists[i].onclick = listClick;
	}
	//键盘事件
	document.onkeydown = function(e) {
		e = e || window.event;
		if (menu.style.display == "block") {
			var oldIndex = index;	//上一个序号，更新背景色
			if (e.keyCode == 38) { //方向上
				index--;
				index = index < 0 ? max : index;

			} else if (e.keyCode == 40) { //方向下
				index++;
				index = index > max ? 0 : index;
			} else if(e. keyCode == 13){	//回车
				lists[index].click();
			}
			lists[index].style.background = "#807A62";
			lists[oldIndex].style.background = "";
		}else{
			title.click();
		}
	}


	document.onkeyup = keyup;
}

function titleClick(e) {
	var selectboard = document.getElementById("selectboard");
	if (selectboard.style.display == "block") {
		selectboard.style.display = "none";
	} else {
		selectboard.style.display = "block";
	}
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}

function listClick(e) {
	e = e || window.event;
	var txt = this.getElementsByTagName("a")[0].innerHTML;
	document.getElementById("title").innerHTML = txt;
	document.getElementById("selectboard").style.display = "none";
}



function keyup(e) {

}