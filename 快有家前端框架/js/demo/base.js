//getStyle
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
//getPos
function getPos(obj) {
	var pos = {left:0, top:0};
	while (obj) {
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return pos;
}
//getByClass
function getByClass(oParent,sClass){
	var arr = [];
	var aEle = oParent.getElementsByTagName('*');
	
	//var re = /sClass/;  //当正则需要传参的时候，一定要用全称的写法
	var re = new RegExp('\\b'+sClass+'\\b');
	
	for(var i=0;i<aEle.length;i++){
		if( re.test(aEle[i].className) ){
			arr.push( aEle[i] );
		}
	}
	return arr;
};
//addClass,removeClass,toggleClass
function hasClass(obj, cls) {  
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
function addClass(obj, cls) {  
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
function removeClass(obj, cls) {  
	if (hasClass(obj, cls)) {  
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
		obj.className = obj.className.replace(reg, ' ');  
	}  
}  
function toggleClass(obj,cls){  
	if(hasClass(obj,cls)){  
		removeClass(obj, cls);  
	}else{  
		addClass(obj, cls);  
	}  
}  
function toggleClassTest(){  
	var obj = document. getElementById('test');  
	toggleClass(obj,"testClass");  
}  
//绑定触发的事件
function bindEvent(obj,events,fn){
	obj.listeners = obj.listeners || {};
	obj.listeners[events] = obj.listeners[events] || [];
	obj.listeners[events].push(fn);
	
	if(obj.addEventListener){
		obj.addEventListener(events,fn,false);
	}else{ 
		obj.attachEvent('on'+events,fn);
	};
};
//删除触发的事件
function removeEvent(obj,events,fn){
	obj.listeners = obj.listeners || {};
	obj.listeners[events] = obj.listeners[events] || [];
	obj.listeners[events].push(fn);
	
	if(obj.removeEventListener){
		obj.removeEventListener(events,fn,false);
	}else{
		obj.detachEvent('on'+events,fn);
	};
};
//测试鼠标按起和第二次按下之间的时间差
function testTime(aResult){
	var t = new Date();
	t1 = t.getTime();
	aResult.unshift(t1);
	aResult.length  = 2;
	if(aResult[1]){
		var end = aResult[0] - aResult[1];
	}else{
		var end = aResult[0];
	};
	return end;
};
//动态在头部添加style标签
function createStyle(cssString){  
	var oStyle=document.createElement("style");  
	oStyle.setAttribute("type", "text/css");  
	if(oStyle.styleSheet){// IE  
		oStyle.styleSheet.cssText = cssString;  
	} else {// w3c  
		var cssText = document.createTextNode(cssString);  
		oStyle.appendChild(cssText);  
	}  
	var heads = document.getElementsByTagName("head");  
	if(heads.length){  
		heads[0].appendChild(oStyle);  
	}else{
		document.documentElement.appendChild(oStyle);  
	}
}
//阻止冒泡
function stopBubble(e) { 
	if ( e && e.stopPropagation ){
	    //非ie
		e.stopPropagation(); 
	}else {
		//ie
		window.event.cancelBubble = true; 
	}
}
//阻止浏览器的默认行为 
function stopDefault( e ) { 
    if ( e && e.preventDefault ){ 
	    //非ie
        e.preventDefault(); 
	}else{ 
	    //ie
        window.event.returnValue = false; 
	}
    return false; 
}
//鼠标滚轮事件
function scrollFunc(e){ 
	e=e || window.event; 
	var direct;
	if(e.wheelDelta){
		//IE/Opera/Chrome 
		if(e.wheelDelta==120){ 
			//向上滚动事件 
			direct = false; 
		}else{ 
			//向下滚动事件 
			direct = true;  
		};
	}else if(e.detail){ 
		//Firefox 
		if(e.detail==-3) { 
			//向上滚动事件<br> 
			direct = false; 
		}else { 
			//向下滚动事件<br> 
			direct = true; 
		};
	};
	return direct; 
}; 
