require.config({
	baseUrl: 'js',
	paths: {
		base: 'demo/base',
		move: 'demo/move',
		Gl: 'demo/Gl'
	}
});
require(['base','move','Gl'],function(base,move,Gl){
	Gl.focusMap({ID:'div1',focusList:'list',iNow:0,moveTime:500,moveType:'easeIn',autoPlayTime:3000,autoPlay:'true',moveEnd:null});
	Gl.fadeIn({ID:'div2',focusList:'list',iNow:0,moveTime:500,moveType:'easeIn',autoPlayTime:3000,autoPlay:'true',moveEnd:null});
	Gl.tab({ID:'div12',events:'click',tabTitleList:'list',tabConList:'con',moveType:'easeIn',moveTime:500,autoPlayTime:3000,autoPlay:'false',iNow:0,moveEnd:null});
	Gl.tab({ID:'div13',events:'mouseover',tabTitleList:'list',tabConList:'con',moveType:'easeIn',moveTime:500,autoPlayTime:3000,autoPlay:'false',iNow:0,moveEnd:null});
	Gl.menu({ID:'div14',type:'default',timeSpace:'200',moveTime:500,menuTitle:'a1',menuCon:'ul1'});
	Gl.menu({ID:'div15',type:'fade',timeSpace:'200',moveTime:500,menuTitle:'a1',menuCon:'ul1'});
	Gl.selected({ID:'div16',type:'default',timeSpace:'200',selectedTitle:'a1',selectedCon:'ul1'});
	Gl.selected({ID:'div17',type:'click',timeSpace:'200',selectedTitle:'a1',selectedCon:'ul1'});
	Gl.selectAll({ID:'div18',selectAll:'a1',selectNo:'a2',selectList:'li01'});
	Gl.showBig({ID:'div19',bigList:'ccc',smallList:'bbb',view:3,spacing:20,moveTime:500,moveType:'easeIn',moveEnd:null});
	Gl.scroDetecNav({detecNavList:'navlist',detecConList:'conlist',speed:100,moveEnd:null});
});
