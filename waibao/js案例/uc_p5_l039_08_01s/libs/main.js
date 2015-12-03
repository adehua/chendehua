(function() {
	start();

	function start() {
		Snap.load("images/img.svg", function(f) {
			document.getElementById("container").appendChild(f.node);
			f.node.id = "svg";
			stage = Snap("#svg");
			init();
		});
	}
	var stage;
	var txt_r, txt_m, txt_w, txt_i, txt_ke, slider_r, slider_m, slider_w;
	var av, currentZb, ptw, stw, ren, ren_j;
	var obj0, obj1, obj2, obj3, obj4;
	var rect0, rect1, rect2, rect3, rect4;
	var m, r, w, i, ke;
	var currentIndex, tweenID, requestID;
	var FPS = 120;
	var ball_ani,an1_ani,an2_ani,an3_ani,an4_ani;
	var ball,an1,an2,an3,an4;

	var rp = [];

	function init() {
		createTxt();
		createSlider();
		createObjects();
		createAni();
		createRects();
		changeStage(0);
	}

	function createAni() {
		ball_ani = new ImageAnimation('ball', 'images/ball.json');
		an1_ani = new ImageAnimation('an1', 'images/an1.json');
		an2_ani = new ImageAnimation('an2', 'images/an2.json');
		an3_ani = new ImageAnimation('an3', 'images/an3.json');
		an4_ani = new ImageAnimation('an4', 'images/an4.json');
		
	}

	function createTxt() {
		txt_r = stage.text(62, 35, "0.04");
		txt_r.attr({
			"font-size": "16px"
		});

		txt_m = stage.text(200, 35, "0.20");
		txt_m.attr({
			"font-size": "16px"
		});

		txt_w = stage.text(340, 35, "0");
		txt_w.attr({
			"font-size": "16px"
		});

		txt_i = stage.text(130, 135, "1.3");
		txt_i.attr({
			"font-size": "16px"
		});

		txt_ke = stage.text(128, 170, "0.0");
		txt_ke.attr({
			"font-size": "16px"
		});
	}

	function createObjects() {
		obj0 = Snap("#iconF0_mc");
		obj1 = Snap("#iconF1_mc");
		obj2 = Snap("#iconF2_mc");
		obj3 = Snap("#iconF3_mc");
		obj4 = Snap("#iconF4_mc");

		obj0.attr({
			transform: 'scale(.2)'
		});
		obj1.attr({
			transform: 'scale(.2) translate(0,55)'
		});
		obj2.attr({
			transform: 'scale(.2)'
		});
		obj3.attr({
			transform: 'scale(.2) translate(0,40)'
		});
		obj4.attr({
			transform: 'scale(1) translate(0,5)'
		});
	}

	function createRects() {
		rect0 = stage.paper.rect(3, 102, 75, 48, 3).attr({
			opacity: 0.3,
			fill: "#ffffff"
		});

		rect1 = stage.paper.rect(3, 150, 75, 38, 3).attr({
			opacity: 0.3,
			fill: "#ffffff"
		});

		rect2 = stage.paper.rect(3, 188, 75, 49, 3).attr({
			opacity: 0.3,
			fill: "#ffffff"
		});

		rect3 = stage.paper.rect(3, 245, 75, 40, 3).attr({
			opacity: 0.3,
			fill: "#ffffff"
		});

		rect4 = stage.paper.rect(3, 285, 75, 55, 3).attr({
			opacity: 0.3,
			fill: "#ffffff"
		});

		removeRectSelect();
		rect0.attr({
			opacity: 0.3
		});

		rect0.click(function() {
			removeRectSelect();
			rect0.attr({
				opacity: 0.3
			});
			changeStage(0);
			refreshAni();
		}).hover(function() { //鼠标移入
			Tween.get(obj0).to({
				transform: 'scale(.25)'
			}, 300)
		}, function() { //鼠标移出
			Tween.get(obj0).to({
				transform: 'scale(.2)'
			}, 300)
		});

		rect1.click(function() {
			removeRectSelect();
			rect1.attr({
				opacity: 0.3
			});
			changeStage(1);
			refreshAni();
		}).hover(function() { //鼠标移入
			obj0.attr({
				style: "cursor:help"
			});
			Tween.get(obj1).to({
				transform: 'scale(.3) translate(0,55)'
			}, 300)
		}, function() { //鼠标移出
			obj0.attr({
				style: "cursor:default"
			});
			Tween.get(obj1).to({
				transform: 'scale(.2) translate(0,55)'
			}, 300)
		});

		rect2.click(function() {
			removeRectSelect();
			rect2.attr({
				opacity: 0.3
			});
			changeStage(2);
			refreshAni();
		}).hover(function() { //鼠标移入
			Tween.get(obj2).to({
				transform: 'scale(.25)'
			}, 300)
		}, function() { //鼠标移出
			Tween.get(obj2).to({
				transform: 'scale(.2)'
			}, 300)
		});

		rect3.click(function() {
			removeRectSelect();
			rect3.attr({
				opacity: 0.3
			});
			changeStage(3);
			refreshAni();
		}).hover(function() { //鼠标移入
			Tween.get(obj3).to({
				transform: 'scale(.3) translate(0,40)'
			}, 500)
		}, function() { //鼠标移出
			Tween.get(obj3).to({
				transform: 'scale(.2) translate(0,40)'
			}, 500)
		});

		rect4.click(function() {
			removeRectSelect();
			rect4.attr({
				opacity: 0.3
			});
			changeStage(4);
			refreshAni();
		}).hover(function() { //鼠标移入
			Tween.get(obj4).to({
				transform: 'scale(1.5) translate(0,5)'
			}, 500)
		}, function() { //鼠标移出
			Tween.get(obj4).to({
				transform: 'scale(1) translate(0,5)'
			}, 500)
		});
	}

	function createSlider() {
		slider_r = stage.slider("#014689", 70, 4);
		slider_r.x = 62;
		slider_r.y = 61;
		slider_r.scale = .8;

		slider_m = stage.slider("#014689", 70, 4);
		slider_m.x = 202;
		slider_m.y = 61;
		slider_m.scale = .8;

		slider_w = stage.slider("#014689", 85, 10);
		slider_w.x = 336;
		slider_w.y = 61;
		slider_w.scale = .8;

		slider_r.onchange = function() {
			refresh_r();
			refreshAni();
		}

		slider_m.onchange = function() {
			refresh_m();
			refreshAni();
		}

		slider_w.onchange = function() {
			refresh_w();
			refreshAni();
		}

	}

	function refresh_r() {
		r = (slider_r.value + 1) * 0.04;
		m = (slider_m.value + 1) * 0.2;
		w = slider_w.value;

		i = 2 * r * r * m * 10000 / 5;
		ke = i * w * w / 2;
		txt_r.attr({
			text: r.toFixed(2)
		});
		txt_i.attr({
			text: i.toFixed(1)
		});
		txt_ke.attr({
			text: ke.toFixed(1)
		});
	}

	function refresh_m() {
		r = (slider_r.value + 1) * 0.04;
		m = (slider_m.value + 1) * 0.2;
		w = slider_w.value;

		i = 2 * r * r * m * 10000 / 5;
		ke = i * w * w / 2;
		txt_m.attr({
			text: m.toFixed(1)
		});
		txt_i.attr({
			text: i.toFixed(1)
		});
		txt_ke.attr({
			text: ke.toFixed(1)
		});
	}

	function refresh_w() {
		r = (slider_r.value + 1) * 0.04;
		m = (slider_m.value + 1) * 0.2;
		w = slider_w.value;

		i = 2 * r * r * m * 10000 / 5;
		ke = i * w * w / 2;

		txt_w.attr({
			text: w.toFixed(0)
		});
		txt_i.attr({
			text: i.toFixed(1)
		});
		txt_ke.attr({
			text: ke.toFixed(1)
		});
	}

	function refreshAni() {
		switch (currentIndex) {
			case 0:
				//$("#cball").css("transform", "scale(" + (slider_r.value + 2) * 0.5 + ")");
				updateTween(ball_ani);console.log(ball_ani)
				break;
			case 1:
//				Snap("#f1_mc").attr({transform: "matrix( 1, 0, 0, 1, 276.05,250) scale(" + (0.5+(slider_r.value +1) * 0.1) + ",1)"});
				$("#can1").css("transform", "scale(" + (0.5+(slider_r.value +1) * 0.1) +",1)");
				updateTween(an1_ani);
				break;
			case 2:
				$("#can2").css("transform", "scale(" + (slider_r.value +2) * 0.35 + ",2)");
				updateTween(an2_ani);
				break;
			case 3:
				$("#can3").css("transform", "scale(" + (0.5+(slider_r.value +2) * 0.1) + ",1)");
				updateTween(an3_ani);
				break;
			case 4:
				$("#can4").css("transform", "scale(" + (slider_r.value +2) * 0.35 + ",1)");
				updateTween(an4_ani);
				break;
		}
	}
	
	function updateAniTween(ani){
//		Tween.get(an1_ani)
//		.set({transform:'matrix( 1, 0, 0, 1, 276.05,250)'})
//		.to({transform:'matrix( 0.79998779296875, 0, 0, 0.5599822998046875, -19.1,167.95)'}, 280)
	}

	function updateTween(ani) {
		resetTween(ani);
		w = slider_w.value;
		if (w > 0) {
			var per=4*w;
			var cur=0;
			tweenID = setInterval(function() {
				if(cur<360){
					cur+=per;
				}else{
					cur=0;
				}
				ani.gotoFrame(cur);
			}, FPS);
		}

	}

	function resetTween(ani) {
		clearInterval(tweenID);
		ani.gotoFrame(1);
	}

	function hideAll() {
		$("#cball").css("display", "none");
		$("#can1").css("display", "none");
		$("#can2").css("display", "none");
		$("#can3").css("display", "none");
		$("#can4").css("display", "none");
		Snap("#f1_mc").visible=false;
		Snap("#f3_mc").visible=false;
	}

	function changeStage(value) {
		hideAll();

		currentIndex = value;

		switch (value) {
			case 0:
				$("#cball").css("display", "block");
				stage.select("#slider_r_mc").visible = true;
				stage.select("#slider_l_mc").visible = false;
				break;
			case 1:
				$("#can1").css("display", "block");
				stage.select("#slider_r_mc").visible = false;
				stage.select("#slider_l_mc").visible = true;
				break;
			case 2:
				$("#can2").css("display", "block");
				stage.select("#slider_r_mc").visible = true;
				stage.select("#slider_l_mc").visible = false;
				break;
			case 3:
				$("#can3").css("display", "block");
				stage.select("#slider_r_mc").visible = false;
				stage.select("#slider_l_mc").visible = true;
				break;
			case 4:
				$("#can4").css("display", "block");
				stage.select("#slider_r_mc").visible = true;
				stage.select("#slider_l_mc").visible = false;
				break;
		}
	}

	function removeRectSelect() {
		rect0.attr({
			opacity: 0
		});
		rect1.attr({
			opacity: 0
		});
		rect2.attr({
			opacity: 0
		});
		rect3.attr({
			opacity: 0
		});
		rect4.attr({
			opacity: 0
		});
	}

})();