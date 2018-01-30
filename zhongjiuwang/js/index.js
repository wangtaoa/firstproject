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
//轮播图
var banner = $("#banner li");
var control = $(".banner-controls span");
for( var i=0 ; i<banner.length ; i++ ){
	banner.eq(i).find("a").css("background","url(img/banner"+(i+1)+".jpg) no-repeat top center")
}
var bannerIndex = 0;
function autoPlay(){
	bannerIndex++;
	for( var i=0 ; i<banner.length ; i++ ){
		banner.eq(i).fadeOut(1000);
		control.eq(i).removeClass("showspan");
	}
	if( bannerIndex == banner.length ){
		bannerIndex = 0;
	}
	banner.eq(bannerIndex).fadeIn(1000);
	control.eq(bannerIndex).addClass("showspan");
}
var timer=setInterval(autoPlay,5000);
for( let i=0 ; i<banner.length ; i++ ){
	control.eq(i).on("mouseover",function(){
		bannerIndex = i-1;
		clearInterval( timer );
		autoPlay();
	}).on("mouseleave",function(){
		timer=setInterval(autoPlay,5000);
	})
}
//轮播图移出停止 移出继续
$(".banner").on("mouseenter","li",function(){
	clearInterval(timer);
}).on("mouseleave","li",function(){
	timer=setInterval(autoPlay,5000);
})
//smallbanner的移入移出效果
$(".smallbanner").on("mouseenter","a",function(){
	$(this).stop().animate({"right":10,"opacity":1},100)
}).on("mouseleave","a",function(){
	$(this).stop().animate({"right":0,"opacity":.8},100)
})
//通过ajax获取json中的信息 动态创建 添加至页面中
window.onload=function(){
	var str = "";
	var ajax = null;
	var oUl = document.getElementsByClassName("rxShow")[0];
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	ajax.open( "get","json/rx.json?id="+new Date().getTime() );
	ajax.send();
	ajax.onreadystatechange=function(){
		if( ajax.readyState == 4 && ajax.status == 200 ){
			var arr= JSON.parse(ajax.responseText);
			for( let i=0 ; i<arr.length ; i++ ){
				if( arr[i].pid == i+1 ){
					str += `<li>
								<a href="xiangqing.html">
									<img src="img/${arr[i].src}" alt="" />
								</a>
							</li>`
				}
			}
			oUl.innerHTML=str;
		}
	}
	//pinpaiul1通过ajax获取数据 动态创建添加
	var str1 = "";
	var ajax1 = null;
	pinpaiUl = document.getElementsByClassName("pinpaiul1")[0];
	if( window.XMLHttpRequest ){
		ajax1 = new XMLHttpRequest();
	}else{
		ajax1 = new ActiveXObject("Microsoft.XMLHTTP");
	}
	ajax1.open( "get","json/pinpailogo.json?id="+new Date().getTime() );
	ajax1.send();
	ajax1.onreadystatechange=function(){
		if( ajax1.readyState == 4 && ajax1.status == 200 ){
			arr1 = JSON.parse(ajax1.responseText);
			//分页 一页15个
			var showNumber = 15;
			var page = Math.ceil(arr1.length/showNumber);
			var pageIndex = 1;//默认页数是第一页
			show(showNumber,pageIndex,arr1);
			//两个箭头点击事件
			var arrL = document.getElementsByClassName("ppal")[0];
			var arrR = document.getElementsByClassName("ppar")[0];
			arrL.onclick=function(){
				pageIndex--;
				if( pageIndex == 0 ){
					pageIndex = page;
				}
				show(showNumber,pageIndex,arr1);
			}
			arrR.onclick=function(){
				pageIndex++;
				if( pageIndex == page+1 ){
					pageIndex =1;
				}
				show(showNumber,pageIndex,arr1);
			}
		}
	}
}
//rxShow 事件委托当鼠标移入的时候 让其向左侧移动 并且超出隐藏
$(".rxShow").on("mouseenter","li",function(){
	$(this).find("a").animate({"left":-5},200)
}).on("mouseleave","li",function(){
	$(this).find("a").animate({"left":0},200)
})
//封装一个根据pageIndex 页数展示li的函数
//                
//pageIndex        1    2    3
//展示li的下标    0-14  15-29 30-？
//                (pageIndex-1)*showNumber --- pageIndex*showNumber-1
function show(showNumber,pageIndex,arr){
	var str1 = "";
	for( let i=(pageIndex-1)*showNumber ; i<pageIndex*showNumber ; i++ ){
		if( arr[i] && arr[i].smalllogo == i+1 ){
			// if( i%5 == 4 ){
			// 	str1 += `<li>
			// 			<a href="javascript:;" style="border:0">
			// 				<img src="${arr1[i].src}" alt="" />
			// 			</a>
			// 		</li>`
			// }else{
				str1 += `<li>
						<a href="javascript:;">
							<img src="${arr1[i].src}" alt="" />
						</a>
					</li>`
			//}
		}
		pinpaiUl.innerHTML=str1;
	}
}
//选项卡的内容通过ajax获取
//封装一个 选酒 白酒 葡萄酒 洋酒 的选项卡 通用函数
function xxk(type,count,obj){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/zhongjiuwang/json/indexXX.json",
		success:function(json){
			var str="";
			for( attr in json ){
				if( attr == type ){
					for( bttr in json[attr] ){
						if( bttr == count ){
							for( var i=0 ; i<json[attr][bttr].length ; i++ ){
								str += 	`<li>
											<div>
												<a href="xiangqing.html">
													<img src="jsonp/${json[attr][bttr][i].src}" alt="">
												</a>
											</div>
											<p>￥<span>${json[attr][bttr][i].price}</span></p>
											<h5><a href="xiangqing.html">${json[attr][bttr][i].jieshao}</a></h5>
										</li>`
							}
						}
					}
				}
			}
			obj.html(str);
		}
	})
}
xxk("helpU","count2",$("#helpU .count2"));
xxk("helpU","count3",$("#helpU .count3"));
xxk("helpU","count4",$("#helpU .count4"));

