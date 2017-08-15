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
		if(!/^1[3|4|5|7|8]\d{9}$/.test($("#phone").val())) {
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
	$("#agree").click(function() {
		if($("#agree").attr("checked") == "checked") {
			$("#agree").removeAttr("checked");
		}else {
			$("#agree").attr("checked","checked");
		}
	})
	//点击注册
	//存储cookie名
	//console.log($.cookie());
	var $names = [];
	//存储用户cookie名
	var $shop_name = [];
	for(var i in $.cookie()) {
		$names.push(i);
		if(i.indexOf("ad_") == 0) {
			$shop_name.push(i);
		}
	}
	$("#reg").click(function() {
		//console.log(/^1[3|4|5|7|8]\d{9}$/.test($("#phone").val()));
		if($shop_name != 0) {
			for(var i in $.cookie()) {
				if(i.indexOf("ad_") == 0 && $("#phone").val() == i.replace("ad_","")) {
					alert("该用户已存在!");
					return;
				}
			}
		}
		if($(".top_f").css("display") == "flex") {
			return;
		}else {
			//console.log($(".ver_img a").attr("num"));
			for(var i = 0;i < $(".ver_img a").length;i ++) {
				if($(".ver_img a").eq(i).attr("index") == ($(".ver_img a").eq(i).attr("y") % 272) / 68) {
					continue;
				}else {
					alert("请将图片旋转至正确的方向!");
					return;
				}
			}
			if($("#agree").attr("checked") != "checked") {
				alert("请同意注册条款!");
				return;
			}
			$(".top_f").css("display","none");
			$("fieldset").css("display","none");
			$(".psword").css("display","flex");
			
			//点击完成注册密码
			$("#ok").click(function() {
				if($(".psd").val() == $(".psd2").val() && /^\w{6,12}$/.test($(".psd").val())) {
					$.cookie("ad_" + $("#phone").val(),"{password:'" + $(".psd").val() + "',on_of:'0'}");
					window.location.replace("mls_register.html");
				}else if($(".psd").val() == "") {
					alert("密码不能为空!");
				}else if($(".psd").val() != $(".psd2").val()) {
					alert("密码不一致!");
				}else {
					alert("密码仅允许使用数字，字母，下划线，要求6-12位!");
				}
			})
			
		}
	})
	//点击置顶
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
