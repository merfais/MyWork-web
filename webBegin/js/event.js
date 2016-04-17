
/*
 
 * addHandler中 handler 不能使用匿名函数，
 * 否则removeHandler 将无法移除绑定的事件handler
 * 
 * */
var eventUtil = {
	addHandler: function(elementer, typer, handler) {
		//element：元素，event：不使用on前缀的事件名，handler：事件处理程序
		if (elementer.addEventListener) { //DOM2级事件处理
			elementer.addEventListener(typer, handler, false);
		} else if (elementer.attachEvent) { //IE事件处理
			elementer.attachEvent("on" + typer, handler);
		} else { //DOM0级事件处理
			elementer["on" + typer] = handler;
			// element[“onclick”] === element.onclick
		}
	},
	removeHandler: function(elementer, typer, handler) {
		if (elementer.removeEventListener) {
			elementer.removeEventListener(typer, handler, false);
		} else if (elementer.detachEvent) {
			elementer.detachEvent("on" + typer, handler);
		} else {
			elementer["on" + typer] = null;
		}
	},
	getEvent: function(e) {
		return e ? e : window.event;
	},
	getElement: function(e) {
		return e.target || e.srcElement;
	},
	getType: function(e) {
		return e.type;
	},
	preventDefault: function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
}

