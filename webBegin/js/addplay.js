//$(function() {
//
//})
//
//window.onload = function() {
//	//leftInit();
//}

(function() {
	var wrapBox = $("#addwrap"), //最外层div标签，包裹<ul>img*n</ul><ul>序号</ul><a>向前</a><a>向后</a>
		picBox = wrapBox.find(".pics"), //包裹li>img的ul标签，图片层
		picArray = picBox.find("li"), //包含img的li标签
		listBox = wrapBox.find(".list"), //包裹li的ul标签，列表层
		listArray, //列表的li标签，动态生成，此处不赋值
		timer = null, //自动运转的定时器
		duration = 1000, //过渡效果使用的时间
		interval = 3000, //自动运转定时器时间间隔
		activeIndex = -1, //当前显示的图层序号
		total = picArray.length; //图层的总数

	/*
	 * 初始化一些参数
	 */
	function initPlay() {
		$.each(picArray, function(index, item) { //遍历图层，增加列表序号
			listBox.append("<li></li>"); //逐个增加列表
		});
		listArray = listBox.find("li"); //给列表赋值
		listArray.eq(-1).addClass("list-active"); //初始当前序号为最后一个
		picArray.css({ //通过修改pic的样式，以达到显示效果，兼容各个效果，所以特殊样式由js动态修改
			"position": "absolute", //层叠各个图层，效果使用渐入渐出
			"left": "0px", //滑入滑出效果，需要float属性
			"top": "0px", //
		}).eq(-1).addClass("pic-active"); //初始当前图层为最后一个

		/*
		 * 增加事件函数
		 */
		wrapBox.on("click", ".list li", function() { //点击列表序号事件，显示指定序号的图层
			if (!$(this).hasClass("list-active")) {
				show($(this).index());
			}
		}).on("click", ".prev", function() { //点击上一张图片事件
			prev();
		}).on("click", ".next", function() { //点击下一张图片事件
			next();
		}).on("mouseover", function() { //鼠标悬停在图层区域，最外层div，停止动画效果
			if (timer) {
				clearInterval(timer);	//清除定时器，动画停止
			}
		}).on("mouseout", function() { //鼠标移出图层区域，开始动画
			autoPlay();
		});
	}

	/*
	 * 显示某个图层
	 * 参数：index图层的序号
	 */
	function show(index) {
		picArray.stop(true, true); //停止图层上的所有动画，再执行以下的动画，防止闪屏白屏
		var cur = picBox.find(".pic-active"); //获取活动图层，更新index层后，隐藏此图层
		//index图层，显示动画
		picArray.eq(index).css({ //先设置初始样式，再过渡动画
			"opacity": "0",
			"display": "list-item"
		}).animate({
			"opacity": "1" //透明度0.5-1
		}, duration).addClass("pic-active"); //更新当前图层样式标示
		//上一个活动图层，隐藏动画
		cur.animate({
			"opacity": "0" //透明度1-0，切换前透明度肯定=1，显示=list-iten
		}, duration, function() { //透明度更新完毕，再显示=none，防止图层闪现和白屏。
			$(this).css("display", "none");
		}).removeClass("pic-active"); //移出上一个图层样式标示
		//更新列表样式，设施当前列表
		listArray.removeClass("list-active").eq(index).addClass("list-active");
		activeIndex = index; //更新当前图层序号
	}

	/*
	 * 上一个图层响应函数
	 */
	function prev() {
		//活动index-1=前一个index，可能产生负数，防止越界+total后%total
		activeIndex = (activeIndex + total - 1) % total;
		show(activeIndex); //调用显示
	}
	/*
	 * 下一个图层响应函数
	 */
	function next() {
		//活动index+1=下一个index，不存在越界直接%total
		activeIndex = (activeIndex + 1) % total;
		show(activeIndex); //调用显示
	}
	/*
	 * 自动播放函数
	 */
	function autoPlay() {
		if (timer) {
			clearInterval(timer); //清除timer
		}
		timer = setInterval(function() {
			next();
		}, interval);
	}

	initPlay();
	next(); //初始值为最后一个，先动画到第一个，再自动播放
	//目的：直接自动播放，由于默认活动图层没有过渡效果，
	//播放时，第一次过渡会出现闪现，或白屏
	autoPlay();
})();