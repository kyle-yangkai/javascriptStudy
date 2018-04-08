/** 此js包含以下功能函数
 * 1.GET_STYLE(obj,name)获取元素样式（行间样式和非行间样式）
 * 2.START_MOVE (obj,json,versaSpeed,fnEnd)定义对象运动
 * 3.GET_POSITION(ev)获取鼠标在页面的绝对位置
 * 4.ADD_EVENT(obj,ev,fn)执行事件绑定
 * 5.USE_AJAX(url,fnSuccess,fnFail)执行AJAX操作
 */

//封装GET_STYLE函数获取元素样式（行间样式和非行间样式）
function GET_STYLE(obj,name){
	/**参数
	 * obj  -->对象
	 * name -->样式名称
	 */
	if(obj.currentStyle){return obj.currentStyle[name]}  //IE
	else{return getComputedStyle(obj,false)[name]}       //chrome firefox
}

//封装START_MOVE函数定义对象运动（需要调用获取元素式样的函数）
function START_MOVE (obj,json,versaSpeed,fnEnd) {
	/**参数
	 * obj          -->对象
	 * json         -->{styleName:target}
	 * styleName    -->对象样式名称
	 * target       -->目标运动到的最终状态（类型：数字）
	 * versaSpeed   -->运动速度除数，数值越大，运动越慢（类型：数字）
	 * fnEnd        -->函数定义循环结束后执行的动作
	 * 例子                               -->	START_MOVE(obj,{WIDTH:100, OPACITY:60, height:300,},40,function(){alert(1);})
	 */
	clearInterval(obj.timer); //清除定时器，防止定时器同时多次触发
		
	//设置运动定时器
	obj.timer = setInterval(function(){
		var bstop = true;  //假设所有运动的最终状态都到了
		
		//使用json可以使多个样式同时变化
		for(styleName in json){
			
			//判断变化的样式是否透明度
			if(styleName=="opacity"){
				var styleValue = Math.round(parseFloat(GET_STYLE(obj,styleName))*100); //创建styleValue变量保存样式的值，便于后面调用
			}else{
				var styleValue = parseInt(GET_STYLE(obj,styleName)); //创建styleValue变量保存样式的值，便于后面调用
			}
			
			//创建speed变量保存样式变化速度
			var speed =(json[styleName]-styleValue)/versaSpeed;
//			console.log(speed);
			
			//检测循环阶段styleName值的变化情况
//			console.log("循环后"+styleName+"值为："+styleValue);
			
			if(styleValue!=json[styleName]) {
				bstop = false;
			}
			
			if(styleName=="opacity"){
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				obj.style.opacity = (styleValue+speed)/100;
				obj.style.filter = "alpha(opacity="+(styleValue+speed)+")";  // 针对 IE8 以及更早的版本
			}else{
				speed = speed>0?Math.ceil(speed):Math.floor(speed); //判断向上取整还是向下取整
//				console.log("取整后speed值为"+speed);	
				obj.style[styleName] = styleValue+speed+"px";
			}
		}
		//判断运动停止条件
		if(bstop){
			clearInterval(obj.timer);
			if(fnEnd) {
				fnEnd();
			}
		}
	},30)
}

//封装GET_POSITION函数获取鼠标在页面的绝对位置
function GET_POSITION(ev){ 
	/**参数
	 * ev为事件参数，在浏览器中不兼容，因此调用此函数的过程如下
	 * var ev1 = ev||event;         //ie兼容event ，firefox兼容ev
	 * var pos = GET_POSITION(ev1);
	 * obj.style.left = pos.x +"px";
	 * obj.style.top = pos.y +"px";
	 */
	
	//获取当前页面scrollTop和scrollLeft
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
	
	return {x:ev.clientX+scrollLeft, y:ev.clientY+scrollTop};  //返回json数组
}

//封装ADD_EVENT函数执行事件绑定
function ADD_EVENT(obj,ev,fn){
	/**参数
	 * obj    -->对象
	 * ev     -->执行的ev事件（例如click）
	 * fn     -->ev事件执行的函数
	 * 例子          -->ADD_EVENT(oBtn,"click",function(){
	 * 				alert("1");
	 * 			})
	 */
	
	//ie8.0以下使用attachEvent，其他使用addEventListener
	if(obj.attachEvent){
		obj.attachEvent("on"+ev,fn);
	}else{
		obj.addEventListener(ev,fn,false);
	}
}

//封装USE_AJAX函数执行AJAX操作
function USE_AJAX(url,fnSuccess,fnFail){
	/**参数
	 * url            --> 调用后台数据的地址
	 * fnSuccess      --> 成功后执行的函数
	 * fnFail         --> 失败后执行的函数（如果有）
	 * 例子                    --> USE_AJAX("a1.txt",function(str){alert(str);},function(str){alert("失败"+str);})
	 *                                      str --> oAjax.responseText, str --> oAjax.status
	 */
	
	//1.创建 XMLHttpRequest对象
	var oAjax;
	if (window.XMLHttpRequest){  // code for IE7+, Firefox, Chrome, Opera, Safari
		oAjax = new XMLHttpRequest();
//		alert(oAjax);
	}
	else{  // code for IE6, IE5
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	
	//2.连接服务器
	oAjax.open("GET",url,true);
	
	//3.发送请求
	oAjax.send();
	
	//4.接收返回
	oAjax.onreadystatechange = function(){
//		oAjax.readyState  //浏览器和服务器进行到那一步了
		if(oAjax.readyState==4){
			if(oAjax.status==200){
				fnSuccess(oAjax.responseText);
			}else{
				if(fnFail){
					fnFail(oAjax.status);
				}
			}
		}
	}
}

//

