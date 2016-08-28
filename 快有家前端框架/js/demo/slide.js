define(function(){
	//Gl
	function Gl(){};
	Gl.prototype.slide = function(opt){
		var oSlide = new Slide(opt);
		oSlide.createNomalCss();
			oSlide.slide();
	}
	//slide
	function Slide(opt){
		this.ID = opt.ID;
		this.slideTitle = opt.slideTitle;
		this.slideCon = opt.slideCon;
		this.moveTime = opt.moveTime;
		this.events = opt.events;
		this.moveType = opt.moveType;
		this.moveEnd = opt.moveEnd;
		this.active = opt.active;
		this.slideDir = opt.slideDir;
		this.opened = opt.opened;
	}
	Slide.prototype.createNomalCss = function(){
		var cssString = '.slide{width:100%;height:100%;position:relative;overflow:hidden;}.slide_title{position:absolute;z-index:2;}.slide_con{position:absolute;z-index:1;}';
		createStyle(cssString);
	}
	Slide.prototype.slide = function(){
		var This = this;
		var aResult = [];
		var oParent = document.getElementById(this.ID);
		var oSlide = document.createElement('div');
		var events = this.events;
		oSlide.className = 'slide';
		oSlideTitle = getByClass(oParent,this.slideTitle)[0];
		addClass(oSlideTitle,'slide_title');
		oSlideCon = getByClass(oParent,this.slideCon)[0];
		addClass(oSlideCon,'slide_con');
		oSlideCon.setAttribute('onOff','true');
		oSlide.appendChild(oSlideTitle);
		oSlide.appendChild(oSlideCon);
		oParent.appendChild(oSlide);
		if(this.opened != 'true' && this.slideDir == 'slideLeft'){
			oParent.style.width = oSlideTitle.offsetWidth + 'px';
			oSlideTitle.style.left = 0 + 'px';
			oSlideCon.style.left = -(oSlideCon.offsetWidth - oSlideTitle.offsetWidth) + 'px';
		}
		if(this.opened == 'true' && this.slideDir == 'slideLeft'){
			oParent.style.width = (oSlideTitle.offsetWidth + oSlideCon.offsetWidth) + 'px';
			oSlideTitle.style.left = 0 + 'px';
			oSlideCon.style.left = oSlideTitle.offsetWidth + 'px';
		}
		if(this.opened != 'true' && this.slideDir == 'slideRight'){
			oParent.style.width = oSlideTitle.offsetWidth + 'px';
			oSlideTitle.style.right = 0 + 'px';
			oSlideCon.style.right = -(oSlideCon.offsetWidth - oSlideTitle.offsetWidth) + 'px';
		}
		if(this.opened == 'true' && this.slideDir == 'slideRight'){
			oParent.style.width = (oSlideCon.offsetWidth + oSlideTitle.offsetWidth) + 'px';
			oSlideTitle.style.right = 0 + 'px';
			oSlideCon.style.right = oSlideTitle.offsetWidth + 'px';
		}
		oSlideTitle['on'+events] = function(){
			oSlideTitle = getByClass(oParent,This.slideTitle)[0];
			oSlideCon = getByClass(oParent,This.slideCon)[0];
			var timeSpace = testTime(aResult);
			if(timeSpace < This.moveTime){
				return false;
			};
			var onOff = oSlideCon.getAttribute('onOff');
			if(onOff == 'true'){
				if(This.opened != 'true' && This.slideDir == 'slideLeft'){
					oParent.style.width =  (oSlideTitle.offsetWidth + oSlideCon.offsetWidth) + 'px';
					startMove(oSlideCon,{left: oSlideTitle.offsetWidth},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','false');
						addClass(oSlideTitle,This.active);
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
				if(This.opened == 'true' && This.slideDir == 'slideLeft'){
					startMove(oSlideCon,{left: -(oSlideCon.offsetWidth - oSlideTitle.offsetWidth)},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','false');
						addClass(oSlideTitle,This.active);
						oParent.style.width =  oSlideTitle.offsetWidth + 'px';
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
				if(This.opened != 'true' && This.slideDir == 'slideRight'){
					oParent.style.width =  (oSlideTitle.offsetWidth + oSlideCon.offsetWidth) + 'px';
					startMove(oSlideCon,{right: oSlideTitle.offsetWidth},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','false');
						addClass(oSlideTitle,This.active);
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
				if(This.opened == 'true' && This.slideDir == 'slideRight'){
					startMove(oSlideCon,{right: -(oSlideCon.offsetWidth - oSlideTitle.offsetWidth)},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','false');
						addClass(oSlideTitle,This.active);
						oParent.style.width =  oSlideTitle.offsetWidth + 'px';
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
			}else{
				if(This.opened != 'true' && This.slideDir == 'slideLeft'){
					startMove(oSlideCon,{left: -(oSlideCon.offsetWidth - oSlideTitle.offsetWidth)},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','true');	
						removeClass(oSlideTitle,This.active);
						oParent.style.width = oSlideTitle.offsetWidth + 'px';
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
				if(This.opened == 'true' && This.slideDir == 'slideLeft'){
					oParent.style.width =  (oSlideTitle.offsetWidth + oSlideCon.offsetWidth) + 'px';
					startMove(oSlideCon,{left: oSlideTitle.offsetWidth},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','true');	
						removeClass(oSlideTitle,This.active);
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
				if(This.opened != 'true' && This.slideDir == 'slideRight'){
					startMove(oSlideCon,{right: -(oSlideCon.offsetWidth - oSlideTitle.offsetWidth)},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','true');	
						removeClass(oSlideTitle,This.active);
						oParent.style.width = oSlideTitle.offsetWidth + 'px';
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
				if(This.opened == 'true' && This.slideDir == 'slideRight'){
					oParent.style.width =  (oSlideTitle.offsetWidth + oSlideCon.offsetWidth) + 'px';
					startMove(oSlideCon,{right: oSlideTitle.offsetWidth},This.moveTime,This.moveType,function(){
						oSlideCon.setAttribute('onOff','true');	
						removeClass(oSlideTitle,This.active);
						if(This.moveEnd){
							This.moveEnd();
						}
					});
				};
			};
		}
	}
	return new Gl;
})
