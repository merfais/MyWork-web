var userInfoModule = angular.module("UserInfoModule", []);
//双向数据绑定
userInfoModule.controller("UserInfoCtrl", ["$scope", function($scope) {
	//设置数据的初始值
	$scope.userInfo = {
		email: "23654@163.com",
		password: "123456",
		autoLogin: true
	};
	//获取数据值，form提交时使用
	$scope.getFormData = function() {
		console.log($scope.userInfo);
	};
	//设置数据值，拉取数据后review到页面
	$scope.setFormData = function() {
		$scope.userInfo = {
			email: "nihao@163.com",
			password: "789456",
			autoLogin: false
		};
	};
	//重置数据值
	$scope.resetFormData = function() {
		$scope.userInfo = {
			email: "23654@163.com",
			password: "123456",
			autoLogin: true
		};
	};
}]);
//指令的用法，repalce和template通用用法
userInfoModule.directive("hello", function() {
	return {
		restrict: "EACM", //E通常用于首次编写模板，A通常用于已完成代码的后加功能的编写
		template: "<div class='div'>指令测试第一次</div>",
		replace: true
	}
});
//指令用法。repalce和templateUrl用法，使用url替换方式，url地址是代码的片段html文件
userInfoModule.directive("tturl", function() {
	return {
		restrict: "EACM",
		templateUrl: "tpls/tpl01.html",
		replace: true
	}
});
//指令用法。repalce和templateCache用法，使用模板缓存机制，可以使用set，get多次复用模板
//run函数，在页面加载完成后只执行一次。
userInfoModule.run(function($templateCache) {
	$templateCache.put("ttt.html", "<div class='div'>缓存模板的复用机制,这部分是编写的复用模板</div>")
});
userInfoModule.directive("ttt", function($templateCache) {
	return {
		restrict: "E",
		template: $templateCache.get("ttt.html"),
		repalce: true
	}
});
//指令用法。repalce和template.嵌套内容的使用机制，使用ng-transclude
userInfoModule.directive("tran", function() {
	return {
		restrict: "EACM",
		transclude: true,
		template: "<div class='div'>这是替换的内容,<div class='div' ng-transclude></div></div>"
	}
});
//指令中的link使用，和控制器的配合使用
userInfoModule.controller("LinkCtrl1", ["$scope", function($scope) {
	$scope.loadData1 = function() {
		console.log("数据加载中、、、、11111");
	}
}]);
//对于多个控制器的时候，指令的复用方式就是将控制器的函数，写入到指令的属性中。
//在属性中调用控制器的方法，再在指令里调用属性的方式。
userInfoModule.controller("LinkCtrl2", ["$scope", function($scope) {
	$scope.loadData2 = function() {
		console.log("数据加载中、、、、22222");
	}
}]);
userInfoModule.directive("linktest", function() {
	return {
		restrict: "AE",
		link: function(scope, element, attrs) {
			//对于指令内的事件的绑定和调用
			element.on("mouseenter", function() {
				//scope.loadData();
				//scope.$apply("loadData1()");	//对于指令内的事件的绑定和调用

				//使用attribute属性，绑定属性级别的事件，
				//来实现同一指令完成不同控制器中的函数调用。
				//每个控制器下的元素，使用属性绑定函数的方式，	attr="func()"
				//在指令里调用这个属性,$apply(attr.func)
				scope.$apply(attrs.fooattr); //这里用一个坑，函数名要全部小写，不能使用驼峰式
				//也不能是函数调用的方式，要使用属性的方式
			});
		}
	}
});
//指令中的controller的使用，
//controller中的方法和属性会暴露在外面，供外部调用
//link中的只能内部使用，
//所以一般公用的方法写到controller中，私有的方法写到link中
userInfoModule.directive("superman", function() {
	return {
		scope: {}, //独立的作用域
		restrict: "E",
		controller: function($scope) {
			$scope.abilities = []; //暴露外边的属性
			this.AddSpeed = function() { //暴露外边的三个方法
				$scope.abilities.push("speed");
			};
			this.AddPower = function() {
				$scope.abilities.push("power");
			}
			this.AddLight = function() {
				$scope.abilities.push("light");
			}
		},
		link: function(scope, element, attrs) { //通常做一些事件的绑定
			element.on("mouseenter", function() { //，不公用的方法
				console.log(scope.abilities);
			}).addClass("btn btn-default"); //增加样式之类的逻辑
		}
	}
});
//依赖指令的使用方式。同过调用依赖的指令的外部方法（controller）来实现指令间的配合
userInfoModule.directive("speed", function() {
	return {
		require: "^superman", //当出现require这个参数时，即使用依赖的指令，
		link: function(scope, element, attrs, supermanCtrl) { //出现第四个参数，依赖指令
			supermanCtrl.AddSpeed(); //依赖的指令中的controller暴露在外的方法属性均可使用，
		}
	}
});
userInfoModule.directive("power", function() {
	return {
		require: "^superman",
		link: function(scope, element, attrs, supermanCtrl) {
			supermanCtrl.AddPower();
		}
	}
});
userInfoModule.directive("light", function() {
	return {
		require: "^superman",
		link: function(scope, element, attrs, supermanCtrl) {
			supermanCtrl.AddLight();
		}
	}
});
//独立作用域，独立作用域的数据绑定
userInfoModule.directive("duli", function() {
	return {
		scope: {
			/*
			 * 单向数据绑定，
			 * 绑定的为指令中的属性，和替换文本中的值
			 * 在控制器中为属性设置值，在替换的文档中展现此值
			 */
			dulivalue: "@"
		},
		restrict: "E",
		template: "<div><input type='text' ng-model='dulivalue' />{{dulivalue}}</div>",
		replace: true,
		//link: function(scope, element, attrs) {
		//	scope.dulivalue = attrs.flavor;
		//}
	}
});
userInfoModule.directive("dulioto", function() {
	return {
		scope: {
			dulivalue1: "=", //双向数据绑定
		},
		template: "<div><input type='text' ng-model='dulivalue1' />{{dulivalue1}}</div>",
		replace: true
	}
});
userInfoModule.directive("greeting", function() {
	return {
		restrict: "E",
		template: "<input type='text' ng-model='userName' />" +
			"<button class='btn btn-defualt' ng-click='greet({name:userName})'>控制台打印</button><br/>",
		scope: {
			greet:"&"
		}
	}
});

userInfoModule.controller("duliCtrl", ["$scope", function($scope) {
	$scope.flavor = "百威";
	$scope.flavor1 = "可乐";
	$scope.sayHello = function(name) {
		console.log(name);
	}
}]);