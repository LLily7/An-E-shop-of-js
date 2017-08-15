//require(["jquery-1.11.3"],function() {
	$(function() {
		//首页
		//顶部菜单移入移出事件
		$(".over").mouseover(function() {
			$(this).children(".menu").css("display","block");
		})
		$(".over").mouseout(function() {
			$(this).children(".menu").css("display","none");
		})
		for(var i in $.cookie()) {
			//判断是否登录
			if(eval('(' + $.cookie(i) + ')').on_of == 1) {
				$(".van").css("display","none");
				$(".van:nth-child(3)").css("display","block").children("a").text(i.replace("ad_","")).attr("href","javascript:;");
				//账号下拉菜单
				$(".van").hover(function() {
					$(".quit").css("display","block");
				},function() {
					$(".quit").css("display","none");
				})
				break;
			}else {
				$(".van").css("display","block");
				$(".van:nth-child(3) a").text("登录");
			}
		}
		//点击退出登录
		$(".quit li:nth-child(2) a").click(function() {
			for(var i in $.cookie()) {
				//判断是否登录
				if(eval('(' + $.cookie(i) + ')').on_of == 1) {
					//$.removeCookie(i) || $.removeCookie(i,{expires:7,path:'/'});
					$.cookie(i,"{password:'" + eval('(' + $.cookie(i) + ')').password + "',on_of:" + "'0'}");
					break;
				}
			}
			$(".van").css("display","block");
			$(".quit").css("display","none");
			$(".van").unbind();
			$(".van:nth-child(3)>a").text("登录").attr("href","mls_register.html");
			
		})
		//滚动事件
		window.onscroll = function() {
			var top = document.body.scrollTop || document.documentElement.scrollTop;
			//document.title = top + ";" + window.innerHeight;
			//console.log(top);
			if(top > 0) {
				$(".gotop").css("display","block");
			}else {
				$(".gotop").css("display","none");
			}
		}
		//置顶按钮移入移出效果
		$(".gotop").mouseover(function() {
			$(this).css("background","#f36");
			$(this).children().attr("src","../img/header/mls_r7h.png");
		})
		$(".gotop").mouseout(function() {
			$(this).css("background","#f8f8f8");
			$(this).children().attr("src","../img/header/mls_r7.png");
		})
		//点击置顶
		$(".gotop").click(function() {
			$('html,body').animate({scrollTop:'0'}, 300);
			/*
			var i = 1;
			var time = setInterval(function() {
				var top = document.body.scrollTop || document.documentElement.scrollTop;
				document.body.scrollTop = top - i;
				i ++;
				if (top <= 0) {
					clearTimeout(time);
					return true;
				}
			},1)
			*/
		})
		
		//宝贝，店铺点击事件和初始状态
		$(".seek p:eq(0) a").addClass("noclick");
		$(".seek p:eq(0) a:eq(0)").removeClass().addClass("click");
		$(".seek p:eq(0) a").click(function() {
			$(this).removeClass().addClass("click").siblings().removeClass().addClass("noclick");
		})
		//搜索框jsonp
		$("<script></script>").attr("name","seek").appendTo($("head"));
		$("#key").keyup(function() {
			$("script[name='seek']").remove();
			var $sc = $("<script></script>");
			$sc.attr("name","seek");
			$sc.attr("src","https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + this.value + "&cb=fn");
			$sc.appendTo($("head"));
			if(this.value != "") {
				$("#menu").css("display","block");
			}
		})
		//搜索框失焦
		$("#key").blur(function() {
			$("#menu").css("display","none");
		})
		//搜索框得焦
		$("#key").focus(function() {
			if(this.value != "") {
				$("#menu").css("display","block");
			}
		})
		
		//nav导航条移入移出事件和初始状态
		$(".nav li a").addClass("co");
		$(".nav li:eq(1) a").removeClass().addClass("in");
		$(".nav li a").mouseover(function() {
			$(this).removeClass().addClass("in").siblings().removeClass().addClass("co");
		})
		$(".nav li a").mouseout(function() {
			$(".nav li a").addClass("co");
			$(".nav li:eq(1) a").removeClass().addClass("in");
		})
		
		//option点击事件
		$(".option ul li a").click(function() {
			if($(this).parent().index() == 0) {
				$(this).css({"border-right":"1px #e1e1e1 solid","background":"#fff"}).parent().siblings().children().css({"border":"none","background":"none"});
			}else {
				$(this).css({"border-left":"1px #e1e1e1 solid","border-right":"1px #e1e1e1 solid","background":"#fff"}).parent().siblings().children().css({"border":"none","background":"none"});
			}
		})
		
		//瀑布流
		$.getJSON("../js/data.json",function(value) {
			//临时插图
			$("<img />").attr("src",value.moment[0].url).appendTo($(".moment a"));
			//左侧广告
			$("<a href='javascript:;'></a>").appendTo($(".fixed_l"));
			$("<img />").attr("src",value.left[0].url).css("float","right").appendTo($(".fixed_l a"));
			$("<a href='javascript:;'></a>").appendTo($(".fixed_l"));
			$("<img />").attr("src",value.left[1].url).css({"float":"left","margin-top":"24px"}).appendTo($(".fixed_l a:eq(1)"));
			//点击隐藏广告
			$(".fixed_l a:eq(0)").click(function() {
				$(".fixed_l").css("display","none");
			})
			
			//搜索框下方菜单
			//console.log(value.seek_b.length);
			for(var i = 0;i < value.seek_b.length;i ++) {
				$("<a href='javascript:;'></a>").html(value.seek_b[i].menu).appendTo($(".seek p:eq(2)"));
				if(/["春"|"衬"|"白"]/g.test(value.seek_b[i].menu)) {
					$(".seek p:eq(2) a").eq(i).css("color","#f36");
				}
			}
			
			for(var i = 0;i < value.linn.length;i ++) {
				//$("<div></div>").appendTo($(".linn_con li").eq(i % 5)).append($("<a href='javascript:;'></a>"));
				$("<img />").attr("src",value.linn[i].url).appendTo($("<a href='javascript:;'></a>").appendTo($("<div></div>").appendTo($(".linn_con li").eq(i % 5))));
				$("<span></span>").html(value.linn[i].collect).appendTo($("<p></p>").appendTo($(".linn_con li").eq(i % 5).children().eq(Math.floor(i / 5))));
				$(".linn_con li").eq(i % 5).children().eq(Math.floor(i / 5)).children().eq(1).append(value.linn[i].price);
				$("<a href='javascript:;'></a>").append(value.linn[i].txt).appendTo($(".linn_con li").eq(i % 5).children().eq(Math.floor(i / 5)));
			}
			
			//按价格排序
			var $default = [];
			
			for(var i = 0;i < $(".linn_con li").eq(i).children().length;i ++) {
				//console.log($(".linn_con li").eq(i).children().length);
				for(var k = 0;k < $(".linn_con li").length;k ++) {
					$default[i * $(".linn_con li").length + k] = $(".linn_con li").eq(k).children().eq(i);
				}
			}
			//console.log($default.length);
			//点击流行恢复默认排序
			$("#fashion").click(function() {
				$(".linn_con div").remove();
				for(var i = 0;i < $default.length;i ++) {
					$(".linn_con li").eq(i % 5).append($default[i]);
				}
				if($(".linn_con li div").length == 0) {
					$(".linn>div").css("display","block");
				}else {
					$(".linn>div").css("display","none");
				}
			})
			//从低到高排序
			$("#l_h").click(function() {
				var $sort = [];
				var $money = [];
				//console.log($(".linn_con div").length);
				for(var i = 0;i < $(".linn_con div").length;i ++) {
					$sort[i] = $(".linn_con div").eq(i);
					$money[i] = $sort[i].children("p").contents().filter(function() {return this.nodeType == 3;}).text().replace(/￥+/g,"");
				}
				
				$money.sort(function(a,b) {
					return a - b;
				})
				//console.log($sort);
				//console.log($money);
				$(".linn_con div").remove();
				for(var i = 0;i < $money.length;i ++) {
					for(var k = 0;k < $sort.length;k ++) {
						if($money[i] == $sort[k].children("p").contents().filter(function() {return this.nodeType == 3;}).text().replace(/￥+/g,"")) {
							$(".linn_con li").eq(i % 5).append($sort[k]);
							$sort.splice(k,1);
							break;
						}
					}
				}
				if($(".linn_con li div").length == 0) {
					$(".linn>div").css("display","block");
				}else {
					$(".linn>div").css("display","none");
				}
			})
			//从高到低排序
			$("#h_l").click(function() {
				var $sort = [];
				var $money = [];
				//console.log($(".linn_con div").length);
				for(var i = 0;i < $(".linn_con div").length;i ++) {
					$sort[i] = $(".linn_con div").eq(i);
					$money[i] = $sort[i].children("p").contents().filter(function() {return this.nodeType == 3;}).text().replace(/￥+/g,"");
				}
				
				$money.sort(function(a,b) {
					return b - a;
				})
				$(".linn_con div").remove();
				for(var i = 0;i < $money.length;i ++) {
					for(var k = 0;k < $sort.length;k ++) {
						if($money[i] == $sort[k].children("p").contents().filter(function() {return this.nodeType == 3;}).text().replace(/￥+/g,"")) {
							$(".linn_con li").eq(i % 5).append($sort[k]);
							$sort.splice(k,1);
							break;
						}
					}
				}
				if($(".linn_con li div").length == 0) {
					$(".linn>div").css("display","block");
				}else {
					$(".linn>div").css("display","none");
				}
			})
			//求最小高度
			function min(obj) {
				var mh = obj.eq(0).height();
				var z = 0;
				for(var k = 0;k < obj.length;k ++) {
					if(mh > obj.eq(k).height()) {
						mh = obj.eq(k).height();
						z = k;
					}
				}return z;
			}
			//点击确定筛选范围内商品
			$("#scope").click(function() {
				if($("#small").val() * 100 <= $("#big").val() * 100) {
					var $sort = [];
					for(var i = 0;i < value.linn.length;i ++) {
						var $div = $("<div></div>");
						$("<img />").attr("src",value.linn[i].url).appendTo($("<a href='javascript:;'></a>").appendTo($div));
						$("<span></span>").html(value.linn[i].collect).appendTo($("<p></p>").appendTo($div));
						$div.children().eq(1).append(value.linn[i].price);
						$("<a href='javascript:;'></a>").append(value.linn[i].txt).appendTo($div);
						$sort[i] = $div;
					}
					$(".linn_con div").remove();
					for(var i = 0;i < $sort.length;i ++) {
						if($sort[i].children("p").contents().filter(function() {return this.nodeType == 3;}).text().replace(/￥+/g,"") * 100 >= $("#small").val() * 100 && $sort[i].children("p").contents().filter(function() {return this.nodeType == 3;}).text().replace(/￥+/g,"") * 100 <= $("#big").val() * 100) {
							//console.log(min($(".linn_con li")));
							$(".linn_con li").eq(min($(".linn_con li"))).append($sort[i]);
							$sort.splice(i,1);
							i --;
						}
					}
					if($(".linn_con li div").length == 0) {
						$(".linn>div").css("display","block");
					}else {
						$(".linn>div").css("display","none");
					}
				}else {
					$(".linn>div").css("display","block");
				}
			})
		})
		
	})
	
//})
function fn(str) {
	var ul = document.getElementById("menu");
	ul.innerHTML = "";
	for(var i = 0;i < str.s.length;i ++) {
		var oA = document.createElement("a");
		oA.href = "javascript:;";
		oA.style.boxSizing = "border-box";
		oA.style.paddingLeft = "10px";
		oA.style.display = "block";
		oA.style.width = "100%";
		oA.style.fontSize = "12px";
		oA.style.height = "24px";
		oA.style.lineHeight = "24px";
		//li.style.listStyle = "none";
		oA.innerHTML = str.s[i];
		//li.appendChild(oA);
		ul.appendChild(oA);
	}
}