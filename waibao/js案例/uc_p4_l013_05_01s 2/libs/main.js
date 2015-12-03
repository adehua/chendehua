(function(){
//	var Main = function()
//	{
//		Snap.load("images/img.svg",function(f)
//		{	
//			document.getElementById("container").appendChild(f.node);	
//			f.node.id = "svg";
//			stage = Snap("#svg");
//			init();
//			test();
//		});
//	}
	var stage;
	var play = false;
	var txt1,txt2,txt3,slider2,slider2;
	var ts = {tw0:{},tw1:{},tw2:{},tw3:{},tw4:{},tw5:{},tw6:{},tw7:{},tw8:{}};

	start();
		function start()
	{
		
		Snap.load("images/img.svg",function(f)
		{	
			document.getElementById("container").appendChild(f.node);	
			f.node.id = "svg";
			stage = Snap("#svg");
			init();
			test();
		});
		
	}
	function init()
	{			
		base = Snap("#base");			
		
		createTxt1();//初始化文字1
		createTxt2();//初始化文字2
		createTxt3();//初始化文字3
		

		createSlider1();
		createSlider2();
		
		createTweens()
		
		_reset();
	}
	function createTxt1()
	{
		txt1 = stage.text(92,28,"500");
		txt1.attr({"font-size":"14px",});		
	}
	function createTxt2()
	{
		txt2 = stage.text(248,28,"5");
		txt2.attr({"font-size":"14px"});
	}
	function createTxt3()
	{
		txt3 = stage.text(111,261,"2.5");
		txt3.attr({"font-size":"14px"});
	}
	function createSlider1()	//创建滑动事件1
	{
		slider1 = stage.slider("#014689",95,3);
		slider1.attr({transform:"matrix(1,0,0,1,67,58)"})
		slider1.onchange = function()
		{	
			refreshTxt();	//文本
			refreshPlane();	//开始
		}
	}
	function createSlider2()	//创建滑动事件2
	{
		slider2 = stage.slider("#014689",95,3);
		slider2.attr({transform:"matrix(1,0,0,1,235,58)"})
		slider2.onchange = function()
		{	
			refreshTxt();
			refreshFire();
			if(play)
			{
				playStar(this.value);
			}
		}
	}
	function refreshTxt()	//滑动时间更换效果
	{
		var v1 = (slider1.value + 1)*500;
		var v2 = (slider2.value + 1)*5;
		var v3 = v1*v2/1000;
		txt1.attr({text:v1});
		txt2.attr({text:v2});
		txt3.attr({text:v3});
	}
	function createTweens()	//背景动态效果
	{
		ts.tw0 = Tween.get(Snap("#star_0"));
		ts.tw1 = Tween.get(Snap("#star_1"));
		ts.tw2 = Tween.get(Snap("#star_2"));
		ts.tw3 = Tween.get(Snap("#star_3"));
	}
	function refreshPlane()	//四个放大效果
	{
		var s = [];
		s.push({transform:'matrix(0.73,0,0,0.82,2.75,33)'})
		s.push({transform:'matrix(0.82,0,0,0.88,2.75,23.25)'})
		s.push({transform:'matrix(1,0,0,0.91,5,21)'})
		s.push({transform:'matrix(1,0,0,1,5,9.75)'})
		Snap("#plane").attr(s[slider1.value]);
	}
	function refreshFire()	//四个飞机喷气动态效果
	{
		Snap("#fire_0").visible = false;	
		Snap("#fire_1").visible = false;
		Snap("#fire_2").visible = false;
		Snap("#fire_3").visible = false;
		Snap("#fire_" + slider2.value).visible = true;
	}	
	function playStar(i)
	{
		hideResult();
		ts["tw" +i].set({visibility:"visible"});
		switch(i)
		{
			case 0:
				play0();
				break;
			case 1:
				play1();
				break;
			case 2:
				play2();
				break;
			case 3:
				play3();
				break;
			default:
				break;
		}
	}
	function play0()
	{
		ts.tw0.set({transform:'matrix(1,0,0,1,8.4,-7.15)'})
		.to({transform:'matrix(1,0,0,1,8.4,421.85)'}, 1560)
		.call(play0)
	}
	function play1()
	{
		ts.tw1.set({transform:'matrix(1,0,0,1,8.4,-7.15)'})
		.to({transform:'matrix(1,0,0,1,8.4,421.85)'}, 560)
		.call(play1)
	}
	function play2()
	{
		ts.tw2.set({transform:'matrix(1,0,0,1,8.4,-7.15)'})
		.to({transform:'matrix(1,0,0,1,8.4,421.85)'}, 360)
		.call(play2)
	}
	function play3()
	{
		ts.tw3.set({transform:'matrix(1,0,0,1,8.4,-7.15)'})
		.to({transform:'matrix(1,0,0,1,8.4,350.35)'}, 160)
		.call(play3)
	}
	
	function _run ()
	{
		if(!play)
		{
			play = true;
			playStar(slider2.value);
		}
	}
	function _reset()	//初始化值（还有重新开始）
	{
		play = false;
		slider1.value = 0 ;
		slider2.value = 0 ;
		refreshFire();		
		hideResult();
		ts.tw0.reset();
		ts.tw0.set({visibility:"visible"});
	}
	function hideResult()	//隐藏结果 
	{	
		for(var i = 0;i<4;i++)
		{
			var tw = ts["tw" + i];
			tw.remove();
			tw.set({visibility:"hidden"});
		}		
	}
	function test()
	{
		Snap("#playBtn").click(_run);
		Snap("#resetBtn").click(_reset);
	}	
	//var main = new Main();
})();