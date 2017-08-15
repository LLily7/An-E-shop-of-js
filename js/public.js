//require(["jquery-1.11.3"],function() {
	$(function() {
		//首页
		//判断是否有用户登录
		//存储cookie名
		var $names = [];
		//存储用户cookie名
		var $ad_name = [];
		for(var i in $.cookie()) {
			$names.push(i);
			if(i.indexOf("ad_") == 0) {
				$ad_name.push(i);
			}
		}
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
				$(".van:nth-child(3)>a").text("登录").attr("href","mls_register.html");
			}
		}
		//console.log($ad_name);
		//点击退出登录
		$(".quit li:nth-child(2) a").click(function() {
			for(var i in $.cookie()) {
				//判断是否登录
				if(eval('(' + $.cookie(i) + ')').on_of == 1) {
					//$.removeCookie(i) || $.removeCookie(i,{expires:7,path:'/'});
					$.cookie(i,"{password:'" + eval('(' + $.cookie(i) + ')').password + "',on_of:'0'}");
					//console.log($.cookie(i));
					break;
				}
			}
			$(".van").css("display","block");
			$(".quit").css("display","none");
			$(".van").unbind();
			$(".van:nth-child(3)>a").text("登录").attr("href","mls_register.html");
			
		})
		//顶部菜单移入移出事件
		$(".over").mouseover(function() {
			$(this).children(".menu").css("display","block");
		})
		$(".over").mouseout(function() {
			$(this).children(".menu").css("display","none");
		})
		
		
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
			//获取轮播图图片
			//console.log(value.banner.length);
			for(var i = 0;i < value.banner.length;i ++) {
				$("<a href='javascript:;'></a>").appendTo($(".banner_img"));
				$("<img />").appendTo($(".banner_img a").eq(i));
				$(".banner_img a").eq(i).children().attr("src",value.banner[i].url);
			}
			//图片初始位置
			$(".banner_img a:eq(0)").css("left","0").siblings().css("left","1200px");
			//go导航
			//console.log(value.go[1].url);
			for(var i = 0;i < value.go.length;i ++) {
				$("<a href='javascript:;'></a>").append($("<img />").attr("src",value.go[i].url)).appendTo($(".go"));
			}
			//tit_c内容获取
			for(var i = 0;i < value.tit_c.length;i ++) {
				$(".tit_c>div:eq(0)>div>div").eq(i).children().eq(0).children().attr("src",value.tit_c[i].url);
				$(".tit_c>div:eq(0)>div>div").eq(i).children().eq(1).children().html(value.tit_c[i].collect);
				$(".tit_c>div:eq(0)>div>div").eq(i).children().eq(1).append(value.tit_c[i].price);
				$(".tit_c>div:eq(0)>div>div").eq(i).children().eq(2).append(value.tit_c[i].txt);
			}
			for(var i = 0;i < value.tit_c2.length;i ++) {
				$(".tit_c>div:eq(1)>div>div").eq(i).children().eq(0).children().attr("src",value.tit_c2[i].url);
				$(".tit_c>div:eq(1)>div>div").eq(i).children().eq(1).children().html(value.tit_c2[i].collect);
				$(".tit_c>div:eq(1)>div>div").eq(i).children().eq(1).append(value.tit_c2[i].price);
				$(".tit_c>div:eq(1)>div>div").eq(i).children().eq(2).append(value.tit_c2[i].txt);
			}
			//set数据获取
			for(var i = 0;i < value.set.length;i ++) {
				$(".set_box").eq(i).children().eq(0).children().attr("src",value.set[i].url);
				for(var k = 0;k < value.set[i].lit.length;k ++) {
					$(".set_box").eq(i).children().eq(1).children().eq(k).children().eq(0).attr("src",value.set[i].lit[k].url);
					$(".set_box").eq(i).children().eq(1).children().eq(k).children().eq(1).append(value.set[i].lit[k].price);
				}
			}
			//瀑布流
			for(var i = 0;i < value.linn.length;i ++) {
				//$("<div></div>").appendTo($(".linn_con li").eq(i % 5)).append($("<a href='javascript:;'></a>"));
				$("<img />").attr("src",value.linn[i].url).appendTo($("<a href='javascript:;'></a>").appendTo($("<div></div>").appendTo($(".linn_con li").eq(i % 5))));
				$("<span></span>").html(value.linn[i].collect).appendTo($("<p></p>").appendTo($(".linn_con li").eq(i % 5).children().eq(Math.floor(i / 5))));
				$(".linn_con li").eq(i % 5).children().eq(Math.floor(i / 5)).children().eq(1).append(value.linn[i].price);
				$("<a href='javascript:;'></a>").append(value.linn[i].txt).appendTo($(".linn_con li").eq(i % 5).children().eq(Math.floor(i / 5)));
			}
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
		$(".nav li:eq(0) a").removeClass().addClass("in");
		$(".nav li a").mouseover(function() {
			$(this).removeClass().addClass("in").siblings().removeClass().addClass("co");
		})
		$(".nav li a").mouseout(function() {
			$(".nav li a").addClass("co");
			$(".nav li:eq(0) a").removeClass().addClass("in");
		})
		//banner轮播图
		//轮播图导航
		$(".banner p a").addClass("cir");
		$(".banner p a:eq(0)").removeClass().addClass("rec");
		
		//console.log($(".banner_img a").length);
		//计时器轮播
		var index = 0;
		var timer;
		function auto() {
			clearInterval(timer);
			timer = setInterval(function() {
				move();
			},3000);
		}
		auto();
		//移入移出banner图控制计时器
		$(".banner_img").mouseover(function() {
			clearInterval(timer);
		});
		$(".banner_img").mouseout(function() {
			auto();
		});
		$(".banner>a").mouseover(function() {
			clearInterval(timer);
		});
		$(".banner>a").mouseout(function() {
			auto();
		});
		$(".banner p").mouseover(function() {
			clearInterval(timer);
		});
		$(".banner p").mouseout(function() {
			auto();
		});
		//点击轮播导航事件
		$(".banner p a").click(function() {
			if($(this).index() - index == 1) {
				$(".banner_img a").eq(index).animate({
					"left":"-1200px"
				},500);
				$(".banner_img a").eq($(this).index()).animate({
					"left":"0"
				},500);
				$(".banner_img a").eq(($(this).index() + 1) % 3).css("left","1200px");
				index = $(this).index();
			}
			else if(index - $(this).index() == 1) {
				$(".banner_img a").eq(index).animate({
					"left":"1200px"
				},500);
				$(".banner_img a").eq($(this).index()).animate({
					"left":"0"
				},500);
				$(".banner_img a").eq(($(this).index() + 2) % 3).css("left","-1200px");
				index = $(this).index();
			}
			else if($(this).index() - index == 2) {
				$(".banner_img a").eq($(this).index()).css("left","1200px");
				$(".banner_img a").eq(index).animate({
					"left":"-1200px"
				},500);
				$(".banner_img a").eq($(this).index()).animate({
					"left":"0"
				},500,function() {
					$(".banner_img a").eq(index).css("left","1200px");
					$(".banner_img a").eq((index + 1) % 3).css("left","-1200px");
					index = $(this).index();
				});
				
			}
			else {
				$(".banner_img a").eq($(this).index()).css("left","-1200px");
				$(".banner_img a").eq(index).animate({
					"left":"1200px"
				},500);
				$(".banner_img a").eq($(this).index()).animate({
					"left":"0"
				},500,function() {
					$(".banner_img a").eq(index).css("left","-1200px");
					$(".banner_img a").eq((index - 1) % 3).css("left","1200px");
					index = $(this).index();
				});
			}
			$(".banner p a").addClass("cir");
			$(".banner p a").eq($(this).index()).removeClass().addClass("rec");
		})
		//点击左右按钮切换banner图
		//开关(防止连续点击出现bug)
		var $in_off = 0;
		//左按钮
		$(".banner_l").click(function() {
			if(!$in_off) {
				$in_off = 1;
				$(".banner_img a").eq(index).animate({
					"left":"1200px"
				},500);
				index --;
				if(index < 0) {
					index = $(".banner_img a").length - 1;
				}
				$(".banner_img a").eq(index).animate({
					"left":"0"
				},500,function() {
					$in_off = 0;
				});
				$(".banner_img a").eq((index + 2) % 3).css("left","-1200px")
				$(".banner p a").addClass("cir");
				$(".banner p a").eq(index).removeClass().addClass("rec");
			}
		})
		//右按钮
		$(".banner_r").unbind("click").click(function() {
			move();
		})
		//轮播函数
		function move() {
			if(!$in_off) {
				$in_off = 1;
				$(".banner_img a").eq(index).animate({
					"left":"-1200px"
				},500);
				index ++;
				if(index == $(".banner_img a").length) {
					index = 0;
				}
				$(".banner_img a").eq(index).animate({
					"left":"0"
				},500,function() {
					$in_off = 0;
				});
				$(".banner_img a").eq((index + 1) % 3).css("left","1200px");
				$(".banner p a").addClass("cir");
				$(".banner p a").eq(index).removeClass().addClass("rec");
			}
		}
		
		//tit移入移出效果和点击效果
		var lick = 0;
		$(".tit ul li").eq(lick).removeClass().addClass("btm").siblings().removeClass().addClass("btm_n");
		$(".tit ul li a").mouseover(function() {
			$(this).parent().removeClass().addClass("btm");
			$(".tit a").click(function() {
				$(".tit_c>div").eq($(this).parent().index()).removeClass().addClass("day_s").siblings().removeClass().addClass("day_h");
				$(".tit ul li").eq($(this).parent().index()).removeClass().addClass("btm").siblings().removeClass().addClass("btm_n");
				lick = $(this).parent().index();
			})
		})
		
		$(".tit ul li a").mouseout(function() {
			$(".tit ul li").eq(lick).removeClass().addClass("btm").siblings().removeClass().addClass("btm_n");
		})
		
		//tit_c初始状态
		$(".tit_c>div").eq(0).removeClass().addClass("day_s");
		$(".tit_c>div").eq(1).removeClass().addClass("day_h");
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