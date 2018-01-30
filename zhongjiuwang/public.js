//根据id查找页面元素
function $id(id){
	return document.getElementById(id);
}

//获取任意区间值
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}

//随机颜色值获取
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i =1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}
//日期时间格式封装
function dateToString(sign){
	//如果用户不传递任何参数  默认日期间隔符号是  - 
	sign = sign || "-";//如果sign是未定义，就按默认值 "-"
	var d = new Date();
	var y = d.getFullYear();
	var m =toTwo( d.getMonth() + 1 ) ;
	var _date =toTwo( d.getDate() );
	var h =toTwo( d.getHours() );
	var min =toTwo( d.getMinutes() );
	var s =toTwo( d.getSeconds() );
	return y + sign + m + sign + _date + " " + h + ":" + min + ":" + s;
}
//如果得到的是小于10的数 就 拼接0
function toTwo(val){
	return val < 10 ? "0" + val : val;
}

//定义一个时间差函数  
function timeDiff(start,end){
	return Math.abs( start.getTime()-end.getTime() ) / 1000;
}
//定义一个判断碰撞的函数
function pz(obj1,obj2){
	//移动对象的四个边的位置值;
	L1 = obj1.offsetLeft;
	R1 = obj1.offsetLeft+obj1.offsetWidth;
	T1 = obj1.offsetTop;
	B1 = obj1.offsetTop+obj1.offsetHeight;
	//静止对象的四个边的位置值;
	L2 = obj2.offsetLeft;
	R2 = obj2.offsetLeft+obj2.offsetWidth;
	T2 = obj2.offsetTop;
	B2 = obj2.offsetTop+obj2.offsetHeight;
	//判断是否碰撞
	if( R1<L2 || L1>R2 || B1<T2 || T1>B2 ){
		return false;
	}else{
		return true;
	}
}
//设置cookie
function setCookie(key,value,day){
	if( day ){
		var d = new Date();
		d.setDate( d.getDate() + day );
		document.cookie = key + "=" + value + ";expires=" + d;
	}else{
		document.cookie = key + "=" + value;
	}
}
//获取cookie
function getCookie(key){
	//判断是否有cookie
	if( document.cookie ){
		var str = document.cookie;
		var arr = str.split("; ");
		for( var i = 0 ; i < arr.length ; i++ ){
			var item = arr[i].split("=");
			if( item[0] == key ){
				return item[1];//返回key对应的value值 是一个字符串
			}
		}
		//循环结束后   没有对应的key   就返回一个""
		return ""; //说明有cookie  但是没有key
	}
	
	//如果没有cookie  返回一个""
	return "";// 说明没有cookie
}

//删除cookie   -1  或  ""
function removeCookie(key){
	//document.cookie = key + "= '';expires=-1" 
	setCookie(key , "" , -1);
}
