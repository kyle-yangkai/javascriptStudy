//获取元素样式（行间样式和非行间样式）
function GET_STYLE(obj,name){
	/**参数
	 * obj  -->对象
	 * name -->样式名称
	 */
	if(obj.currentStyle){return obj.currentStyle[name]}  //IE
	else{return getComputedStyle(obj,false)[name]}       //chrome firefox
}

