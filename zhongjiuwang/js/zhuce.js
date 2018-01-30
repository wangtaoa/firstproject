window.onload=function(){
	randomyzm();
}
$(".yzm").click(function(){
	randomyzm();
})
//封装一个获取随机验证码并把验证码放到页面上的函数
function randomyzm(){
	var num = Math.random().toString(36).substr(2,4);
	$(".yzm").html( num );
}
//表单提交验证
$("form").submit(function(){
	if( flagPhoneNumber && flagyzm && flagpwd && flagSurePwd && flagsjyzm && flagCheck ){
		var ujson = {
			"uphone":$("#phoneNumber").val(),
			"upwd":$("#pwd").val()
		}
		setCookie("zhanghao",JSON.stringify(ujson))
		return true;
	}else{
		if( !flagPhoneNumber ){
			$("#i1").html("请输入正确的手机号").css("color","red")
		}
		if( !flagCheck ){
			$("#i6").html("请仔细阅读并同意以上协议").css("color","red")
		}
		if( !flagsjyzm ){
			$("#i5").html("请输入正确的手机验证码").css("color","red")
		}
		if( !flagpwd ){
			$("#i3").html("密码长度只能在6-20位字符之间，不包含空格").css("color","red")
		}
		return false;
	}
})

//手机号验证
flagPhoneNumber = null;
$("#phoneNumber").blur(function(){
	var phoneNumber = $(this).val();
	var reg = /^1\d[35789]\d{8}$/
	if( reg.test( phoneNumber ) ){
		$("#i1").html("输入正确").css("color","green")
		flagPhoneNumber = true;
	}else{
		$("#i1").html("请输入正确的手机号").css("color","red")
		flagPhoneNumber = false;
	}
})
//验证码验证
flagyzm = null;
$("#txyz").blur(function(){
	var yzcount = $(this).val();
	var yzm = $(".yzm").html();
	if( yzcount == yzm ){
		flagyzm = true;
		$("#i2").html("")
	}else{
		flagyzm = false;
		$("#i2").html("验证码错误").css("color","red")
	}
})
//密码验证
flagpwd = null;
$("#pwd").blur(function(){
	var pwd = $(this).val();
	var reg = /^\S{6,20}$/;
	if( reg.test( pwd ) ){
		flagpwd = true;
		$("#i3").html("密码格式正确").css("color","green")
	}else{
		flagpwd = false;
		$("#i3").html("密码长度只能在6-20位字符之间，不包含空格").css("color","red")
	}
})
//确认密码
flagSurePwd = null;
$("#surePwd").blur(function(){
	var pwd = $("#pwd").val();
	var surePwd = $(this).val();
	if( pwd == surePwd ){
		flagSurePwd = true;
		$("#i4").html("")
	}else{
		flagSurePwd = false;
		$("#i4").html("两次输入密码不一致").css("color","red")
	}
})
//手机验证码
flagsjyzm = null;
$("#sjyzm").blur(function(){
	var sjyzm = $(this).val();
	var reg = /^[0-9]{4}$/;//验证为一个四位数
	if( reg.test(sjyzm) ){
		flagsjyzm = true;
		$("#i5").html("手机验证码正确").css("color","green")
	}else{
		flagsjyzm = false;
		$("#i5").html("请输入正确的手机验证码").css("color","red")
	}
})
//同意协议 checkbox 验证
flagCheck = null;
$("#xy").click(function(){
	if( $(this).prop("checked") ){
		flagCheck = true;
		$("#i6").html("")
	}else{
		flagCheck = false;
		$("#i6").html("请仔细阅读并同意以上协议").css("color","red")
	}
})