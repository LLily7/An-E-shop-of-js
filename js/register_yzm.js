$(function() {
	//验证码
	//获取验证码
	var $yzm = function() {
		$.getJSON("../js/data.json",function(value) {
			//记录x坐标
			var $w = 0;
			//记录随机数
			var $num = Math.floor(Math.random() * value.yzm.length);
			//随机验证码
			var $rdm = value.yzm[$num].url;
			
			//console.log(value.yzm[Math.floor(Math.random() * value.yzm.length)].url);
			$(".ver_img a").each(function() {
				//添加自定义属性存储图片下标点击注册时使用
				$(this).attr("num",$num);
				//添加自定义属性存储y坐标点击验证码时与点击注册时使用
				$(this).attr("y",0);
				//添加自定义属性存储点击次数点击注册时使用
				$(this).attr("index",value.yzm[$num].next[$(this).index()].num);
				//console.log($(this).attr("y"));
				$(this).css({"background-image":"url(" + $rdm + ")","background-position":(- $w) + "px 0"});
				$w += 68;
			})
		})
	}
	//点击验证码改变精灵图位置实现旋转效果
	$(".ver_img a").click(function() {
		//console.log($(this).attr("y"));
		$(this).attr("y",Number($(this).attr("y")) + 68);
		
		$(this).css("background-position-y",-($(this).attr("y") % 272) + "px");
	})
	$yzm();
	//失焦时正则验证手机号码格式
	$("#phone").blur(function() {
		if($("#phone").val() == "") {
			$(".top_f").css("display","flex");
			return;
		}else {
			$(".top_f").css("display","none");
		}
	})
	//点击换一组验证码
	$("#group").click(function() {
		$yzm();
	})
	//条款协议点击事件(判断是否同意)
	$("#rmb").click(function() {
		if($("#rmb").attr("checked") == "checked") {
			$("#rmb").removeAttr("checked");
		}else {
			$("#rmb").attr("checked","checked");
		}
	})
	//点击登录
	//存储cookie名
	var $names = [];
	//存储用户账户信息cookie名
	var $ad_name = [];
	for(var i in $.cookie()) {
		$names.push(i);
		if(i.indexOf("ad_") == 0) {
			$ad_name.push(i);
		}
	}
	//console.log($ad_name.length);
	$("#reg").click(function() {
		//console.log($.cookie("account"));
		if($ad_name.length == 0) {
			alert("该用户不存在!");
			return;
		}else {
			if($("#phone").val() != $ad_name[0].replace("ad_","")) {
				//console.log(1);
				alert("该用户不存在!");
				return;
			}else {
				if($("#psd").val() != eval('(' + $.cookie($ad_name[0]) + ')').password) {
					alert("请输入正确的密码!");
					return;
				}else {
					for(var i = 0;i < $(".ver_img a").length;i ++) {
						if($(".ver_img a").eq(i).attr("index") == ($(".ver_img a").eq(i).attr("y") % 272) / 68) {
							continue;
						}else {
							alert("请将图片旋转至正确的方向!");
							return;
						}
					}
					$.removeCookie($ad_name[0]);
					//判断是否需要记住账户密码
					if($("#rmb").is(":checked")) {
						$.cookie("ad_" + $("#phone").val(),"{password:'" + $("#psd").val() + "',on_of:'1'}",{expires:7,path:'/'});
					}else {
						$.cookie("ad_" + $("#phone").val(),"{password:'" + $("#psd").val() + "',on_of:'1'}");
					}
					window.location.replace("mls_sy.html");
					//window.location.href = "mls_register.html";
					return;
				}
			}
		}
	})
	//点击置顶部分
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
})
