define(function(){
	function Gl(){};
	Gl.prototype.magni = function(opt){
		var oMagni = new Magni(opt);
		oMagni.createMagniCss();
		oMagni.magni();
	}
	function Magni(opt){
		this.ID = opt.ID;
		this.magniWidth = opt.magniWidth;
		this.magniHeight = opt.magniHeight;
	}
	Magni.prototype.createMagniCss = function(){
		var cssString = '.magni{height:100%;position:relative;overflow:hidden;}.fdj_cover{position:absolute;width:100px;height:100px;border:1px solid red;left:0;top:0;cursor:move;background-color:#fff;opacity:0.5;filter:alpha(opacity=50);display:none;}.fdj_cover.active{display:block;}.fdj_big_pic{position:absolute;z-index:10000;border:1px solid #000;width:360px;height:360px;overflow:hidden;display:none;}.fdj_big_pic.active{display:block;}';
		createStyle(cssString);
	}
	Magni.prototype.magni = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var innerHTML = oParent.innerHTML;
		
		oParent.innerHTML = '';
		var oMagni = document.createElement('div');
		oMagni.innerHTML = innerHTML;
		addClass(oMagni,'magni');
		oParent.appendChild(oMagni);
		var oCover = document.createElement('a');
		oCover.href = 'javascript:void(0);';
		addClass(oCover,'fdj_cover');
		oMagni.appendChild(oCover);
		
		var oSmallImg = oMagni.getElementsByTagName('img')[0];
		var src = oSmallImg.getAttribute('src');
		
		var oBigPic = document.createElement('div');
		addClass(oBigPic,'fdj_big_pic');
		oBigPic.innerHTML = '<img src="">';
		oBigPic.getElementsByTagName('img')[0].setAttribute('src',src);
		oParent.appendChild(oBigPic);
		oBigPic.style.left = getPos(oMagni).left + oMagni.offsetWidth + 20 + 'px';
		oBigPic.style.top =  getPos(oMagni).top + 'px';
		
		
		oMagni.onmousemove = function(ev){
			var oEvent = ev || event;
		   	var iX = oEvent.pageX - getPos(this).left - oCover.offsetWidth/2,
		   		iY = oEvent.pageY - getPos(this).top - oCover.offsetHeight/2,	
		   		MaxX = oMagni.offsetWidth - oCover.offsetWidth,
		   		MaxY = oMagni.offsetHeight - oCover.offsetHeight;
				
		   	iX = iX > 0 ? iX : 0;
		   	iX = iX < MaxX ? iX : MaxX;
		   	iY = iY > 0 ? iY : 0;
		   	iY = iY < MaxY ? iY : MaxY;	
			
			oCover.style.left = iX + 'px';
			oCover.style.top = iY + 'px';
			addClass(oCover,'active');
			addClass(oBigPic,'active');


			var multiple = oBigPic.clientWidth/oCover.clientWidth;
			oBigPic.children[0].style.width = multiple*oMagni.clientWidth + 'px';
			oBigPic.getElementsByTagName('img')[0].style.marginLeft = -iX*multiple  + 'px';
			oBigPic.getElementsByTagName('img')[0].style.marginTop = -iY*multiple + 'px';
		}
		oCover.onmouseout = function(){
			removeClass(oBigPic,'active');
			removeClass(this,'active');
		}
	}
	return new Gl();
})