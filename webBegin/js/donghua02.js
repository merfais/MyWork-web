/*
 同时运动
 参数1：需要运动的元素
 参数2：需要运动的样式及目标是，JSON{attribute：value}
 参数3：下一个运动的回调函数
 */
function move(time, obj, jsonAttrs, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for (var att in jsonAttrs) {
			var offset = 0;
			if (att == "opacity") {
				offset = Math.round(parseFloat(getStyle(obj, att)) * 100);
			} else {
				offset = parseInt(getStyle(obj, att));
			}
			if (offset != jsonAttrs[att]) {
				flag = false;
				var speed = (jsonAttrs[att] - offset) / 10;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if (att == "opacity") {
					obj.style.opacity = (offset + speed) / 100;
					obj.style.filter = "alpha(opacity:" + offset + speed + ")";
				} else {
					obj.style[att] = offset + speed + "px";
				}
			}
		}
		if (flag) {
			clearInterval(obj.timer);
			if (fn) { //第一个运动停止，开始第二个运动
				fn();
			}
		}
	}, time);
}
/*
  封装兼容浏览器，取得样式的函数
 */
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr]; //IE
	} else {
		return getComputedStyle(obj, null)[attr]; //firfox
		//参数列表分别为 需取得样式的元素，一个伪类字符串如“：after”，需要获取的样式字符串
		//对于第二个参数，没有时，使用null替代
		//第三个参数，可以使用getComputedStyle(obj, null).attr 方式。
		//对于如font-size这样的参数，使用fontSize获取，
		//其他如，border-Top-Width,也可以取到，但border不是所有浏览器都能适用;
	}
}

window.onload = function() {
	var oMove = document.getElementById("move");
	var aList = document.getElementsByTagName("a");
	for (var i = 0; i < aList.length; i++) {
//		aList[i].getElementsByTagName("i")[0].onmouseover = function(e) {
//			eventUtil.stopPropagation(eventUtil.getEvent(e));
//			//alert("1");
//		};
//		aList[i].getElementsByTagName("img")[0].onmouseover = function(e) {
//			eventUtil.stopPropagation(eventUtil.getEvent(e));
//			//alert("img");
//		};
//		aList[i].getElementsByTagName("p")[0].onmouseover = function(e) {
//			eventUtil.stopPropagation(eventUtil.getEvent(e));
//			//alert("p");
//		};
		aList[i].onmouseenter = function(e) {

			var that = this.getElementsByTagName("i")[0];
			move(5, that, {
				top: -60,
				opacity: 0
			}, function() {
				that.style.top = "60px";
				move(15, that, {
					top: 20,
					opacity: 100
				});
			});
		};
		
	}

}