(function(){
	var stage;
	var txt1,txt2,txt3,txt4,txt5,txt6,slider1,slider2,slider3;
	var ts = {tw0:{},tw1:{},tw2:{},tw3:{},tw4:{},tw5:{},tw6:{},tw7:{},tw8:{}};
	var left_coil,right_coil;

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
		
		createTxt1();	//线圈1
		createTxt2();	//线圈2
		createTxt3();	//电压
		createTxt4();	//两个线圈的比率
		createTxt5();	//最后显示显示电压
		createTxt6();	//电压
			
		createSlider1();	//滑动事件1
		createSlider2();	//滑动事件2
		createSlider3();	//滑动事件3
		createcoil();
		_reset();
	}
	function createTxt1()
	{
		txt1 = stage.text(85,30,"100");
		txt1.attr({"font-size":"16px",});		
	}
	function createTxt2()
	{
		txt2 = stage.text(85,150,"100");
		txt2.attr({"font-size":"16px"});
	}
	function createTxt3()
	{
		txt3 = stage.text(273,30,"0");
		txt3.attr({"font-size":"16px"});
	}
	function createTxt4()
	{
		txt4 = stage.text(285,205,"1.00");
		txt4.attr({"font-size":"16px"});
	}
	function createTxt5()
	{
		txt5 = stage.text(80,332,"0");
		txt5.attr({"font-size":"20px"});
		txt5.attr({"fill":"#74FE74"});
	}
	function createTxt6()
	{
		txt6 = stage.text(326,298,"0");
		txt6.attr({"font-size":"16px"});
	}
	function createSlider1()
	{
		slider1 = stage.slider("#014689",95,10);
		slider1.attr({transform:"matrix(1,0,0,1,85,59)"})
		slider1.onchange = function(){
			refreshTxt();
			if(left_coil.frames)
			{
				var i = slider1.value < 10 ? slider1.value : 9;
				set_attr("left_coil", left_coil.frames[i]);
			}
		}
	}
	function createSlider2()
	{
		slider2 = stage.slider("#014689",95,10);
		slider2.attr({transform:"matrix(1,0,0,1,85,179)"})
		slider2.onchange = function(){
			refreshTxt();
			if(right_coil.frames)
			{
				var i = slider2.value < 10 ? slider2.value : 9;
				set_attr("right_coil", right_coil.frames[i]);
			}
		}
	}
	function createSlider3()
	{
		slider3 = stage.slider("#014689",95,10);
		slider3.attr({transform:"matrix(1,0,0,1,263,59)"})
		slider3.onchange = function(){refreshTxt();}
	}
	function createcoil() {
		left_coil = new ImageAnimation('coil1', 'images/coil1.json');
		right_coil = new ImageAnimation('coil2', 'images/coil2.json');
	}
	function refreshTxt()
	{
		var N1 = (slider1.value)*90+100;
		var N2 = (slider2.value)*90+100;
		var V1 = (slider3.value)*5;
		var K = (N2/N1).toFixed(2);
		var V2 = (slider3.value)*5;
		if((V1*K).toFixed(1) == (V1*K))
		{
			var V3 = (V1*K);
		}else{
			var V3 = (V1*K).toFixed(1);
		}
		if(V2 >=10) 
		{
			txt5.attr({"x":"70"});
		}else{
			txt5.attr({"x":"80"});
		}

		lenstring(V3.toString().length);
		var postfixLabel0_mc = document.getElementById("postfixLabel0_mc");
		if(V1 < 10)
		{
			postfixLabel0_mc.style.webkitTransform="matrix( 1, 0, 0, 1, 286.1,83.6)";
		}else{
			postfixLabel0_mc.style.webkitTransform="matrix( 1, 0, 0, 1, 294.1,83.6)";
		}
		var postfixLabel1_mc = document.getElementById("postfixLabel1_mc");
		if(N1 < 1000)
		{
			postfixLabel1_mc.style.webkitTransform="matrix( 1, 0, 0, 1, 109.9,83.65)";
		}else{
			postfixLabel1_mc.style.webkitTransform="matrix( 1, 0, 0, 1, 117.9,83.65)";
		}
		var postfixLabel2_mc = document.getElementById("postfixLabel2_mc");
		if(N2 < 1000)
		{
			postfixLabel2_mc.style.webkitTransform="matrix( 1, 0, 0, 1, 109.9,133.35)";
		}else{
			postfixLabel2_mc.style.webkitTransform="matrix( 1, 0, 0, 1, 117.9,133.35)";
		}
		var label0_comp = document.getElementById("label0_comp");
		var prefixL0_mc = document.getElementById("prefixL0_mc");
		if(K < 10)
		{
			label0_comp.style.webkitTransform="matrix( 1, 0, 0, 1, 250.5,186.65)";
		}else{
			label0_comp.style.webkitTransform="matrix( 1.1, 0, 0, 1, 246.5,186.65)";
		}
		
		txt1.attr({text:N1});
		txt2.attr({text:N2});
		txt3.attr({text:V1});
		txt4.attr({text:K});
		txt5.attr({text:V2});
		txt6.attr({text:V3});
	}
	function _reset()
	{
		slider1.value = 0 ;
		slider2.value = 0 ;
		slider3.value = 0 ;
		refreshTxt();
	}
	function test()
	{
		Snap("#resetBtn").click(_reset);
	}	

	function lenstring(str)
	{
		switch(str)
		{
			case 0:
				txt6.attr({"x":"326"});
				break;
			case 1:
				txt6.attr({"x":"326"});
				break;
			case 2:
				txt6.attr({"x":"318"});
				break;
			case 3:
				txt6.attr({"x":"310"});
				break;
			case 4:
				txt6.attr({"x":"302"});
				break;
			case 5:
				txt6.attr({"x":"294"});
				break;
			default:
				txt6.attr({"x":"286"});
				break;
		}
	}
	function set_attr(id,attr){
		var left = id == "left_coil" ? 147 : 234;
		$("#"+id).css("left",left-(attr.w-23)/2+"px");
		$("#"+id).width(attr.w);
		Snap("#"+id+" .anim-coil").attr("viewBox",attr.x+" "+attr.y+" "+attr.w+" "+attr.h)
	}
})();