xxk("white","count2",$("#white .count2"));
xxk("white","count3",$("#white .count3"));

xxk("wine","count2",$("#wine .count2"));
xxk("wine","count3",$("#wine .count3"));
xxk("wine","count4",$("#wine .count4"));
xxk("wine","count5",$("#wine .count5"));

xxk("west","count2",$("#west .count2"));
xxk("west","count3",$("#west .count3"));
//鼠标移入的选项卡 功能 封装函数
function mouseenter(obj1,obj2){
//obj1是移入的对象的父元素 obj2是display:block的对象的一个集合
//其中obj1和obj2的下标对应
	obj1.on("mouseenter","li",function(){
		var index = $(this).index();
		console.log(index);
		obj2.eq(index).css("display","block")
					  .siblings().css("display","none");
	})
}
mouseenter($(".helpN"),$(".helpC ul"));//helpU的选项卡调用
mouseenter($(".whiteN"),$(".whiteC ul"));//white的选项卡调用
mouseenter($(".wineN"),$(".wineC ul"));//wine的选项卡调用
mouseenter($(".westN"),$(".westC ul"));//west的选项卡调用
//louti 
$(window).scroll(function(){
	var blockTop = $(".rxShow").offset().top;
	var blockBottom = $(".pinpaicon").offset().top;
	var sTop = $(document).scrollTop();
	if( sTop>blockTop && sTop<blockBottom ){
		$(".louti").css("display","block")
	}else{
		$(".louti").css("display","none")
	}
	var hcon = $(".helpUcon");
	ltIndex = loutiIndex( sTop );
	$(".louti em").css("display","block")
				 .eq(ltIndex).css("display","none");
	$(".louti span").css("display","none")
					.eq(ltIndex).css("display","block");
})
function loutiIndex( sTop ){//封装一个根据scrollTop值 来判断 楼梯对应下标的函数
	for( let i=0 ; i<$(".louti").children().length ; i++ ){
		var pdTop = $(".helpUcon").eq(i).offset().top;
		var pdBottom = $(".helpUcon").eq(i).offset().top + $(".helpUcon").eq(i).outerHeight();
		if( sTop>=pdTop && sTop<pdBottom ){
			return i;
		}
	}
}
//左侧小轮播 左右键点击函数
function small( objL,objR,objMove ){
	var index = 0;//默认的展示的li下标为0
	objL.click(function(){
		index--;
		if( index == -1 ){
			index = 2
		}
		objMove.animate({"left":index*-210+20},500)
	})
	objR.click(function(){
		index++;
		if( index==3 ){
			index = 0
		}
		objMove.animate({"left":index*-210+20},500)
	})
}
small($("#white .arrLeft"),$("#white .arrRight"),$("#white .drinks ul"));//白酒的小轮播
small($("#wine .arrLeft"),$("#wine .arrRight"),$("#wine .drinks ul"));//葡萄酒小轮播
small($("#west .arrLeft"),$("#west .arrRight"),$("#west .drinks ul"));//洋酒&葡萄酒小轮播
//点击楼层 animate到达制定的位置
$(".louti").on("click","li",function(){
	var index = $(this).index();
	$("html,body").animate({"scrollTop":$(".helpUcon").eq(index).offset().top},500);
})
// .on("mouseenter","li",function(){
// 	$(this).find("em").css("display","none");
// 	$(this).find("span").css("display","block");
// }).on("mouseleave","li",function(){
// 	$(this).find("em").css("display","block");
// 	$(this).find("span").css("display","none")
// })
//右侧侧边栏
$("#side").css({"width":40,"height":$(window).height(),"background":"#2a292e",
	"position":"fixed","top":0,"right":0})