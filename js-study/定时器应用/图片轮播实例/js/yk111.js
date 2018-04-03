window.onload = function(){
	var outside     = document.getElementById("outSide");
		bigImgUl    = document.getElementById("bigImg");
		bigImgLi    = bigImgUl.getElementsByTagName("li");
		topLeft     = document.getElementById("topLeft");
	    topRight    = document.getElementById("topRight");
	    Next        = document.getElementById("Next");
	    Prev        = document.getElementById("Prev");
	    miniImgUl   = document.getElementById("miniImg");
	    miniImgLi   = miniImgUl.getElementsByTagName("li");
	    nowZIndex   = 0;
	    nowNum      = 0;
	    
    //初始化大图图片层叠
	for(i=0;i<bigImgLi.length;i++){
		bigImgLi[i].style.zIndex = -i;
	}
	
	//初始化当前显示大图对应小图的透明度
	START_MOVE(miniImgLi[nowNum],{opacity:100},5);
    
    //初始化小图位置
	for(i=0;i<miniImgLi.length;i++){
		miniImgLi[i].style.left = (135*i)+"px"; 
	}
    
    //封装大图和小图运动过程
    function imgChange(){
    	
    	//大图运动过程
    	bigImgLi[nowNum].style.zIndex = nowZIndex++;
		bigImgLi[nowNum].style.height = 0;
		START_MOVE(bigImgLi[nowNum],{height:300},5);
		
		//小图运动过程
		for(i=0;i<miniImgLi.length;i++){
			START_MOVE(miniImgLi[i],{opacity:60},5);
		}
		START_MOVE(miniImgLi[nowNum],{opacity:100},5);
		if(nowNum==0){
			START_MOVE(miniImgUl,{left:0},5);
			console.log("nowNum是0");
		}else if(nowNum==4){
			START_MOVE(miniImgUl,{left:-270},5);
			console.log("nowNum是4");
		}else{
			START_MOVE(miniImgUl,{left:-135*(nowNum-1)},5);
			console.log("nowNum是1-3");
		}
    }
    
    //封装上一张图片函数
    function NEXT(){
    	nowNum++;
		if(nowNum==bigImgLi.length){
			nowNum=0;
		}
		imgChange();
    }
    
    //封装下一张图片函数
    function PREV(){
    	nowNum--;
		if(nowNum<0){
			nowNum=bigImgLi.length-1;
		}
		imgChange();
    }
    
    //给每个小图添加功能
    for(i=0;i<miniImgLi.length;i++){
    	miniImgLi[i].index = i;
    	
    	//添加点击功能
    	miniImgLi[i].onclick = function(){
    		if(this.index==nowNum){
    			return;
    		}else{
    			nowNum=this.index;
    		}
    		imgChange();
    	}
    	
    	//添加移入移出功能
    	miniImgLi[i].onmouseover = function(){
			START_MOVE(this,{opacity:100},5);
    	}
    	miniImgLi[i].onmouseout = function(){
    		if(this.index==nowNum){
    			return;
    		}else{
    			START_MOVE(this,{opacity:60},5);
				console.log("out");
    		}
    	}
    }
    
    //下一张图片按钮
	Next.onclick = function(){
		NEXT();
	}
	
	//上一张图片按钮
	Prev.onclick = function(){
		PREV();
	}
	
	//左右鼠标移入移出功能
	topRight.onmouseover = function(){
		START_MOVE(topRight,{opacity:100},5);
	}
	topRight.onmouseout = function(){
		START_MOVE(topRight,{opacity:0},5);
	}
	topLeft.onmouseover = function(){
		START_MOVE(topLeft,{opacity:100},5);
	}
	topLeft.onmouseout = function(){
		START_MOVE(topLeft,{opacity:0},5);
	}
	
	//添加自动播放
	var timer = setInterval(NEXT,2000);
	
	//鼠标移入移出整个活动区域
	outside.onmouseover = function(){
		clearInterval(timer);
	}
	outside.onmouseout = function(){
		timer = setInterval(NEXT,2000);
	}
}