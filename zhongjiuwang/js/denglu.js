//小选项卡 选择 扫码登陆还是账号密码登陆
$(".dlType").find("span").eq(0).click(function(){
	$(this).css({"font-weight":"900","color":"#e54b54"})
		   .siblings().css({"font-weight":"100","color":"black"});
	$(".smcount").css("display","block");
	$(".zmcount").css("display","none");
})
$(".dlType").find("span").eq(1).click(function(){
	$(this).css({"font-weight":"900","color":"#e54b54"})
		   .siblings().css({"font-weight":"100","color":"black"});
	$(".smcount").css("display","none");
	$(".zmcount").css("display","block");
})
//点击登录验证账号密码
$("#dl").click(function(){
	var arr=JSON.parse( getCookie("zhanghao") );
	var phone = $("#uname").val();
	var pwd = $("#upwd").val();
	if( phone == arr.uphone && pwd == arr.upwd ){alert("登陆成功")
		location.href="index.html";
	}else{
		$(".tips").html("用户名和密码不匹配")
				  .css("color","red");
	}
})