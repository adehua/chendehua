(function(){
//	var Main = function()
//	{
//		Snap.load("images/img.svg",function(f)
//		{	
//			document.getElementById("container").appendChild(f.node);	
//			f.node.id = "svg";
//			stage = Snap("#svg");
//			init();
//			initBtn();
//			//test();
//		});
//	}
start()
	function start()
	{
		Snap.load("images/img.svg",function(f)
		{	
			document.getElementById("container").appendChild(f.node);	
			f.node.id = "svg";
			stage = Snap("#svg");
			init();
			initBtn();
			//test();
		});
	}
	var stage;
	var txt1,txt2,txt3,slider1;
	var av,currentZb,ptw,stw,ren,ren_j;
	var rp = [];
//	var p = Main.prototype;

//	p.run = function()
//	{
//		_run();
//	}
//	p.reset = function()
//	{
//		_reset();
//	}
	function initBtn()
	{
		Snap("#playBtn").click(_run);
		Snap("#resetBtn").click(_reset);
	}
	function init()
	{		
		createTxt();
		
		createSlider1();
		
		createEl();
		
		playTweenBody ();
		playTweenSnow ();
		
		_reset();
	}
	function createTxt()
	{
		txt1 = stage.text(86,28,"0");
		txt1.attr({"font-size":"18px",});		
	
		txt2 = stage.text(215,32,"0");
		txt2.attr({"font-size":"18px"});
		
		txt3 = stage.text(210,79,"0");
		txt3.attr({"font-size":"18px"});

	}
	function createSlider1()
	{
		slider1 = stage.slider("#014689",95,5);
		slider1.attr({transform:"matrix(1,0,0,1,60,60)"})
		slider1.onchange = function()
		{	
			refreshTxt();
			refreshStage();
		}
	}

	function createEl()
	{
		xw =Snap("#xw");
		ren = Snap("#ren");
		ren_j =Snap("#ren_j");
		
		ptw = Tween.get(ren);
		stw = Tween.get(xw);
		
		rp.push('matrix(0.78,0.63,-0.63,0.78,-43.4,531.75)');
		rp.push('matrix(0.89,0.44,-0.44,0.89,-23.1,463.35)');
		rp.push('matrix(0.94,0.33,-0.33,0.94,-27.25,360.65)');
		rp.push('matrix(0.98,0.18,-0.18,0.98,-5.35,226.1)');
		rp.push('matrix(1,0.02,-0.02,1,-1.6,121.55)');
		rp.push('matrix(0.97,-0.26,0.26,0.97,1.25,-125)');
	}
	function refreshTxt()
	{
		var m = 60;
		var g = 9.21;
		var v = slider1.value*12;
		var kat = (Math.round((v*(Math.PI/180))*10))/10;
		var f = Math.round((m*g*Math.sin(kat)));
		av = (Math.round((f/m)*100))/100;
		
		txt1.attr({text:v});
		txt2.attr({text:f});
		Snap("#dtxt").x = txt1.getBBox().x2+1;
	}
	function refreshStage()
	{
		hideStage();
		stopTweenPep ();
		var i = slider1.value;		
		Snap("#wc"+i).visible = true;
		Snap("#mc"+i).visible = true;
		//�����˵�λ��
		ren_j.attr({transform:rp[i]})
	}
	function hideStage()
	{
		for(var i = 0; i <6;i++)
		{
			Snap("#wc"+i).visible = false;
			Snap("#mc"+i).visible = false;
		}
	}
	function hideAllZb()
	{
		for(var i = 0; i < 6;i++)
		{
			Snap("#p"+i).alpha = 0;
		}
	}
	function playTweenZb(i)
	{
		if(currentZb&& currentZb.alpha == 1)
		{
			currentZb.alpha = 0.5;
		}
		var zb = Snap("#p" + i)
		zb.alpha = 1;
		currentZb = zb;
		
		var i1 = zb.children(0)[1].node.id
		var d1 = Snap("#"+ i1);
		var t1 = Tween.get(d1)
		.wait(320)
		.set({transform:'matrix(1,0,0,1,-3.75,-3.75)', opacity:0.2})
		.to({transform:'matrix(4.2,0,0,4.2,-3.75,-3.75)', opacity:0}, 640)
		var i2 = zb.children(0)[3].node.id
		var d2 = Snap("#"+ i2);
		var t2 = Tween.get(d2)
		.set({transform:'matrix(3.28,0,0,3.28,-3.75,-3.75)', opacity:0})
		.to({transform:'matrix(1,0,0,1,-3.75,-3.75)', opacity:1}, 360)
	}
	function playTweenPep (i)
	{
		ren.visible = true;
		ren_j.visible = false;
		xw.visible = true;
		
		switch(i)
		{
			case 0:
				ren.visible = false;
				ren_j.visible = true;
				break;
			case 1:
				stw.set({transform:'matrix(0.89,0.46,-0.46,0.89,163.7,433.3)'})
				.to({transform:'matrix(0.82,0.56,-0.56,0.82,-1243.8,692.65)'}, 4000)

				ptw.set({transform:'matrix(0.89,0.44,-0.44,0.89,-23.1,463.35)'})
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1399.75,692.7)'}, 4000)
				

				break;
			case 2:
				stw.set({transform:'matrix(0.93,0.36,-0.36,0.93,135.75,327.3)'})
				.to({transform:'matrix(0.9,0.43,-0.43,0.9,-183.2,454.2)'}, 760)
				.to({transform:'matrix(0.87,0.48,-0.48,0.87,-438.85,544.45)'}, 600)
				.to({transform:'matrix(0.83,0.55,-0.55,0.83,-848.45,667.15)'}, 960)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1292.2,671.15)'}, 1000)
			
				ptw.set({transform:'matrix(0.94,0.33,-0.33,0.94,-27.25,360.65)'})
				.to({transform:'matrix(0.91,0.4,-0.4,0.91,-337.7,474.8)'}, 760)
				.to({transform:'matrix(0.88,0.46,-0.46,0.88,-586.05,554.4)'}, 640)
				.to({transform:'matrix(0.83,0.55,-0.55,0.83,-984.6,661.2)'}, 960)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1399.75,692.7)'}, 1000)

				break;
			case 3:
				stw.set({transform:'matrix(0.98,0.18,-0.18,0.98,141.95,177.25)'})
				.to({transform:'matrix(0.95,0.31,-0.31,0.95,-231.1,412.75)'}, 760)
				.to({transform:'matrix(0.9,0.42,-0.42,0.9,-549.95,582.65)'}, 640)
				.to({transform:'matrix(0.86,0.51,-0.51,0.86,-862.7,656.8)'}, 560)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1328.2,669.15)'}, 800)
			
				ptw.set({transform:'matrix(0.98,0.18,-0.18,0.98,-5.35,226.1)'})
				.to({transform:'matrix(0.95,0.31,-0.31,0.95,-368.35,438.85)'}, 760)
				.to({transform:'matrix(0.9,0.42,-0.42,0.9,-678.25,590.1)'}, 640)
				.to({transform:'matrix(0.86,0.51,-0.51,0.86,-982.85,647.95)'}, 560)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1418.05,667.6)'}, 800)

				break;
			case 4:
				stw.set({transform:'matrix(1,0.02,-0.02,1,110.35,66.15)'})
				.to({transform:'matrix(0.97,0.23,-0.23,0.97,-297.2,422.45)'}, 760)
				.to({transform:'matrix(0.94,0.35,-0.35,0.94,-558.2,563.8)'}, 440)
				.to({transform:'matrix(0.89,0.45,-0.45,0.89,-834.9,644.65)'}, 400)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1353.95,657.8)'}, 760)
			
				ptw.set({transform:'matrix(1,0.02,-0.02,1,-1.6,121.55)'})
				.to({transform:'matrix(0.97,0.23,-0.23,0.97,-391.2,449.25)'}, 760)
				.to({transform:'matrix(0.94,0.35,-0.35,0.94,-641.2,574.5)'}, 440)
				.to({transform:'matrix(0.89,0.45,-0.45,0.89,-907.5,640.8)'}, 400)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1413.3,654)'}, 760)

				break;
			case 5:
				stw.set({transform:'matrix(0.97,-0.26,0.26,0.97,91.55,-199.55)'})
				.to({transform:'matrix(1,0.07,-0.07,1,-323.6,379.8)'}, 760)
				.to({transform:'matrix(0.88,0.47,-0.47,0.88,-628,609.45)'}, 400)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1285.55,680.65)'}, 800)
			
				ptw.set({transform:'matrix(0.97,-0.26,0.26,0.97,1.25,-125)'})
				.to({transform:'matrix(0.99,0.08,-0.08,0.99,-414.65,426.65)'}, 760)
				.to({transform:'matrix(0.82,0.56,-0.56,0.82,-722.1,607.45)'}, 400)
				.to({transform:'matrix(0.77,0.63,-0.63,0.77,-1455.75,675.4)'}, 800)

				break;
			default:
				break;
		}
		ptw.call(function(){xw.visible = false})
	}
	function stopTweenPep ()
	{
		xw.visible = false;		
		ren.visible = false;
		ren_j.visible = true;
		ptw.remove();
		stw.remove();
	}
	function playTweenBody ()
	{
		var bw8 = Snap.select('#bw8');
		Tween.get(bw8)
		.set({transform:'matrix(1,0,0,1,0,31.2)'})
		.to({transform:'matrix(1,0,0,1,0,31.2)'}, 280)
		.to({transform:'matrix(1,0,0,1,0,31.2)'}, 120)
		.to({transform:'matrix(1,0,0,1,0,31.2)'}, 560)
		.to({transform:'matrix(1,0,0,1,0,31.2)'}, 200)
	
		var bw7 = Snap.select('#bw7');
		Tween.get(bw7)
		.set({transform:'matrix(1,0,0,1,-20.35,-17.6)'})
		.to({transform:'matrix(1,-0.04,0,1,-20.35,-14.1)'}, 280)
		.to({transform:'matrix(1,0,0,1,-19.85,-16.6)'}, 120)
		.to({transform:'matrix(1,0,0,1,-20.35,-17.6)'}, 560)
		.to({transform:'matrix(1,0,0,1,-20.35,-17.6)'}, 200)
	
		var bw6 = Snap.select('#bw6');
		Tween.get(bw6)
		.set({transform:'matrix(1,0,0,1,18.85,-70.95)'})
		.to({transform:'matrix(1,0,0,1,18.85,-70.95)'}, 280)
		.to({transform:'matrix(1,0,0,1,18.85,-70.95)'}, 120)
		.to({transform:'matrix(1,0,0,1,18.85,-70.95)'}, 560)
		.to({transform:'matrix(1,0,0,1,18.85,-70.95)'}, 200)
	
		var bw5 = Snap.select('#bw5');
		Tween.get(bw5)
		.set({transform:'matrix(1,0,0,1,-22.5,-15)'})
		.to({transform:'matrix(1,-0.08,0.08,1,-22.5,-11.5)'}, 280)
		.to({transform:'matrix(1,0,0,1,-22.5,-14)'}, 120)
		.to({transform:'matrix(1,0,0,1,-22.5,-15)'}, 560)
		.to({transform:'matrix(1,0,0,1,-22.5,-15)'}, 200)
	
		var bw4 = Snap.select('#bw4');
		Tween.get(bw4)
		.set({transform:'matrix(0.99,-0.16,0.16,0.99,-61,-48.15)'})
		.to({transform:'matrix(0.99,-0.16,0.16,0.99,-60,-45.15)'}, 280)
		.to({transform:'matrix(0.99,-0.16,0.16,0.99,-61,-47.15)'}, 120)
		.to({transform:'matrix(0.99,-0.16,0.16,0.99,-61,-48.15)'}, 560)
		.to({transform:'matrix(0.99,-0.16,0.16,0.99,-61,-48.15)'}, 200)
		wbtw()
		function wbtw()
		{
			var wb1 = Snap.select('#wb1');
			Tween.get(wb1)
			.set({transform:'matrix(1,0,0,1,-2.05,-52.5)',opacity:1})
			.wait(80)
			.set({opacity:0})
		
			var wb2 = Snap.select('#wb2');
			Tween.get(wb2)
			.set({opacity:0})
			.wait(80)
			.set({transform:'matrix(1,0,0,1,-1.2,-56.45)', opacity:1})
			.wait(80)
			.set({opacity:0})
		
			var wb3 = Snap.select('#wb3');
			Tween.get(wb3)
			.set({opacity:0})
			.wait(160)
			.set({transform:'matrix(1,0,0,1,-1.3,-57.4)', opacity:1})
			.wait(80)
			.call(wbtw)
		}
		
		var bw3 = Snap.select('#bw3');
		Tween.get(bw3)
		.set({transform:'matrix(1,0,0,1,22.3,-15.75)'})
		.to({transform:'matrix(1,0,0,1,22.3,-15.75)'}, 280)
		.to({transform:'matrix(1,0,0,1,22.3,-15.75)'}, 120)
		.to({transform:'matrix(1,0,0,1,22.3,-15.75)'}, 560)
		.to({transform:'matrix(1,0,0,1,22.3,-15.75)'}, 200)
	
		var bw2 = Snap.select('#bw2');
		Tween.get(bw2)
		.set({transform:'matrix(1,0,0,1,-73.1,-45.7)'})
		.to({transform:'matrix(1,0,0,1,-73.1,-41.2)'}, 280)
		.to({transform:'matrix(1,0,0,1,-73.1,-43.7)'}, 120)
		.to({transform:'matrix(1,0,0,1,-73.1,-45.7)'}, 560)
		.to({transform:'matrix(1,0,0,1,-73.1,-45.7)'}, 200)
	
		var bw1 = Snap.select('#bw1');
		Tween.get(bw1)
		.set({transform:'matrix(1,0,0,1,-28.3,-25.7)'})
		.to({transform:'matrix(1,0,0,1,-28.8,-21.7)'}, 280)
		.to({transform:'matrix(1,0,0,1,-28.3,-24.2)'}, 120)
		.to({transform:'matrix(1,0,0,1,-28.3,-25.7)'}, 560)
		.to({transform:'matrix(1,0,0,1,-28.3,-25.7)'}, 200)
		.call(playTweenBody)
	}

	function playTweenSnow ()
	{
		var lang1 = Snap.select('#lang1');
		Tween.get(lang1)
		.set({transform:'matrix(1,0,0,1,-132.9,-137.95)'})
		.wait(120)
		.set({opacity:0})
	
		var lang2 = Snap.select('#lang2');
		Tween.get(lang2)
		.set({opacity:0})
		.wait(120)
		.set({transform:'matrix(1,0,0,1,-124.3,-143.9)', opacity:1})
		.wait(120)
		.set({opacity:0})
	
		var lang3 = Snap.select('#lang3');
		Tween.get(lang3)
		.set({opacity:0})
		.wait(240)
		.set({transform:'matrix(1,0,0,1,-125.9,-143)', opacity:1})
		.wait(120)
		.set({opacity:0})
	
		var lang4 = Snap.select('#lang4');
		Tween.get(lang4)
		.set({opacity:0})
		.wait(360)
		.set({transform:'matrix(1,0,0,1,-124.45,-131.8)', opacity:1})
		.wait(120)
		.call(playTweenSnow)
	}	
	function _run ()
	{
		txt3.attr({text:av});
		showResult();
	}
	function _reset()
	{
		av = 0;
		slider1.value = 0;	
		txt3.attr({text:0});
		refreshStage();
		hideAllZb();
		hideResult();
	}
	function showResult()
	{	
		var i = slider1.value;
		Snap("#wc"+i).visible = false;
		stopTweenPep ();
		playTweenZb(i);
		playTweenPep (i);
	}
	function hideResult()
	{	
		stopTweenPep ();
	}
	function test()
	{	
		var r = stage.rect(-41,-20,41,46);
		r.alpha = 0.4;
		r.x = 68;
		r.y = 68;
		r.drag();
		r.drag(null,null,function(){console.log(Math.round(r.x) + "," + Math.round(r.y))});
		
		var r2 = stage.rect(-5,-14,50,50);
		r2.alpha = 0.8;
		r2.x = 96;
		r2.y = 32;
		r2.drag();
		r2.drag(null,null,function(){console.log(Math.round(r2.x) + "," + Math.round(r2.y))});
	}	
//	wnd.Main = Main;
	//var main = new Main();
})();