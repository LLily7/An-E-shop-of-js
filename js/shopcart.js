$(function() {
	//顶部菜单移入移出事件
	$(".over").mouseover(function() {
		$(this).children(".menu").css("display","block");
	})
	$(".over").mouseout(function() {
		$(this).children(".menu").css("display","none");
	})
	//$.cookie("shop_示例","{id:'店铺',name:'商品1',color:'黑色',size:'均码',price:'66.66',num:'6',url:'../img/shopcart/shop_1.png'}");
	//获取头部标题商品数量
	//存储cookie名
	//console.log($.cookie());
	var $names = [];
	//存储商品cookie名
	var $shop_name = [];
	for(var i in $.cookie()) {
		$names.push(i);
		if(i.indexOf("shop_") == 0) {
			$shop_name.push(i);
		}
	}
	for(var i in $.cookie()) {
		//判断是否登录
		if(eval('(' + $.cookie(i) + ')').on_of == 1) {
			$(".van").css("display","none");
			$(".van:nth-child(1)").css("display","block").children("a").text(i.replace("ad_","")).attr("href","javascript:;");
			//账号下拉菜单
			$(".van").hover(function() {
				$(".quit").css("display","block");
			},function() {
				$(".quit").css("display","none");
			})
			break;
		}else {
			$(".van").css("display","block");
			$(".van:nth-child(1) a").text("登录");
			$(".caption").css("display","none");
			$(".total").css("display","none");
			$(".shop_con").css("display","none");
			$(".con").css("display","block");
		}
	}
	//console.log($.cookie());
	//console.log($names);
	//console.log($shop_name);
	//点击退出登录
	$(".quit li:nth-child(2) a").click(function() {
		for(var i in $.cookie()) {
			//判断是否登录
			if(eval('(' + $.cookie(i) + ')').on_of == 1) {
				//$.removeCookie(i) || $.removeCookie(i,{expires:7,path:'/'});
				$.cookie(i,"{password:'" + eval('(' + $.cookie(i) + ')').password + "',on_of:" + "'0'}");
				$(".caption").css("display","none");
				$(".total").css("display","none");
				$(".shop_con").css("display","none");
				$(".con").css("display","block");
				$(".cart>div").removeClass().addClass("menu");
				$(".cart ul").removeClass();
				break;
			}
		}
		$(".van").css("display","block");
		$(".quit").css("display","none");
		$(".van").unbind();
		$(".van:nth-child(1)>a").text("登录").attr("href","mls_register.html");
		
	})
	//判断有没有商品
	if($shop_name.length == 0) {
		$(".caption").css("display","none");
		$(".total").css("display","none");
		$(".shop_con").css("display","none");
		$(".con").css("display","block");
		$(".cart>div").removeClass().addClass("menu");
		$(".cart ul").removeClass();
	}else {
		$(".caption li:nth-child(1) a span").html($shop_name.length);
		$(".caption").css("display","flex");
		$(".total").css("display","flex");
		$(".shop_con").css("display","block");
		$(".con").css("display","none");
		$(".cart ul").removeClass().addClass("menu");
		$(".cart>div").removeClass();
		//获取cookie数量
		//console.log(Object.keys($.cookie()).length);
		//动态创建购物车
		$("<div class='shop_t'></div>").appendTo($("<div class='store'></div>").appendTo($("<div class='shop_all'></div>").appendTo($(".shop_con"))));
		$("<span> 店铺：</span>").css("color","#666").prepend($("<input type='checkbox' class='store_t' />")).appendTo($("<p></p>").appendTo($(".shop_t")));
		$("<a href='javascript:;'></a>").appendTo($(".shop_t p:nth-child(1)"));
		$("<a href='javascript:;'> 联系客服</a>").appendTo($(".shop_t p:nth-child(1)"));
		for(var i = 0;i < $shop_name.length;i ++) {
			$(".shop_t p:nth-child(1) a").eq(0).text($shop_name[i].replace("shop_",""));
		}
		$("<span>99元任选3件</span>").appendTo($("<p></p>").appendTo($(".shop_t")));
		$("<span>优惠券：</span>").appendTo($(".shop_t p").eq(1));
		$("<div></div>").appendTo($("<span class='draw'>领取</span>").appendTo($(".shop_t p").eq(1)));
		$("<span>活动时间：2017.5.26-2017.5.29</span>").appendTo($(".shop_t p div"));
		$("<span>无需领取</span>").appendTo($(".shop_t p div"));
		//console.log($shop_name[0]);
		for(var i = 0;i < $shop_name.length;i ++) {
			//动态创建购物车内容
			//console.log(eval('(' + $.cookie($shop_name[i]) + ')').url);
			$("<div class='shop_com'></div>").appendTo($(".shop_all"));
			$("<input type='checkbox' class='store_c' />").appendTo($(".shop_com").eq(i));
			$("<img />").attr("src",eval('(' + $.cookie($shop_name[i]) + ')').url).css({"width":"80px","height":"80px","border":"1px #ddd solid"}).appendTo($("<a href='javascript:;'></a>").appendTo($(".shop_com").eq(i)));
			$("<img />").attr("src",eval('(' + $.cookie($shop_name[i]) + ')').url).css({"width":"270px","height":"270px","border":"1px #ddd solid","padding":"10px"}).appendTo($(".shop_com").eq(i).children().eq(1));
			$("<a href='javascript:;'></a>").text(eval('(' + $.cookie($shop_name[i]) + ')').name).appendTo($(".shop_com").eq(i));
			$("<ul></ul>").appendTo($(".shop_com").eq(i));
			$("<li>颜色：</li>").appendTo($(".shop_com").eq(i).children("ul")).append(eval('(' + $.cookie($shop_name[i]) + ')').color);
			$("<li>尺码：</li>").appendTo($(".shop_com").eq(i).children("ul")).append(eval('(' + $.cookie($shop_name[i]) + ')').size);
			$("<span></span>").html(eval('(' + $.cookie($shop_name[i]) + ')').price).appendTo($(".shop_com").eq(i));
			$("<p></p>").appendTo($(".shop_com").eq(i));
			$("<a href='javascript:;' class='dn'></a>").appendTo($(".shop_com").eq(i).children().eq(5));
			$("<input type='text' class='shuliang' />").attr("value",eval('(' + $.cookie($shop_name[i]) + ')').num).appendTo($(".shop_com").eq(i).children().eq(5));
			$("<a href='javascript:;' class='up'></a>").appendTo($(".shop_com").eq(i).children().eq(5));
			$("<span></span>").appendTo($(".shop_com").eq(i));
			$("<a href='javascript:;' class='del'>删除</a>").appendTo($("<span></span>").appendTo($(".shop_com").eq(i)));
			//动态创建购物车下拉菜单内容
			$(".cart ul").append($("<li></li>"));
			$("<a href='javascript:;'></a>").css({"background":"url(" + eval('(' + $.cookie($shop_name[i]) + ')').url + ") no-repeat","background-size":"40px 40px"}).appendTo($(".cart ul li").eq(i));
			$("<p></p>").appendTo($("<div></div>").appendTo($(".cart ul li").eq(i)));
			$("<p></p>").appendTo($(".cart ul li").eq(i).children("div"));
			$("<a href='javascript:;'></a>").text(eval('(' + $.cookie($shop_name[i]) + ')').name).appendTo($(".cart ul li").eq(i).children("div").children().eq(0));
			$("<span></span>").text("￥" + eval('(' + $.cookie($shop_name[i]) + ')').price).appendTo($(".cart ul li").eq(i).children("div").children().eq(0));
			$("<span></span>").text("颜色:" + eval('(' + $.cookie($shop_name[i]) + ')').color + " 尺码:" + eval('(' + $.cookie($shop_name[i]) + ')').size).appendTo($(".cart ul li").eq(i).children("div").children().eq(1));
			$("<a href='javascript:;'>删除</a>").appendTo($(".cart ul li").eq(i).children("div").children().eq(1));
		}
		$("<a href='javascript:;' class='re'>撤销本次删除</a>").appendTo($("<p>成功删除 1 款商品,如有误,可</p>").appendTo($("<div class='foot'></div>").appendTo($(".shop_con"))));
		$(".cart ul").append($("<li></li>"));
		$("<a href='javascript:;'>查看购物车</a>").appendTo($(".cart ul li:last-child"))
	}
	//优惠券领取移入移出
	$(".draw").hover(function() {
		$(this).children("div").css("display","flex");
	},function() {
		$(this).children("div").css("display","none");
	})
	//商品图移入移出
	$(".shop_com a:nth-child(2)").hover(function() {
		$(this).children().eq(1).css("display","block");
	},function() {
		$(this).children().eq(1).css("display","none");
	})
	//全选按钮
	$(".check").click(function() {
		if($(this).prop("checked") == true) {
			//$(".check").attr("on","1");
			$("input[type='checkbox']").prop("checked",true);
		}else {
			//$(".check").attr("on","0");
			$("input[type='checkbox']").prop("checked",false);
		}
		allMoney();
	})
	//计算总价的函数
	function allMoney() {
		//console.log($(".store_c").length);
		var $allmoney = 0;
		for(var i = 0;i < $(".store_c").length;i ++) {
			if($(".store_c").eq(i).is(":checked") && $(".store_c").eq(i).parent().css("display") != "none") {
				$allmoney += $(".store_c").eq(i).parent().children().eq(6).text() * 100;
			}
		}
		//console.log($allmoney);
		if($allmoney == 0) {
			$(".total b").html("￥0.00");
			$(".total p:nth-child(2) a").css("background-position-y","-800px");
		}else {
			$(".total b").html("￥" + ($allmoney / 100).toFixed(2));
			$(".total p:nth-child(2) a").css("background-position-y","-217px");
		}
	}
	//店铺商品全选按钮
	$(".store_t").click(function() {
		if($(this).prop("checked") == true) {
			//$(".check").attr("on","1");
			$(this).parent().parent().parent().parent().parent().children().children(".store_c").prop("checked",true);
		}else {
			//$(".check").attr("on","0");
			$(this).parent().parent().parent().parent().parent().children().children(".store_c").prop("checked",false);
		}
		allMoney();
	})
	$(".store_c").click(function() {
		allMoney();
	})
	//初始每件商品的总价
	$(".shop_com").each(function() {
		$(this).children().eq(6).html(((($(this).children().eq(4).text() * 100) * $(this).children().eq(5).children(".shuliang").val()) / 100).toFixed(2));
	})
	//减少商品
	$(".dn").click(function() {
		if($(this).next(".shuliang").val() > 1) {
			$(this).next(".shuliang").val($(this).next(".shuliang").val() - 1);
			$(this).parent().next("span").html(((($(this).parent().prev("span").text() * 100) * $(this).next(".shuliang").val()) / 100).toFixed(2));
		}
		allMoney();
	})
	//增加商品
	$(".up").click(function() {
		$(this).prev(".shuliang").val(Number($(this).prev(".shuliang").val()) + 1);
		$(this).parent().next("span").html(((($(this).parent().prev("span").text() * 100) * $(this).prev(".shuliang").val()) / 100).toFixed(2));
		allMoney();
	})
	//删除该商品
	var com_index;
	//var par_index;
	$(".del").click(function() {
		$(this).parent().parent().css("display","none");
		$(".foot").css("display","block");
		com_index = $(this).parent().parent().index();
		allMoney();
		var $shop_number = 0;
		$(".caption li:nth-child(1) a span").html($shop_number);
		//修改上方全部商品的数量
		for(var i = 0;i < $(this).parent().parent().parent().children(".shop_com").length;i ++) {
			if($(this).parent().parent().parent().children(".shop_com").eq(i).css("display") != "none") {
				$shop_number ++;
				$(".caption li:nth-child(1) a span").html($shop_number);
			}
		}
		//判断该店铺还有无商品
		for(var i = 0;i < $(this).parent().parent().parent().children(".shop_com").length;i ++) {
			if($(this).parent().parent().parent().children(".shop_com").eq(i).css("display") != "none") {
				//console.log($(this).parent().parent().parent().attr("class"));
				$(this).parent().parent().parent().css("display","block");
				return;
			}else {
				$(this).parent().parent().parent().css("display","none");
			}
		}
	})
	//撤销删除的商品
	$(".re").click(function() {
		$(".shop_all").children().eq(0).css("display","block");
		$(".shop_all").children().eq(com_index).css("display","flex");
		$(".shop_all").css("display","block");
		$(".foot").css("display","none");
	})
})