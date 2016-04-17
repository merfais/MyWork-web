window.onload = function () {
	var navJD = document.getElementById("navJD");
	var lis = navJD.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseover = function () {
				this.className ="lihover";
		};
		lis[i].onmouseout = function () {
			this.className = "";
		};
	}	
}