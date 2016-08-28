;(function createCss(){
	//检验简写的css的规则
	var aRule = [
		//width
		/^w\d+$/g,
		/^w_auto$/g,
		//height
		/^h\d+$/g,
		/^lh\d+$/g,
		/^h_auto$/g,
		//margin
		/^m\d+$/g,
		/^mt\d+$/g,
		/^mb\d+$/g,
		/^mL\d+$/g,
		/^mr\d+$/g,
		/^m_\d+$/g,
		/^mt_\d+$/g,
		/^mb_\d+$/g,
		/^mL_\d+$/g,
		/^mr_\d+$/g,
		/^m_auto$/g,
		/^mL_auto$/g,
		//padding
		/^p\d+$/g,
		/^pt\d+$/g,
		/^pb\d+$/g,
		/^pL\d+$/g,
		/^pr\d+$/g,
		//border
		/^bd\d+$/g,
		/^bdt\d+$/g,
		/^bdb\d+$/g,
		/^bdL\d+$/g,
		/^bdr\d+$/g,
		//display
		/^dis_b$/g,
		/^dis_ib$/g,
		/^dis_i$/g,
		/^dis_n$/g,
		//position
		/^pos_f$/g,
		/^pos_r$/g,
		/^pos_a$/g,
		/^pos_s$/g,
		/^z\d+$/g,
		//left
		/^L\d+$/g,
		/^L_\d+$/g,
		/^LB\d+$/g,
		//right
		/^r\d+$/g,
		/^r_\d+$/g,
		//top
		/^t\d+$/g,
		/^t_\d+$/g,
		/^TB\d+$/g,
		//bottom
		/^b\d+$/g,
		/^b_\d+$/g,
		//float
		/^fl$/g,
		/^fr$/g,
		//font-size
		/^font\d+$/g,
		/^bold$/g,
		/^thin$/g,
		//color
		/^col[A-F0-9]{3,6}$/g,
		/^bdc[A-F0-9]{3,6}$/g,
		/^bgc[A-F0-9]{3,6}$/g,
		//opacity
		/^opc\d+$/g,
		//text-align
		/^ta_l$/g,
		/^ta_c$/g,
		/^ta_r$/g,
		/^ti\d+$/g,
		/^ti_\d+$/g,
		//text-decoration
		/^td_u$/g,
		/^td_n$/g,
		//overflow
		/^hide$/g,
		/^over_auto$/g,
		/^text_hide$/g,
		//cursor
		/^cur_p$/g,
		/^cur_d$/g,
		//border-radius
		/^radius\d+$/g,
		//transition
		/^tra\d+$/g,
		//square
		/^s\d+$/g,
		//cricle
		/^c\d+$/g
	];
	//设置样式表的初始值未空字符串
	var str = '';
	//获取dom节点,对每个dom节点进行处理，并把简写的css储存在str中
	var aE = document.getElementsByTagName('*');
	for(var i=0,max1=aE.length;i<max1;i++){
		var sCss = aE[i].getAttribute('css');
		var sHover = aE[i].getAttribute('hover');
		if(sCss){
			aE[i].className += ' ' + sCss;
			aE[i].removeAttribute('css');
			str += ' ' + sCss;
		}
		if(sHover){
			aE[i].setAttribute('shover',sHover);
			aE[i].removeAttribute('hover');
			str += ' ' + sHover;
		}
	}
	//将储存在str中的简写的css进行拆分，并且数组去重
	var aClass = str.split(/\s+/g);
	clear(aClass);
	//将去重后的简写css进行检验，把符合校验规则的简写css重新组成有一个数组
	var aClassEnd = [];
	for(var i=0,max1=aClass.length;i<max1;i++){
		for(var j=0,max2=aRule.length;j<max2;j++){
			if(aClass[i].match(aRule[j])){
				aClassEnd.push(aClass[i]);
			}
		}
	}
	//把符合校验规则的简写css进行拆分，并添加到头部样式表中
	var oStyle = document.getElementById('auto');
	for(var i=0,max1=aClassEnd.length;i<max1;i++){
		if(oStyle.styleSheet){
			oStyle.styleSheet.cssText += '\n.' + aClassEnd[i] + '{' +rule(aClassEnd[i]) + '}';
		}else{
			oStyle.innerHTML += '\n.' + aClassEnd[i] + '{' +rule(aClassEnd[i]) + '}';
		}
	}
	//给dom元素添加hove属性
	document.body.onmouseover = function(ev){
		var ev = ev || window.event;
    	var target = ev.target || ev.srcElement;
		var sClass = target.className;
		var sHover = target.getAttribute('shover');
		if(sHover){
			target.className += ' ' + sHover;
			target.onmouseout = function(){
				this.className = sClass;
			}
		}
	}
	function clear(arr){
		for ( var i=0; i<arr.length; i++ ) {
			for ( var j=i+1; j<arr.length; j++ ) {
				if ( arr[i] == arr[j] ) {
					arr.splice( j, 1 );
					j--;
				}
			}
		}
	}
	//解析简写的规则
	function rule(str){
		var a;
		if(str.toString().match(/^[A-z\d]+$/) && !str.toString().match(/^col[A-F\d]{3,6}$/) && !str.toString().match(/^bdc[A-F\d]{3,6}$/) && !str.toString().match(/^bgc[A-F\d]{3,6}$/)){
			var attr = str.toString().match(/^[A-z]+_?/).toString();
			if(str.toString().match(/\d+$/)){
				var num = str.toString().match(/\d+$/).toString();
			}
		}
		if(str.toString().match(/^[colbdg]{3}[A-F\d]{3,6}$/)){
			var attr = str.toString().match(/^[colbdg]{3}/).toString();
			var num = str.toString().match(/[A-F\d]{3,6}$/).toString();
		}
		switch(attr){
			//width
			case 'w':
				a = 'width:' + num + 'px;';
			break;
			case 'w_auto':
				a = 'width:auto;';
			break;
			//height
			case 'h':
				a = 'height:' + num + 'px;';
			break;
			case 'h_auto':
				a = 'height:auto;';
			break;
			case 'lh':
				a = 'line-height:' + num + 'px;';
			break;
			//margin
			case 'm':
				a = 'margin:' + num + 'px;';
			break;
			case 'mt':
				a = 'margin-top:' + num + 'px;';
			break;
			case 'mb':
				a = 'margin-bottom:' + num + 'px;';
			break;
			case 'mL':
				a = 'margin-left:' + num + 'px;';
			break;
			case 'mr':
				a = 'margin-right:' + num + 'px;';
			break;
			case 'm_':
				a = 'margin:' + -num + 'px;';
			break;
			case 'mt_':
				a = 'margin-top:' + -num + 'px;';
			break;
			case 'mb_':
				a = 'margin-bottom:' + -num + 'px;';
			break;
			case 'mL_':
				a = 'margin-left:' + -num + 'px;';
			break;
			case 'mr_':
				a = 'margin-right:' + -num + 'px;';
			break;
			case 'm_auto':
				a = 'margin:0 auto;';
			break;
			case 'mL_auto':
				a = 'margin-left:auto;';
			break;
			//padding
			case 'p':
				a = 'padding:' + num + 'px;';
			break;
			case 'pt':
				a = 'padding-top:' + num + 'px;';
			break;
			case 'pb':
				a = 'padding-bottom:' + num + 'px;';
			break;
			case 'pL':
				a = 'padding-left:' + num + 'px;';
			break;
			case 'pr':
				a = 'padding-right:' + num + 'px;';
			break;
			//border
			case 'bd':
				a = 'border:' + num + 'px solid #000;';
			break;
			case 'bdt':
				a = 'border-top:' + num + 'px solid #000;';
			break;
			case 'bdb':
				a = 'border-bottom:' + num + 'px solid #000;';
			break;
			case 'bdL':
				a = 'border-left:' + num + 'px solid #000;';
			break;
			case 'bdr':
				a = 'border-right:' + num + 'px solid #000;';
			break;
			//display
			case 'dis_b':
				a = 'display:block;';
			break;
			case 'dis_ib':
				a = 'display:inline-block;';
			break;
			case 'dis_i':
				a = 'display:inline;';
			break;
			case 'dis_n':
				a = 'display:none;';
			break;
			//position
			case 'pos_f':
				a = 'position:fixed;';
			break;
			case 'pos_r':
				a = 'position:relative;';
			break;
			case 'pos_a':
				a = 'position:absolute;';
			break;
			case 'pos_s':
				a = 'position:static;';
			break;
			case 'z':
				a = 'z-index:' + num + ';';
			break;
			//left
			case 'L':
				a = 'left:' + num + 'px;';
			break;
			case 'L_':
				a = 'left:' + -num + 'px;';
			break;
			case 'LB':
				a = 'left:' + num + '%;';
			break;
			//right
			case 'r':
				a = 'right:' + num + 'px;';
			break;
			case 'r_':
				a = 'right:' + -num + 'px;';
			break;
			//top
			case 't':
				a = 'top:' + num + 'px;';
			break;
			case 't_':
				a = 'top:' + -num + 'px;';
			break;
			case 'TB':
				a = 'top:' + num + '%;';
			break;
			//bottom
			case 'b':
				a = 'bottom:' + num + 'px;';
			break;
			case 'b_':
				a = 'bottom:' + -num + 'px;';
			break;
			//float
			case 'fl':
				a = 'float:left;';
			break;
			case 'fr':
				a = 'float:right;';
			break;
			//font-size
			case 'font':
				a = 'font-size:' + num + 'px;';
			break;
			case 'bold':
				a = 'font-weight:bold;';
			break;
			case 'thin':
				a = 'font-weight:normal;';
			break;
			//color
			case 'col':
				a = 'color:#' + num + ';';
			break;
			case 'bdc':
				a = 'border-color:#' + num + ';';
			break;
			case 'bgc':
				a = 'background-color:#' + num + ';';
			break;
			//opacity
			case 'opc':
				a = 'opacity:' + num/100 + ';filter:alpha(opacity=' + num + ');';
			break;
			//text-align
			case 'ta_l':
				a = 'text-align:left;';
			break;
			case 'ta_c':
				a = 'text-align:center;';
			break;
			case 'ta_r':
				a = 'text-align:right;';
			break;
			case 'ti':
				a = 'text-indent:' + num + 'em;';
			break;
			case 'ti_':
				a = 'text-indent:' + -num + 'em;';
			break;
			//text-decoration
			case 'td_u':
				a = 'text-decoration:underline;';
			break;
			case 'td_n':
				a = 'text-decoration:none;';
			break;
			//overflow
			case 'hide':
				a = 'overflow:hidden;';
			break;
			case 'over_auto':
				a = 'overflow:auto;';
			break;
			case 'text_hide':
				a = 'overflow:hidden;text-overflow:ellipsis;white-space: nowrap;';
			break;
			//cursor
			case 'cur_p':
				a = 'cursor:pointer;';
			break;
			case 'cur_d':
				a = 'cursor:default;';
			break;
			//border-radius
			case 'radius':
				a = 'border-radius:' + num + 'px;';
			break;
			//transition
			case 'tra':
				a = 'transition:' + num + 'ms;';
			break;
			//square
			case 's':
				a = 'width:' + num + 'px;height:' + num + 'px;';
			break;
			//cricle
			case 'c':
				a = 'width:' + num + 'px;height:' + num + 'px;border-radius:50%;';
			break;
		}
		return a;
	}
	//函数自执行
	var timer;
	clearInterval(timer);
	timer = setTimeout(createCss,100);
})();