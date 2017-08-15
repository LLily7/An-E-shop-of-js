$(function() {
	//顶部菜单移入移出事件
	$(".over").mouseover(function() {
		$(this).children(".menu").css("display","block");
	})
	$(".over").mouseout(function() {
		$(this).children(".menu").css("display","none");
	})
	var $is;
	for(var i in $.cookie()) {
		//判断是否登录
		if(eval('(' + $.cookie(i) + ')').on_of == 1) {
			$is = 1;
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
			$is = 0;
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
	//top中的移入移出事件
	$(".deta_h p").mouseover(function() {
		$(".top_hover").css("display","block");
		$(".top_l").css("background","#f6f6f6");
		$(".bor").css("border-right","none");
	})
	$(".top_hover").mouseover(function() {
		$(".top_hover").css("display","block");
		$(".top_l").css("background","#f6f6f6");
		$(".bor").css("border-right","none");
	})
	$(".deta_h2").mouseover(function() {
		$(".top_hover").css("display","block");
		$(".top_l").css("background","#f6f6f6");
		$(this).css("transform","rotate(180deg)");
		$(".bor").css("border-right","none");
	})
	$(".deta_h p").mouseout(function() {
		$(".top_hover").css("display","none");
		$(".top_l").css("background","#fff");
		$(".bor").css("border-right","1px #ddd solid");
	})
	$(".top_hover").mouseout(function() {
		$(".top_hover").css("display","none");
		$(".top_l").css("background","#fff");
		$(".bor").css("border-right","1px #ddd solid");
	})
	$(".deta_h2").mouseout(function() {
		$(".top_hover").css("display","none");
		$(".top_l").css("background","#fff");
		$(this).css("transform","rotate(0deg)");
		$(".bor").css("border-right","1px #ddd solid");
	})
	//商品展示图移入移出，左右按钮点击
	//获取图片，设置初值
	$.getJSON("../js/data.json",function(value) {
		//console.log(value.deta_tu_l[1].tu_s.length);
		$(".shop_l>img").attr("src",value.deta_tu_l2[0].tu_b[0].url);
		for(var i = 0;i < value.deta_tu_l2[1].tu_s.length;i ++) {
			//console.log(value.deta_tu_l[1].tu_s[i].url);
			$("<a href='javascript:;'></a>").css({"background":"url(" + value.deta_tu_l2[1].tu_s[i].url + ")","background-size":"60px 60px"}).appendTo($(".list_tu"));
		}
		//$(".list_tu a").eq(0).css({"opacity":"1","border-bottom":"2px #ef2f23 solid"});
		//console.log($(".list_tu a").length);
		$(".list_tu a").mouseover(function() {
			$(".list_tu a").each(function() {
				$(".list_tu a").css({"opacity":".5","border-bottom":"none"});
			})
			$(this).css({"opacity":"1","border-bottom":"2px #ef2f23 solid"});
			$(".shop_l>img").attr("src",value.deta_tu_l2[0].tu_b[$(this).index()].url);
		})
		//console.log(document.getElementsByClassName("list_tu")[0].offsetWidth);
		//console.log($(".list_tu").innerWidth());
		//console.log(parseInt($(".list_tu").css("left")));
		$(".list_l").click(function() {
			$(".list_tu").animate({"left":parseInt($(".list_tu").css("left")) + $(".list_c").innerWidth() + "px"},500,function() {
				if(parseInt($(".list_tu").css("left")) < 0) {
					$(".list_l").css("display","block");
				}else {
					$(".list_l").css("display","none");
				}
				if(parseInt($(".list_tu").css("left")) > - (Math.floor($(".list_tu").innerWidth() / $(".list_c").innerWidth()) * $(".list_c").innerWidth())) {
					$(".list_r").css("display","block");
				}else {
					$(".list_r").css("display","none");
				}
			})
		})
		$(".shop_c p:nth-child(4) a:nth-child(2)").css({"background-image":"url(../img/details2/deta_t5.jpg)","background-size":"50px 50px","background-position":"left top","background-repeat":"repeat"});
		$(".shop_c p:nth-child(4) a:nth-child(3)").css({"background":"url(../img/details2/deta_t1.jpg) repeat left top","background-size":"50px 50px"});
		//点击选颜色
		var n;
		//console.log(null == 0);
		$(".shop_c p:nth-child(4) a:nth-child(2)").click(function() {
			if($(this).css("background-repeat") == "repeat") {
				$(this).css({"background-image":"url(../img/details/deta_crb.png),url(../img/details2/deta_t5.jpg)","background-size":"11px 11px,50px 50px","background-position":"right bottom,left top","background-repeat":"no-repeat"});
				n = 0;
				if($(".shop_c p:nth-child(4) a:nth-child(3)").css("background-repeat") != "repeat") {
					$(".shop_c p:nth-child(4) a:nth-child(3)").css({"background-image":"url(../img/details2/deta_t1.jpg)","background-size":"50px 50px","background-position":"left top","background-repeat":"repeat"});
				}
			}else {
				$(this).css({"background-image":"url(../img/details2/deta_t5.jpg)","background-size":"50px 50px","background-position":"left top","background-repeat":"repeat"});
				if($(".shop_c p:nth-child(4) a:nth-child(3)").css("background-repeat") != "repeat") {
					n = 1;
				}else {
					n = null;
				}
			}
		})
		$(".shop_c p:nth-child(4) a:nth-child(3)").click(function() {
			if($(this).css("background-repeat") == "repeat") {
				$(this).css({"background-image":"url(../img/details/deta_crb.png),url(../img/details2/deta_t1.jpg)","background-size":"11px 11px,50px 50px","background-position":"right bottom,left top","background-repeat":"no-repeat"});
				n = 1;
				if($(".shop_c p:nth-child(4) a:nth-child(2)").css("background-repeat") != "repeat") {
					$(".shop_c p:nth-child(4) a:nth-child(2)").css({"background-image":"url(../img/details2/deta_t5.jpg)","background-size":"50px 50px","background-position":"left top","background-repeat":"repeat"});
				}
			}else {
				$(this).css({"background-image":"url(../img/details2/deta_t1.jpg)","background-size":"50px 50px","background-position":"left top","background-repeat":"repeat"});
				if($(".shop_c p:nth-child(4) a:nth-child(2)").css("background-repeat") != "repeat") {
					n = 0;
				}else {
					n = null;
				}
			}
		})
		
		$(".list_r").click(function() {
			//console.log($(".list_tu").css("left") > - (Math.floor($(".list_tu").innerWidth() / $(".list_c").innerWidth()) * $(".list_c").innerWidth()));
			$(".list_tu").animate({"left":parseInt($(".list_tu").css("left")) - $(".list_c").innerWidth() + "px"},500,function() {
				if(parseInt($(".list_tu").css("left")) > - (Math.floor($(".list_tu").innerWidth() / $(".list_c").innerWidth()) * $(".list_c").innerWidth())) {
					$(".list_r").css("display","block");
				}else {
					$(".list_r").css("display","none");
				}
				if(parseInt($(".list_tu").css("left")) < 0) {
					$(".list_l").css("display","block");
				}else {
					$(".list_l").css("display","none");
				}
			})
			
		})
		//获取详情页左侧看了又看
		for(var i = 0;i < value.d3_l.length;i ++) {
			$(".d3_l .look").eq(i).children().eq(0).children().attr("src",value.d3_l[i].url);
			$(".d3_l .look").eq(i).children().eq(1).text(value.d3_l[i].txt);
			$(".d3_l .look").eq(i).children().eq(2).prepend(value.d3_l[i].price);
			$(".d3_l .look").eq(i).children().eq(2).children().append(value.d3_l[i].collect);
		}
		
		for(var i = 0;i < value.con_c[2].d2_c2.length;i ++) {
			$("<img />").attr("src",value.con_c[2].d2_c2[i].url).appendTo($(".d2_c"));
		}
		for(var i = 0;i < value.con_c[3].d3_c2.length - 1;i ++) {
			$("<img />").attr("src",value.con_c[3].d3_c2[i].url).appendTo($(".d3_c"));
		}
		$("<a href='javascript:;'></a>").text("该商品由供应商发货").css("border-bottom","1px #000 solid").appendTo($(".d3_c"));
		$("<a href='javascript:;'></a>").css({"width":"30px","height":"20px","background":"url(../img/details/deta_1.png) no-repeat -4px -22px"}).appendTo($(".d3_c"));
		$("<img />").attr("src",value.con_c[1].d3_c[4].url).css({"width":"640px","margin":"30px","display":"none"}).appendTo($(".d3_c"));
		//点击事件
		$(".d3_c a").click(function() {
			if($(".d3_c img:last-child").css("display") == "none") {
				$(".d3_c img:last-child").css("display","block");
			}else {
				$(".d3_c img:last-child").css("display","none");
			}
		})
		//d4_c内容获取
		for(var i = 0;i < value.con_c[4].d4_c.length;i ++) {
			$(".d4_c .look").eq(i).children().eq(0).children().attr("src",value.con_c[4].d4_c[i].url);
			$(".d4_c .look").eq(i).children().eq(1).text(value.con_c[4].d4_c[i].txt);
			$(".d4_c .look").eq(i).children().eq(2).prepend(value.con_c[4].d4_c[i].price);
			$(".d4_c .look").eq(i).children().eq(2).children().append(value.con_c[4].d4_c[i].collect);
		}
		//.con_c3内容获取
		
		for(var i = 0;i < value.con_c[5].with_c3.length;i ++) {
			$(".con_c3 .look").eq(i).children().eq(0).children().attr("src",value.con_c[5].with_c3[i].url);
			$(".con_c3 .look").eq(i).children().eq(1).text(value.con_c[5].with_c3[i].txt);
			$(".con_c3 .look").eq(i).children().eq(2).prepend(value.con_c[5].with_c3[i].price);
			$(".con_c3 .look").eq(i).children().eq(2).children().append(value.con_c[5].with_c3[i].collect);
		}
		
		//点击加入购物车
		//console.log($(".color").css("background-image").toString().split(",")[1].replace("url(","").replace(")",""));
		
		$(".addshop").click(function() {
			if($is != 1) {
				console.log($is);
				alert("请先登录!");
				return;
			}
			if(n == null) {
				alert("请选择颜色!");
				return;
			}else{
				$(".fixed_shop").css("display","block");
				if($.cookie("shop_" + $(".shop_c>p:nth-child(1)").text()) != null) {
					for(var i in $.cookie()) {
						if(i == "shop_" + $(".shop_c>p:nth-child(1)").text()) {
							//console.log(eval('(' + $.cookie(i) + ')').color == $(".color").eq(n).attr("title"));
							if(eval('(' + $.cookie(i) + ')').name == $(".shop_c>p:nth-child(1)").text() && eval('(' + $.cookie(i) + ')').color == $(".color").eq(n).attr("title") && eval('(' + $.cookie(i) + ')').size == $(".size").attr("title") && eval('(' + $.cookie(i) + ')').price == $(".f9 p b").text().replace("￥","")) {
								//console.log(1);
								$.cookie("shop_" + $(".shop_c>p:nth-child(1)").text(),"{id:'" + $(".f6_l span").text() + "',name:'" + $(".shop_c>p:nth-child(1)").text() + "',color:'" + $(".color").eq(n).attr("title") + "',size:'" + $(".size").attr("title") + "',price:'" + $(".f9 p b").text().replace("￥","") + "',num:'" + (Number($(".num").val()) + Number(eval('(' + $.cookie(i) + ')').num)) + "',url:" + $(".color").eq(n).css("background-image").toString().split(",")[1].replace("url(","").replace(")","") + "}");
							}else {
								//console.log(2);
								$.cookie("shop_" + $(".shop_c>p:nth-child(1)").text(),"{id:'" + $(".f6_l span").text() + "',name:'" + $(".shop_c>p:nth-child(1)").text() + "',color:'" + $(".color").eq(n).attr("title") + "',size:'" + $(".size").attr("title") + "',price:'" + $(".f9 p b").text().replace("￥","") + "',num:'" + $(".num").val() + "',url:" + $(".color").eq(n).css("background-image").toString().split(",")[1].replace("url(","").replace(")","") + "}");
							}
						}
					}
				}else {
					$.cookie("shop_" + $(".shop_c>p:nth-child(1)").text(),"{id:'" + $(".f6_l span").text() + "',name:'" + $(".shop_c>p:nth-child(1)").text() + "',color:'" + $(".color").eq(n).attr("title") + "',size:'" + $(".size").attr("title") + "',price:'" + $(".f9 p b").text().replace("￥","") + "',num:'" + $(".num").val() + "',url:" + $(".color").eq(n).css("background-image").toString().split(",")[1].replace("url(","").replace(")","") + "}");
				}
				//console.log($.cookie());
			}
		})
	});
	//店铺优惠移入移出
	$(".f9 div div").mouseover(function() {
		$(".f9 ul").css("display","flex");
	})
	$(".f9 div div").mouseout(function() {
		$(".f9 ul").css("display","none");
	})
	//点击数量增减
	//console.log($(".num").val());
	$(".min").click(function() {
		if($(".num").val() > 1) {
			$(".num").val($(".num").val() - 1);
		}
		if($(".num").val() <= 1957) {
			$(".alert").css("display","none");
		}
	})
	$(".max").click(function() {
		if($(".num").val() < 1957) {
			$(".num").val(Number($(".num").val()) + 1);
		}else{
			$(".alert").css("display","block");
		}
	})
	$(".num").blur(function() {
		if($(".num").val() <= 1957) {
			$(".alert").css("display","none");
		}else {
			$(".alert").css("display","block");
		}
	})
	
	$(".clo").click(function() {
		$(".fixed_shop").css("display","none");
	})
	//分享移入移出
	$(".share").mouseover(function() {
		$(".hidden").css("display","block");
	})
	$(".hidden").mouseover(function() {
		$(".hidden").css("display","block");
	})
	$(".share").mouseout(function() {
		$(".hidden").css("display","none");
	})
	$(".hidden").mouseout(function() {
		$(".hidden").css("display","none");
	})
	//定位菜单点击切换分页
	$(".f6_r a").eq(0).click(function() {
		$(this).css({"background":"#fff","border-top":"2px #ef2f23 solid"});
		$(".f6_r a").eq(1).css({"background":"none","border-top":"none"});
		$(".f6_r a").eq(2).css({"background":"none","border-top":"none"});
		$(".con_c").css("display","block");
		$(".con_c2").css("display","none");
		$(".con_c3").css("display","none");
		$(".fixed_con_r").css("display","block");
	})
	$(".f6_r a").eq(1).click(function() {
		$(this).css({"background":"#fff","border-top":"2px #ef2f23 solid"});
		$(".f6_r a").eq(0).css({"background":"none","border-top":"none"});
		$(".f6_r a").eq(2).css({"background":"none","border-top":"none"});
		$(".con_c2").css("display","block");
		$(".con_c").css("display","none");
		$(".con_c3").css("display","none");
		$(".fixed_con_r").css("display","none");
	})
	$(".f6_r a").eq(2).click(function() {
		$(this).css({"background":"#fff","border-top":"2px #ef2f23 solid"});
		$(".f6_r a").eq(0).css({"background":"none","border-top":"none"});
		$(".f6_r a").eq(1).css({"background":"none","border-top":"none"});
		$(".con_c3").css("display","block");
		$(".con_c").css("display","none");
		$(".con_c2").css("display","none");
		$(".fixed_con_r").css("display","none");
	})
	//蒙版点击事件
	$(".back_op div").css("left",window.innerWidth / 2 - 200 + "px");
	$(".back_op").click(function() {
		
		$(".back_op div").animate({
			"left":window.innerWidth / 2 - 220 + "px"
		},100);
		$(".back_op div").animate({
			"left":window.innerWidth / 2 - 180 + "px"
		},100);
		$(".back_op div").animate({
			"left":window.innerWidth / 2 - 210 + "px"
		},100);
		$(".back_op div").animate({
			"left":window.innerWidth / 2 - 190 + "px"
		},100);
		$(".back_op div").animate({
			"left":window.innerWidth / 2 - 200 + "px"
		},100);
	})
	//阻止冒泡
	$(".back_op div").click(function(event) {
		return false;
	})
	$(".back_op a").click(function() {
		$(".back_op").css("display","none");
	})
	//店内搜索点击事件
	$(".d1_l p:nth-child(3) a").click(function() {
		if($(".d1_l input").val() == "") {
			$(".back_op").css("display","block");
		}
	})
	
	
	var $settop = $(".fixed_top").offset().top;
	window.onscroll = function() {
		var top = document.body.scrollTop || document.documentElement.scrollTop;
		//滚动事件，滚动到一定高度进行定位
		//console.log($settop);
		if(top >= $settop) {
			$(".fixed_top").css({"position":"fixed","left":"0","right":"0","margin":"auto","top":"0"});
			$(".fixed_con_r").css({"position":"fixed","top":"60px"});
			$(".f6_l").css({"width":"220px","border-right":"none","margin-right":"0"});
		}else {
			$(".fixed_top").css("position","static");
			$(".fixed_con_r").css("position","static");
			$(".f6_l").css({"width":"200px","border-right":"1px #e5e5e5 solid","margin-right":"20px"});
		}
		if(top + 80 < $("#d2_c").parent().offset().top) {
			$(".fixed_con_r li").eq(0).removeClass().addClass("back_dif").siblings().removeClass().addClass("back_with");
		}else if (top + 80 >= $("#d2_c").parent().offset().top && top + 80 < $("#d3_c").parent().offset().top) {
			$(".fixed_con_r li").eq(1).removeClass().addClass("back_dif").siblings().removeClass().addClass("back_with");
		}else if (top + 80 >= $("#d3_c").parent().offset().top && top + 80 < $("#d4_c").parent().offset().top) {
			$(".fixed_con_r li").eq(2).removeClass().addClass("back_dif").siblings().removeClass().addClass("back_with");
		}else {
			$(".fixed_con_r li").eq(3).removeClass().addClass("back_dif").siblings().removeClass().addClass("back_with");
		}
	}
	//console.log($(".fixed_top").offset().top);
	//console.log($("#d1_c").offset().top);
	//楼梯移入移出
	//初始状态
	var $index = 0;
	$(".fixed_con_r li").eq(0).removeClass().addClass("back_dif").siblings().removeClass().addClass("back_with");
	$(".fixed_con_r li").mouseover(function() {
		$(this).removeClass().addClass("back_dif");
	})
	$(".fixed_con_r li").mouseout(function() {
		if($index == $(this).index()) {
			$(this).removeClass().addClass("back_dif");
		}else {
			$(this).removeClass().addClass("back_with");
		}
	})
	//楼梯点击事件
	$(".fixed_con_r li").click(function() {
		$(this).removeClass().addClass("back_dif").siblings().removeClass().addClass("back_with");
		$index = $(this).index();
	})
	//console.log("￥52.20￥21.20￥31.30".replace(/[￥]+/g,""));
})
