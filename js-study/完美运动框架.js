/**完美运动框架
 * 功能：可以定义多物体同时或不同时执行相同或不同运动，
 * 
 */

//获取元素样式（行间样式和非行间样式）
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
	 * versaSpeed   -->运动速度除数，数值越大，运动越快（类型：数字）
	 * 
	 * 例子                               -->	START_MOVE(oDIV1,{WIDTH:100, OPACITY:60, height:300,},40,function(){alert(1);})
	 */
	clearInterval(obj.timer); //清除定时器，防止定时器同时多次触发
		
	//设置运动定时器
	obj.timer = setInterval(function(){
		var bstop = true;  //假设所有运动的最终状态都到了
		
		//使用json可以使多个样式同时变化
		for(styleName in json){
			
			//判断变化的样式是否透明度
			if(styleName=="opacity"){
				var styleValue = Math.round(parseFloat(GET_STYLE(oDiv1,styleName))*100); //创建styleValue变量保存样式的值，便于后面调用
			}else{
				var styleValue = parseInt(GET_STYLE(oDiv1,styleName)); //创建styleValue变量保存样式的值，便于后面调用
			}
			
			//创建speed变量保存样式变化速度
			var speed =(json[styleName]-styleValue)/versaSpeed;
			console.log(speed);
			
			//检测循环阶段styleName值的变化情况
			console.log("循环后"+styleName+"值为："+styleValue);
			
			if(styleValue!=json[styleName]) {
				bstop = false;
			}
			
			if(styleName=="opacity"){
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				obj.style.opacity = (styleValue+speed)/100;
				oDiv1.style.filter = "alpha(opacity="+(styleValue+speed)+")";  // 针对 IE8 以及更早的版本
			}else{
				speed = speed>0?Math.ceil(speed):Math.floor(speed); //判断向上取整还是向下取整
				console.log("取整后speed值为"+speed);	
				obj.style[styleName] = styleValue+speed+"px";
			}
		}
		//判断运动停止条件
		if(bstop){
			clearInterval(obj.timer);
			if(fnEnd) fnEnd();
		}
	},30)
}