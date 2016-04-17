window.onload = function() {
	pubuliu();
	//滚动条，滚动加载box
	//当滚动条滚动出最后一个box时，动态加载后续的box
	//通过比较最后一个box的offsettop值与滚动出去的距离(scrollTop+clientHeight)
	//scrollTop+clientHeight>box.offsetTop,则表示最有一个box已出现，开始动态加载
	window.onscroll = function() {
		 //模拟服务器数据，
		 //实际中只用AJAX技术，响应滚动事件，实时拉去服务器数据。
		var dataJson = {
			"data": [{}, {}, {}, {}, {}, {}]
		};
		var parent = document.getElementById("flow"); //获取容器父元素
		var boxs = getByClass(parent, "box"); //获取每一个box
		//获取最后一个box的距离顶部的偏移
		var lastBoxHeight = boxs[boxs.length - 1].offsetTop + Math.floor(boxs[boxs.length - 1].offsetHeight / 4);
		//获取滚动条滚动出的距离
		var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
		//获取文档的显示距离
		var clientH = document.body.clientHeight || document.documentElement.clientHeight;
		//如果滚动到最后一个box的1/4处，
		if (lastBoxHeight < scrollH + clientH) {
			//根据服务器返回的JSon数据，动态创建box
			for (var i = 0; i < dataJson.data.length; i++) {
				var box = boxs[0].cloneNode(true);	//克隆一个box
				//设置box的必要参数
				box.getElementsByTagName("img")[0].src = "img/img" + Math.floor(Math.random() * 20 + 1) + ".jpg";
				box.getElementsByTagName("img")[0].alt = "img/img" + Math.floor(Math.random() * 20 + 1) + ".jpg";
				parent.appendChild(box);	//添加到父容器中
			}
			//刷新瀑布流
			pubuliu();
		}
	}
	console.log(getByClass(document.getElementById("flow"), "box").length);
}

function getByClass(parent, clsName) {
	var arr = [];
	var eles = parent.getElementsByTagName("*"); //获得所有元素
	for (var i = 0; i < eles.length; i++) {
		if (eles[i].className.indexOf(clsName) != -1) { //如果class中包含clsName，压入数组
			arr.push(eles[i]);
		}
	}
	return arr;
}

function pubuliu() {
	var parent = document.getElementById("flow"); //获取容器父元素
	var boxs = getByClass(parent, "box"); //获取每一个box
	var col = Math.floor(parent.offsetWidth / boxs[0].offsetWidth); //获取box的列数
	//通过定义box的高度数组。并选择出高度最矮的那一列，
	//将下一个box放置其下面，同时更细此列的高度，
	//依次填充完毕
	var boxHArr = []; //定义box的高度数组。
	for (var i = 0; i < boxs.length; i++) { //遍历boxs数组
		if (i < col) { //在box列数内，压入box的第一行高度，即初始高度
			boxHArr.push(boxs[i].offsetHeight)
		} else {
			//从box列数值以外，即第二行开始，
			//计算box最列矮高度，作为下一个box的偏移top.
			var nextTop = Math.min.apply(null, boxHArr);
			//计算最矮列的列号index
			var nextIndex = boxHArr.indexOf(nextTop);
			//计算最矮列的左偏移，可以用列宽*列数，或者直接使用最矮列的offsetleft
			var nextLeft = boxs[i].offsetWidth * nextIndex; //boxs[i].offseLeft;
			//更新box高度数组
			boxHArr[nextIndex] += boxs[i].offsetHeight;
			//			boxs[i].style.position = "absolute";
			//			boxs[i].style.top = nextTop + "px";
			//			boxs[i].style.left = nextLeft + "px";
			//设置boxs[i]的样式表，使其绝对定位，top，left偏移
			boxs[i].style.cssText += ";position:absolute;top:" + nextTop + "px;left:" + nextLeft + "px;";

		}
	}
}

function autoFlow() {

}