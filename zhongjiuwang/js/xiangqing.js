$(".list").on("mouseenter",function(){
	$(".listMenu").css("display","block");
}).on("mouseleave",function(){
	$(".listMenu").css("display","none");
})
//listMenu 鼠标移入移出效果
$(".listMenu").on("mouseenter","dl",function(){
	$(this).css("background","#313b44");
	$(".dl1").css("display","block");
}).on("mouseleave","dl",function(){
	$(this).css("background","#3e4851");
	$(".dl1").css("display","none");
})
$(".dl1").hover(function(){
	$(this).show();
},function(){
	$(this).hide();
})
//放大镜效果
$(".sImg").mouseenter(function(){
	$(".mask").css("display","block");
	$(".lImg").css("display","block");
	//设置遮罩层的中心跟随鼠标移动
	var disx = $(".mask").outerWidth()/2;
	var disy = $(".mask").outerHeight()/2;
	$(".sImg").mousemove(function(e){
		var e = e || event;
		var x = e.pageX - $(".sImg").offset().left - disx;
		var y = e.pageY - $(".sImg").offset().top  - disy;
		var maxX = $(".sImg").width() - $(".mask").outerWidth();
		var maxY = $(".sImg").height()- $(".mask").outerWidth();
		//边界处理
		var x = Math.max(0,Math.min(x,maxX));
		var y = Math.max(0,Math.min(y,maxY));
		$(".mask").css( {"left":x,"top":y} );
		$(".lImg").css("backgroundPosition",-2*x+"px "+-2*y+"px")
	})
}).mouseleave(function(){
	$(".mask").css("display","none");
	$(".lImg").css("display","none");
})
//划过小图的时候 改变sImg 和 lImg 的背景图
$(".bImg").on("mouseenter","li",function(){
	$(this).find("img").css("borderColor","red");
	$(this).siblings().find("img").css("borderColor","#fff");
	var index = $(this).index();
	$(".sImg").css("backgroundImage","url(img/fdjs" + (index+1) + ".jpg)");
	$(".lImg").css("backgroundImage","url(img/fdjs" + (index+1) + ".jpg)")
})
//xqnav点击效果
$(".xqnav").on("click","li",function(){
	$(this).css("border-top","4px solid #f43a3e")
		   .siblings().css("border-top","none");
	$(".xqnav li").find("a").css("border","none");
	$(this).find("a").css({"border-left":"2px solid #ddd","border-right":"2px solid #ddd",
		"line-height":"52px","color":"#f43a3e"});
})
$(".xqnav li").eq(0).click(function(){
	$(".pjs").css("display","block");
	$(".pjzx").css("display","none");
	$("html,body").scrollTop( $(".pjs").offset().top-$(".xqnav").outerHeight() );
})
$(".xqnav li").eq(1).click(function(){
	$(".pjs").css("display","none");
	$(".pjzx").css("display","block");
	$("html,body").scrollTop( $(".pj").offset().top-$(".xqnav").outerHeight() );
})
$(".xqnav li").eq(2).click(function(){
	$(".pjs").css("display","none");
	$(".pjzx").css("display","block");
	$("html,body").scrollTop( $(".zx").offset().top-$(".xqnav").outerHeight() );
})
//吸顶效果
$(window).scroll(function(){
	console.log($(document).scrollTop(),$(".xqmainR").offset().top)
	if( $(document).scrollTop() >= $(".xqmainR").offset().top ){
		$(".xqnav").css({"position":"fixed","top":0})
	}else{
		$(".xqnav").css("position","")
	}
})
//右侧侧边栏
$("#side").css({"width":40,"height":$(window).height(),"background":"#2a292e",
	"position":"fixed","top":0,"right":0})