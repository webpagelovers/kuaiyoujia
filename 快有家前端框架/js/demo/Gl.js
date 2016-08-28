define(function(){
	//Gl
	function Gl(){};
	Gl.prototype.focusMap = function(opt){
		var oFocus = new FocusMap(opt);
		oFocus.createNomalCss();
		oFocus.normal();
	}
	Gl.prototype.fadeIn = function(opt){
		var oFocus = new FocusMap(opt);
		oFocus.createFadeInCss();
		oFocus.fadeIn();
	}
	Gl.prototype.showBig = function(opt){
		var oShowBig = new ShowBig(opt);
		oShowBig.createShowBigCss();
		oShowBig.showBig();
	}
	Gl.prototype.tab = function(opt){
		var oTab = new Tab(opt);
		oTab.createNomalCss();
		oTab.tab();
	}
	Gl.prototype.menu = function(opt){
		var oMenu = new Menu(opt);
		if(opt.type == 'default'){
			oMenu.createNomalCss();
			oMenu.menuNomal();
		}else if(opt.type == 'fade'){
			oMenu.createFadeCss();
			oMenu.menuFade();
		}
	}
	Gl.prototype.selected = function(opt){
		var oSelected = new Selected(opt);
		oSelected.createNomalCss();
		if(opt.type == 'default'){
			oSelected.selectedNomal();
		}else if(opt.type == 'click'){
			oSelected.selectedClick();
		}
	}
	Gl.prototype.selectAll = function(opt){
		var oSelectAll = new SelectAll(opt);
		oSelectAll.createNomalCss();
		oSelectAll.selectall();
	}
	Gl.prototype.scroDetecNav = function(opt){
		var oScroDetecNav = new ScroDetecNav(opt);
		oScroDetecNav.createNomalCss();
		oScroDetecNav.scrodetecnav();
	}
	
	//FocusMap
	function FocusMap(opt){
		this.ID = opt.ID;
		this.timer = opt.timer;
		this.moveType = opt.moveType;
		this.moveTime = opt.moveTime;
		this.autoPlay = opt.autoPlay;
		this.autoPlayTime = opt.autoPlayTime;
		this.focusList = opt.focusList;
		this.iNow = opt.iNow;
		this.moveEnd = opt.moveEnd;
	}
	FocusMap.prototype.createNomalCss = function(){
		var cssString = '.focusmap{width:100%;height:100%;position:relative;}.focusmap_in{width:100%;height:100%;position:relative;overflow:hidden;}.focusmap_ul{width:200%;height:100%;position:absolute;left:0;top:0;}.focusmap_list{width:50%;height:100%;float:left}.focusmap .btn{width:30px;height:46px;background:pink;margin-top:-23px;cursor:pointer;position:absolute;}.focusmap .prev{left:0;top:50%;}.focusmap .next{right:0;top:50%;}.circle{position:absolute;left:0;bottom:0;right:0;text-align:center;height:30px;line-height:30px;overflow:hidden;}.circle_list{display:inline-block;font-size:30px;width:10px;height:10px;margin:0 5px;border-radius:50%;overflow:hidden;background:green;cursor:pointer;text-indent:-40px;}.circle_list.active{background:yellow;}';
		createStyle(cssString);
	}
	FocusMap.prototype.normal = function(){
		var This = this,clickStart = [];
		var oParent = document.getElementById(this.ID);
		var aList = [];
		var aLi = getByClass(oParent,this.focusList);
		
		for(var i=0;i<aLi.length;i++){
			var str = aLi[i].innerHTML;
			aList.push(str);
		}
		var oFocusMap = document.createElement('div');
		oFocusMap.className = 'focusmap';
		oFocusMap.style.position = 'relative';
		var oFocusMapIn = document.createElement('div');
		oFocusMapIn.className = 'focusmap_in';
		var oFocusMapUl = document.createElement('ul');
		oFocusMapUl.className = 'focusmap_ul';
		oParent.innerHTML = '';
		var oFocusMapList = document.createElement('li');
		oFocusMapList.className = 'focusmap_list';
		oFocusMapList.setAttribute('count',this.iNow);
		oFocusMapList.innerHTML = aList[this.iNow];
		oFocusMapUl.appendChild(oFocusMapList);
		oFocusMapIn.appendChild(oFocusMapUl);
		oFocusMap.appendChild(oFocusMapIn);
		oParent.appendChild(oFocusMap);
		var oPrev = document.createElement('span');
		oPrev.className = 'btn prev';
		oFocusMap.appendChild(oPrev);
		var oNext = document.createElement('span');
		oNext.className = 'btn next';
		oFocusMap.appendChild(oNext);
		var oCircle = document.createElement('p');
		oCircle.className = 'circle';
		for(var i=0;i<aList.length;i++){
			var oCircleList = document.createElement('span');
			oCircleList.setAttribute('count',i);
			if(i == this.iNow){
				oCircleList.className = 'circle_list active';
			}else{
				oCircleList.className = 'circle_list';
			};
			oCircle.appendChild(oCircleList);
		};
		oFocusMap.appendChild(oCircle);
		
		aCircleList = getByClass(oParent,'circle_list');
		
		oPrev.onclick = function(){
			var timeSpace = testTime(clickStart);
			iNow = This.iNow;
			if(timeSpace < This.moveTime){
				return false;
			}else{
				if(iNow <= 0){
					iNow = aList.length-1;
				}else{
					iNow--;
				};
			};
			This.iNow = iNow;
			change(oFocusMapUl,-1,iNow);
			circleTab(aCircleList,iNow);
		}
		oNext.onclick = function(){
			var timeSpace = testTime(clickStart);
			iNow = This.iNow;
			if(timeSpace < This.moveTime){
				return false;
			}else{
				if(iNow >= aList.length-1){
					iNow = 0;
				}else{
					iNow++;
				};
			};
			This.iNow = iNow;
			change(oFocusMapUl,1,iNow);
			circleTab(aCircleList,iNow);
		}
		var aCircleList = getByClass(oParent,'circle_list');
		for(var i=0;i<aCircleList.length;i++){
			aCircleList[i].index = i;
			aCircleList[i].onclick = function(){
				var iNow = this.index;
				var num = This.iNow;
				This.iNow = iNow;
				if(iNow > num){
					change(oFocusMapUl,1,iNow);
				}else if(iNow < num){
					change(oFocusMapUl,-1,iNow);
				};
				circleTab(aCircleList,iNow);
			}
		}
		if(this.autoPlay == 'true'){
			this.timer = setInterval(oNext.onclick,This.autoPlayTime);
			oParent.onmouseover = function(){
				clearInterval(This.timer);	
			}
			oParent.onmouseout = function(){
				This.timer = setInterval(oNext.onclick,This.autoPlayTime);	
			}
		}
		function circleTab(arr,iNow){
			for(var i=0;i<arr.length;i++ ){
				if(i == iNow){
					arr[i].className = 'circle_list active';
				}else{
					arr[i].className = 'circle_list';
				};
			};
		}
		function change(oUl,dir,iNow){
			var oLi = document.createElement('li');
			oLi.className = 'focusmap_list';
			oLi.setAttribute('count',iNow);
			oLi.innerHTML = aList[iNow];
			if(dir == 1){
				oUl.appendChild(oLi);
				W = oLi.offsetWidth;
				oUl.style.left = 0 + 'px';
				startMove(oUl,{left:-W},This.moveTime,This.moveType,function(){
					var oLi = oUl.children[0];
					oUl.removeChild(oLi);
					oUl.style.left = '0px';
				});
			}else if(dir == -1){
				oUl.insertBefore(oLi,oUl.children[0]);
				W = oLi.offsetWidth;
				oUl.style.left = -W + 'px';	
				startMove(oUl,{left: 0},This.moveTime,This.moveType,function(){
					var oLi = oUl.children[1];
					oUl.removeChild(oLi);
				});
			};
			if(This.moveEnd){
				This.moveEnd();
			};
		}
	}
	FocusMap.prototype.createFadeInCss = function(){
		var cssString = '.fadeIn{width:100%;height:100%;position:relative;}.fadelist{position:absolute;width:100%;height:100%;opacity:0;filter:alpha(opacity=0);z-index:1;}.fadelist.active{opacity:1;filter:alpha(opacity=100);z-index:2;}.fadeIn .btn{width:30px;height:46px;background:pink;margin-top:-23px;cursor:pointer;position:absolute;z-index:3;}.fadeIn .prev{left:0;top:50%;}.fadeIn .next{right:0;top:50%;}.fadecircle{position:absolute;left:0;bottom:0;right:0;z-index:3;text-align:center;height:30px;line-height:30px;overflow:hidden;}.fadecirclelist{display:inline-block;font-size:30px;width:10px;height:10px;margin:0 5px;border-radius:50%;overflow:hidden;background:green;cursor:pointer;text-indent:-40px;}.fadecirclelist.active{background:yellow;}';
		createStyle(cssString);
	}
	FocusMap.prototype.fadeIn = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var aList = [];
		var aLi = getByClass(oParent,this.focusList);
		for(var i=0;i<aLi.length;i++){
			var str = aLi[i].innerHTML;
			aList.push(str);
		};
		oParent.innerHTML = '';
		
		var oFadeIn = document.createElement('div');
		oFadeIn.className = 'fadeIn';
		for(var i=0;i<aList.length;i++){
			var oFadeList = document.createElement('div');
			if(i == this.iNow){
				oFadeList.className = 'fadelist active';
			}else{
				oFadeList.className = 'fadelist';
			};
			oFadeList.innerHTML = aList[i];
			oFadeIn.appendChild(oFadeList);
		}
		var oPrev = document.createElement('span');
		oPrev.className = 'btn prev';
		oFadeIn.appendChild(oPrev);
		var oNext = document.createElement('span');
		oNext.className = 'btn next';
		oFadeIn.appendChild(oNext);
		var oFadeCircle = document.createElement('div');
		oFadeCircle.className = 'fadecircle';
		for(var i=0;i<aList.length;i++){
			var oFadeCircleList = document.createElement('span');
			if(i == this.iNow){
				oFadeCircleList.className = 'fadecirclelist active';
			}else{
				oFadeCircleList.className = 'fadecirclelist';
			};
			oFadeCircleList.innerHTML = i;
			oFadeCircleList.setAttribute('count',i);
			oFadeCircle.appendChild(oFadeCircleList);
		};
		oFadeIn.appendChild(oFadeCircle);
		oParent.appendChild(oFadeIn);
		
		var aFadeList = getByClass(oParent,'fadelist');
		var aFadeCircleList = getByClass(oParent,'fadecirclelist');
		oPrev.onclick = function(){
			var iNow = This.iNow;
			if(iNow == 0){
				iNow = aList.length-1;
			}else{
				iNow--;
			};
			This.iNow = iNow;
			fadeListTab(aFadeCircleList,aFadeList,iNow);
		}
		oNext.onclick = function(){
			var iNow = This.iNow;
			if(iNow == aList.length-1){
				iNow = 0;
			}else{
				iNow++;
			};
			This.iNow = iNow;
			fadeListTab(aFadeCircleList,aFadeList,iNow);
		}
		for(var i=0;i<aFadeCircleList.length;i++){
			aFadeCircleList[i].index = i;
			aFadeCircleList[i].onclick = function(){
				var iNow = this.index;
				fadeListTab(aFadeCircleList,aFadeList,iNow);
			};
		};
		function fadeListTab(arr1,arr2,iNow){
			for(var i=0;i<arr1.length;i++){
				if(i == iNow){
					arr1[i].className = 'fadecirclelist active';
					(function(){
						var This = arr2[i];
						startMove(arr2[iNow],{opacity:100},This.moveTime,This.moveType,function(){
							This.className = 'fadelist active';
						});
					})();
				}else{
					arr1[i].className = 'fadecirclelist';
					(function(){
						var This = arr2[i];
						startMove(arr2[i],{opacity:0},This.moveTime,This.moveType,function(){
							This.className = 'fadelist';
						});
					})();
				};
			};
			if(This.moveEnd){
				This.moveEnd();
			};
		}
		if(this.autoPlay == 'true'){
			this.timer = setInterval(oNext.onclick,This.autoPlayTime);
			oFadeIn.onmouseover = function(){
				clearInterval(This.timer);
			}
			oFadeIn.onmouseout = function(){
				This.timer = setInterval(oNext.onclick,This.autoPlayTime);
			}
		}
	}
	//showBig
	function ShowBig(opt){
		this.ID = opt.ID;
		this.moveType = opt.moveType;
		this.moveTime = opt.moveTime;
		this.bigList = opt.bigList;
		this.smallList = opt.smallList;
		this.iNow = opt.iNow;
		this.moveEnd = opt.moveEnd;
		this.view = opt.view;
		this.spacing = opt.spacing;
	}
	ShowBig.prototype.createShowBigCss = function(){
		var cssString = '.show_big{height:100%;position:relative;}.big_list{height:75%;border:1px solid #000;text-align:center;vertical-align:middle;}.big_list img{vertical-align:middle;}.big_list em{display:inline-block;width:0;overflow:hidden;height:100%;line-height:100%;vertical-align: middle;}.small_list{width:100%;overflow:hidden;position:relative;}.small_list ul{position:absolute;left:0;top:0;height:100%;overflow:hidden;}.small_list li{float:left;height:100%;overflow:hidden;border:1px solid #000;text-align:center;vertical-align:middle;}.small_list li.active{border:1px solid red;}.small_list li img{vertical-align: middle;}.small_list li em{display:inline-block;width:0;overflow:hidden;height:100%;line-height:100%;vertical-align: middle;}.show_big .btn{width:30px;height:70px;background-color:blue;position:absolute;top:50%;margin-top:-70px;}.show_big .prev{left:0;}.show_big .next{right:0;}';
		createStyle(cssString);
	}
	ShowBig.prototype.showBig = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var oB = getByClass(oParent,this.bigList)[0];
		var oH = oParent.offsetHeight;
		var save_dom = [];
		var aSmallList = getByClass(oParent,this.smallList);
		for(var i=0;i<aSmallList.length;i++){
			save_dom.push(aSmallList[i].innerHTML);
		}
		
		oParent.innerHTML = '';
		var oShowBig = document.createElement('div');
		addClass(oShowBig,'show_big');
		oShowBig.style.height = oH + 'px';
		oParent.appendChild(oShowBig);
		
		var oBigList = document.createElement('div');
		addClass(oBigList,'big_list');
		oBigList.style.height = Math.round((oH-this.spacing-4)*3/4) + 'px';
		oBigList.innerHTML = save_dom[0] + '<em></em>';
		oShowBig.appendChild(oBigList);
		var oSmallList = document.createElement('div');
		addClass(oSmallList,'small_list');
		oSmallList.style.height = Math.round((oH-this.spacing-4)/4) + 'px';
		oSmallList.style.marginTop = this.spacing + 'px';
		oShowBig.appendChild(oSmallList);
		
		var oUl = document.createElement('ul');
		oUl.style.width = (oSmallList.offsetWidth + this.spacing)*this.view + 'px';
		
		for(var i=0;i<aSmallList.length;i++){
			var oLi = document.createElement('li');
			oLi.style.width = Math.floor((oSmallList.offsetWidth-(this.view-1)*this.spacing - this.view*2)/this.view) + 'px';
			oLi.style.height = oSmallList.offsetHeight - 2 + 'px';
			oLi.style.marginRight = this.spacing + 'px';
			oLi.innerHTML = save_dom[i] + '<em></em>';
			oUl.appendChild(oLi);
		}
		oSmallList.appendChild(oUl);
		
		var oBtnLeft = document.createElement('a');
		oBtnLeft.className = 'btn prev';
		var oBtnRight = document.createElement('a');
		oBtnRight.className = 'btn next';
		oShowBig.appendChild(oBtnLeft);
		oShowBig.appendChild(oBtnRight);
		
		var move_iNow = 0;
		var active_iNow = 0;
		var oLeft = 0;
		var aList = oUl.getElementsByTagName('li');
		var W = aList[0].offsetWidth + this.spacing;
		var len = aList.length;
		
		addClass(aList[active_iNow],'active');
		for(var i=0;i<aList.length;i++){
			aList[i].setAttribute('index', i);
			aList[i].index = i;
			aList[i].onclick = function(){
				if(getByClass(oUl,'active')[0]){
					var old_num = getByClass(oUl,'active')[0].getAttribute('index');
				}
				for(var i=0;i<aList.length;i++){
					removeClass(aList[i],'active');
				}
				addClass(this,'active');
				move_iNow = active_iNow = this.index;
				slide_move(move_iNow);
			 	oBigList.innerHTML = save_dom[move_iNow] + '<em></em>';
			}
		}
		
		oBtnLeft.onclick = function(){
			 if(active_iNow <=0){
				 alert("没有上一张了！");
			 }else{
			   active_iNow--;  
			 };
			 for(var i=0;i<aList.length;i++){
				 removeClass(aList[i],'active');
			 }
			 addClass(aList[active_iNow],'active');
			 move_iNow = active_iNow;
			 slide_move(move_iNow);
			 oBigList.innerHTML = save_dom[move_iNow] + '<em></em>';
		}
		oBtnRight.onclick = function(){
			 if(active_iNow >=len-1){
				 alert("没有下一张了！");
			 }else{
			   active_iNow++;  
			 };
			 for(var i=0;i<aList.length;i++){
				 removeClass(aList[i],'active');
			 }
			 addClass(aList[active_iNow],'active');
			 move_iNow = active_iNow;
			 slide_move(move_iNow);
			 oBigList.innerHTML = save_dom[move_iNow] + '<em></em>';
		}
		function slide_move(move_iNow){
		   if(move_iNow <= 0){
			  return false;
		   }
		   if(move_iNow*W > (len-This.view)*W){
			   startMove(oUl,{left:-(len-This.view)*W},This.moveTime,This.moveType,function(){
					if(This.moveEnd){
						This.moveEnd();
					}
			   });
		   }else{
			   startMove(oUl,{left:-(move_iNow-1)*W},This.moveTime,This.moveType,function(){
					if(This.moveEnd){
						This.moveEnd();
					}
			   });
		   }
		}
	}
	//Tab
	function Tab(opt){
		this.ID = opt.ID;
		this.tabTitleList = opt.tabTitleList;
		this.tabConList = opt.tabConList;
		this.moveTime = opt.moveTime;
		this.events = opt.events;
		this.moveType = opt.moveType;
		this.moveEnd = opt.moveEnd;
		this.iNow = opt.iNow;
		this.moveEnd = opt.moveEnd;
	}
	Tab.prototype.createNomalCss = function(){
		var cssString = '.tab_con_list{display:none}.tab_con_list.active{display:block}';
		createStyle(cssString);
	}
	Tab.prototype.tab = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var events = this.events;
		var aTabTitleList = getByClass(oParent,this.tabTitleList);
		var aTabConList = getByClass(oParent,this.tabConList);
		var iNow = this.iNow;
		var autoPlay = this.autoPlay;
		var autoPlayTime = this.autoPlayTime;
		var timer;
		var events = this.events;
		var moveEnd = this.moveEnd;
		for(var i=0;i<aTabTitleList.length;i++){
			aTabTitleList[i].index = i;
			if(i == iNow){
				addClass(aTabTitleList[i],'active');
				addClass(aTabConList[i],'tab_con_list active');
			}else{
				addClass(aTabConList[i],'tab_con_list');
				removeClass(aTabTitleList[i],'active');
			}
			aTabTitleList[i]['on'+ events] = function(){
				for(var i=0;i<aTabTitleList.length;i++){
					removeClass(aTabTitleList[i],'active');
					removeClass(aTabConList[i],'active');
				};
				addClass(this,'active');
				addClass(aTabConList[this.index],'active');
				if(moveEnd){
					moveEnd();
				}
			}
		}
	}
	//Menu
	function Menu(opt){
		this.ID = opt.ID;
		this.menuTitle = opt.menuTitle;
		this.menuCon = opt.menuCon;
		this.moveTime = opt.moveTime;
		this.moveType = opt.moveType;
		this.moveEnd = opt.moveEnd;
		this.type = opt.type;
		this.timeSpace = opt.timeSpace;
		this.moveTime = opt.moveTime;
	}
	Menu.prototype.createNomalCss = function(){
		var cssString = '.menu{position:relative;}.menu_con{position:absolute;left:0;width:100%;display:none;}.menu_con.active{display:block;}';
		createStyle(cssString);
	}
	Menu.prototype.menuNomal = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var oMenuTitle = getByClass(oParent,this.menuTitle)[0];
		var oMenuCon = getByClass(oParent,this.menuCon)[0];
		var type = this.type;
		var timeSpace = this.timeSpace;
		var timer;
		
		addClass(oParent,'menu');
		addClass(oMenuTitle,'menu_title');
		addClass(oMenuCon,'menu_con');
		
		oMenuTitle.onmouseover = function(){
			clearTimeout(timer);
			addClass(oMenuCon,'active');
		}
		oMenuTitle.onmouseout = function(){
			timer = setTimeout(function(){
				removeClass(oMenuCon,'active');
			},timeSpace);
		}
		oMenuCon.onmouseover = function(){
			clearTimeout(timer);
			addClass(oMenuCon,'active');
		}
		oMenuCon.onmouseout = function(){
			timer = setTimeout(function(){
				removeClass(oMenuCon,'active');
			},timeSpace);
		}
	}
	Menu.prototype.createFadeCss = function(){
		var cssString = '.menu_fade{position:relative;}.menu_fade_con{position:absolute;left:0;width:100%;opacity:0;filter:alpha(opacity=0);display:none;}.menu_fade_con.active{display:block;}';
		createStyle(cssString);
	}
	Menu.prototype.menuFade = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var oMenuTitle = getByClass(oParent,this.menuTitle)[0];
		var oMenuCon = getByClass(oParent,this.menuCon)[0];
		var type = this.type;
		var mouseStart = [];
		var timeSpace = this.timeSpace;
		var moveTime = this.moveTime;
		var timer;
		
		addClass(oParent,'menu_fade');
		addClass(oMenuTitle,'menu_fade_title');
		addClass(oMenuCon,'menu_fade_con');
		
		oMenuTitle.onmouseover = function(){
			clearTimeout(timer);
			timeSpace = testTime(mouseStart);
			if(timeSpace < moveTime){
				return false;
			}
			addClass(oMenuCon,'active');
			startMove(oMenuCon,{opacity:100},moveTime,function(){
					
			});
		}
		oMenuTitle.onmouseout = function(){
			timer = setTimeout(function(){
				startMove(oMenuCon,{opacity:0},moveTime,function(){
					removeClass(oMenuCon,'active');
				});
			},moveTime);
		}
		oMenuCon.onmouseover = function(){
			clearTimeout(timer);
			timeSpace = testTime(mouseStart);
			if(timeSpace < moveTime){
				return false;
			}
			
			startMove(oMenuCon,{opacity:100},moveTime);
		}
		oMenuCon.onmouseout = function(){
			timer = setTimeout(function(){
				startMove(oMenuCon,{opacity:0},moveTime,function(){
					removeClass(oMenuCon,'active');	
				});
			},moveTime);
		}
	}
	//Selected
	function Selected(opt){
		this.ID = opt.ID;
		this.selectedTitle = opt.selectedTitle;
		this.selectedCon = opt.selectedCon;
		this.moveTime = opt.moveTime;
		this.moveType = opt.moveType;
		this.moveEnd = opt.moveEnd;
		this.type = opt.type;
		this.timeSpace = opt.timeSpace;
		this.moveTime = opt.moveTime;
	}
	Selected.prototype.createNomalCss = function(){
		var cssString = '.selected{position:relative;}.selected_con{position:absolute;left:0;width:100%;display:none;}.selected_con.active{display:block;}';
		createStyle(cssString);
	}
	Selected.prototype.selectedNomal = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var oSelectedTitle = getByClass(oParent,this.selectedTitle)[0];
		var oSelectedCon = getByClass(oParent,this.selectedCon)[0];
		var type = this.type;
		var timeSpace = this.timeSpace;
		var timer;
		var aList = oSelectedCon.children;
		
		addClass(oParent,'selected');
		addClass(oSelectedTitle,'selected_title');
		addClass(oSelectedCon,'selected_con');
		
		oSelectedTitle.onmouseover = function(){
			clearTimeout(timer);
			addClass(oSelectedCon,'active');
		}
		oSelectedTitle.onmouseout = function(){
			timer = setTimeout(function(){
				removeClass(oSelectedCon,'active');
			},timeSpace);
		}
		oSelectedCon.onmouseover = function(){
			clearTimeout(timer);
			addClass(oSelectedCon,'active');
		}
		oSelectedCon.onmouseout = function(){
			timer = setTimeout(function(){
				removeClass(oSelectedCon,'active');
			},timeSpace);
		}
		for(var i=0;i<aList.length;i++){
			aList[i].onclick = function(){
				var data = this.getAttribute('data');
				if(this.children[0]){
					var str = this.children[0].innerHTML;
				}else{
					var str = this.innerHTML;
				}
				oSelectedTitle.innerHTML = str;
				oSelectedTitle.setAttribute('data',data);
				removeClass(oSelectedCon,'active');
				if(This.moveEnd){
					This.moveEnd();
				}
			}
		}
	}
	Selected.prototype.selectedClick = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var oSelectedTitle = getByClass(oParent,this.selectedTitle)[0];
		var oSelectedCon = getByClass(oParent,this.selectedCon)[0];
		var type = this.type;
		var mouseStart = [];
		var timeSpace = this.timeSpace;
		var moveTime = this.moveTime;
		var timer;
		var aList = oSelectedCon.children;
		
		oParent.setAttribute('onOff','on');
		addClass(oParent,'selected');
		addClass(oSelectedTitle,'selected_title');
		addClass(oSelectedCon,'selected_con');
		
		oSelectedTitle.onclick = function(e){
			stopBubble(e)
			var onOff = oParent.getAttribute('onOff');
			if(onOff == 'on'){
				oParent.setAttribute('onOff','off');
				addClass(oSelectedCon,'active');
			}else{
				oParent.setAttribute('onOff','on');
				removeClass(oSelectedCon,'active');
			}
			for(var i=0;i<aList.length;i++){
				aList[i].onclick = function(){
					var data = this.getAttribute('data');
					if(this.children[0]){
						var str = this.children[0].innerHTML;
					}else{
						var str = this.innerHTML;
					}
					oSelectedTitle.innerHTML = str;
					oSelectedTitle.setAttribute('data',data);
					removeClass(oSelectedCon,'active');
					if(This.moveEnd){
						This.moveEnd();
					}
				}
			}
			document.onclick = function(){
				oParent.setAttribute('onOff','on');
				removeClass(oSelectedCon,'active');
			}
		}
	}
	//SelectAll
	function SelectAll(opt){
		this.ID = opt.ID;
		this.selectAll = opt.selectAll;
		this.selectNo = opt.selectNo;
		this.selectList = opt.selectList;
		this.moveEnd = opt.moveEnd;
	}
	SelectAll.prototype.createNomalCss = function(){
		var cssString = '.select_all{}.select_all.select_all_active{background-color:#c96;}.select_no{}.select_list{}.select_list.active{background-color:pink}';
		createStyle(cssString);
	}
	SelectAll.prototype.selectall = function(){
		var This = this;
		var oParent = document.getElementById(this.ID);
		var oSelectAll = getByClass(oParent,this.selectAll)[0];
		var oSelectNo = getByClass(oParent,this.selectNo)[0];
		var aSelectList = getByClass(oParent,this.selectList);
		
		addClass(oSelectAll,'select_all');
		addClass(oSelectNo,'select_no');
		oSelectAll.disabled = false;
		for(var i=0;i<aSelectList.length;i++){
			addClass(aSelectList[i],'select_list');
			aSelectList[i].checked = false;
		};
		for(var i=0;i<aSelectList.length;i++){
			aSelectList[i].onclick = function(){
				if(this.checked == true){
					if(this.parentNode.nodeName.toLowerCase() == 'label'){
						addClass(this.parentNode.parentNode,'active');
					}else{
						addClass(this.parentNode,'active');
					}
				}else{
					if(this.parentNode.nodeName.toLowerCase() == 'label'){
						removeClass(this.parentNode.parentNode,'active');
					}else{
						removeClass(this.parentNode,'active');
					}
				}
				count_active();
			}
		}
		function count_active(){
			var aActive = getByClass(oParent,'active');
			if(aActive.length == aSelectList.length){
				addClass(oSelectAll,'select_all_active');
				oSelectAll.disabled = true;
			}else{
				removeClass(oSelectAll,'select_all_active');
				oSelectAll.disabled = false;
			}
			if(This.moveEnd){
				This.moveEnd();	
			}
		}
		count_active();
		
		oSelectAll.onclick = function(){
			this.disabled = true;
			for(var i=0;i<aSelectList.length;i++){
				aSelectList[i].checked = true;
				if(aSelectList[i].parentNode.nodeName.toLowerCase() == 'label'){
					addClass(aSelectList[i].parentNode.parentNode,'active');
				}else{
					addClass(aSelectList[i].parentNode,'active');
				}
			}
			count_active();
		}
		
		oSelectNo.onclick = function(){
			for(var i=0;i<aSelectList.length;i++){
				if(aSelectList[i].checked == true){
					aSelectList[i].checked = false;
					if(aSelectList[i].parentNode.nodeName.toLowerCase() == 'label'){
						removeClass(aSelectList[i].parentNode.parentNode,'active');
					}else{
						removeClass(aSelectList[i].parentNode,'active');
					}
					
				}else{
					aSelectList[i].checked = true;
					if(aSelectList[i].parentNode.nodeName.toLowerCase() == 'label'){
						addClass(aSelectList[i].parentNode.parentNode,'active');
					}else{
						addClass(aSelectList[i].parentNode,'active');
					}
				}
			}
			count_active();
		}
	}
	//ScroDetecNav
	function ScroDetecNav(opt){
		this.ID = opt.ID;
		this.detecNavList = opt.detecNavList;
		this.detecConList = opt.detecConList;
		this.speed = opt.speed;
		this.moveEnd = opt.moveEnd;
	}
	ScroDetecNav.prototype.createNomalCss = function(){
		var cssString = '.scro_detec_nav.fixed{position:fixed;top:0;left:50%;margin-left:-500px;}';
		createStyle(cssString);
	}
	ScroDetecNav.prototype.scrodetecnav = function(){
		var This = this;
		var aDetecNavList = getByClass(document.body,this.detecNavList);
		var aDetecConList = getByClass(document.body,this.detecConList);
		var oParent = aDetecNavList[0].parentNode;
		var oTop = oParent.offsetTop;
		var num = 0;
		var scrollTop = 0;
		var timer = null;
		
		addClass(oParent,'scro_detec_nav');
		var oDiv = document.createElement('div');
		oDiv.className = 'scro_detec_nav_wraper';
		oDiv.style.height = oParent.offsetHeight + 'px';
		oParent.parentNode.insertBefore(oDiv,oParent);
		oDiv.appendChild(oParent);
		
		for(var i=0;i<aDetecNavList.length;i++){
			aDetecNavList[i].index = i;
			aDetecNavList[i].onclick = function(e){
				removeEvent(window,'scroll',changeClass);
				var target = aDetecConList[this.index].offsetTop;
				move(target,scrollTop);
				for(var i=0;i<aDetecNavList.length;i++){
					if(i == this.index){
						addClass(aDetecNavList[i],'active');
					}else{
						removeClass(aDetecNavList[i],'active');
					}
				}
			}
		}
		
		bindEvent(window,'scroll',controlFixed);
		bindEvent(window,'scroll',changeClass);
		
		function move(target,scrollTop){
			var speed = This.speed;
			if(speed >= 200){
				speed = 200;
			}
			if(target > scrollTop){
				timer = setInterval(function(){
					if(scrollTop >= target - speed){
						scrollTop = target;
						clearInterval(timer);
						bindEvent(window,'scroll',changeClass);
						if(This.moveEnd){
							This.moveEnd();
						}
					}else{
						scrollTop += speed;	
					};
					window.scrollTo(0,scrollTop);
				},30);
			}
			if(target < scrollTop){
				timer = setInterval(function(){
					if(scrollTop <= target + speed){
						scrollTop = target;
						clearInterval(timer);
						bindEvent(window,'scroll',changeClass);
						if(This.moveEnd){
							This.moveEnd();
						}
					}else{
						scrollTop -= speed;	
					}
					window.scrollTo(0,scrollTop);
				},30);
			}
		}
		
		function controlFixed(){
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop >= oTop){
				addClass(oParent,'fixed');
			}else{
				removeClass(oParent,'fixed');
			}
		}
		function changeClass(){
			for(var i=0;i<aDetecNavList.length;i++){
				var offsetTop = aDetecConList[i].offsetTop;
				if(scrollTop >= offsetTop){
					num = i;
				}
				removeClass(aDetecNavList[i],'active');
			}
			addClass(aDetecNavList[num],'active');
		}
	}
	
	return new Gl();
})
