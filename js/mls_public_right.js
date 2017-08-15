//侧边栏移入移出事件
$(function() {
	$(".fixed_r li").mouseover(function() {
		if($(this).index() == 1) {
			$(".code").css("display","block");
		}
		$(this).children().eq(0).css({"color":"#fff","background":"#ff3066"});
		$(this).children().eq(0).children("img").attr("src","../img/header/mls_r" + $(this).index() + "h.png");
	})
	$(".fixed_r li").mouseout(function() {
		if($(this).index() == 1) {
			$(".code").css("display","none");
		}
		$(this).children(0).eq(0).css({"color":"#666","background":"#f8f8f8"});
		$(this).children(0).eq(0).children("img").attr("src","../img/header/mls_r" + $(this).index() + ".png");
	})
})