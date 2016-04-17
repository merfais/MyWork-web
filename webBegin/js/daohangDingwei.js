$(function() {
	//滚动条发生滚动
	$(window).scroll(function() {
		//滚动条相对文档顶部的距离
		var top = $(window).scrollTop();
		//console.log(top);
		//获取content下面的所有item
		var items = $("#content").find(".item");
		var currentID = "";
		//遍历item，获取每个item相对文档顶部的距离
		items.each(function(index) {
			var t = $(this);
			//获取当前item相对顶部的距离
			var itemTop = t.offset().top;
			//console.log(index + "---" + itemTop);
			//如果滚动条相对文档顶部的距离大于当前item的距离，
			//说明当前item已经滑过文档顶部，
			//也就是当前item正处于顶部显示，
			//此时则更新当前的导航ID为当前的item
			if (top > itemTop - 200) {
				currentID = "#" + $(t).attr("id");
				//由于最后一个item的top值比较大，滚动条的top永远也不会大于这个数
				//所以单独做一个最后一个item的判定，来选中当前的item
				if (top > 1570) {
					currentID = "#item5";
				}
			} else { //对于itemTOP值大于滚动条的top的则不需要再做判定，直接返回，跳出循环
				return false;
			}
		});
		
		//遍历导航的每一个连接a，
		//增加hover时的样式。
		//判定文档滚动到了哪一个item下，
		//更新当前item的样式为选中状态。
		$("#menu").find("a").each(function() {
			var t = $(this);
			t.hover(function() {
						t.addClass("ahover");
					},
					function() {
						t.removeClass("ahover");
					});
				
			if (t.attr("href") == currentID) {
				t.addClass("current");
			} else if (currentID) {	//判定currentID是否是空值，
									//空值说明滚动条并未滚动出第一个item范围
									//不等于空，则移除其样式
				t.removeClass("current");
			}

		});

	});

})