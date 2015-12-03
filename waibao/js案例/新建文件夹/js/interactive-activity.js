(function(wnd) {


	var api
	var InteractiveActivity = function(_api) {
		api = _api;
		init();
	};
	$(function() {
		init()
	});

	var p = InteractiveActivity.prototype;
	var elem0, elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11;

	var stagespr = new Array();
	var curFrame = 1;
	var stage;

	function init() {

		Snap.load("images/img.svg", function(f) {
			document.getElementById("container").appendChild(f.node);
			f.node.id = "svg";
			stage = Snap("#svg");

			addData();

			addEvent();
		});
		Snap.load("images/reset.svg", function(f) {
			document.getElementById("reset").appendChild(f.node);
			f.node.id = "svg_reset";
		});
	}
	
	function bindEvent(ele){
		$("#"+ele).zdw_addEvent("mouseover", function() {
			Snap("#"+ele).append(rect00);
			if($("#"+ele+"_1").css("display")=="none"){
				rect00.attr({opacity:0.35});
			}else{
				rect00.attr({opacity:0.0});
			}
		})
		$("#"+ele).zdw_addEvent("mouseout", function() {
			rect00.remove();
		})
	}
	
	function bindUpEvent(ele){
		$("#"+ele).zdw_addEvent("mouseup", function() {
			$("#"+ele+"_1").css("display","block");
		})
	}


	function addEvent() {
		for(i=0;i<13;i++){
			for (j=0;j<15;j++) {
				bindEvent("wind_"+i+"_"+j+"_mc");
				bindUpEvent("wind_"+i+"_"+j+"_mc");
			}
		}
		
		Snap("#resetBtn").click(function(){
			for(i=0;i<13;i++){
				for (j=0;j<15;j++) {
					display("wind_"+i+"_"+j+"_mc");
				}
			}
		});
	}
	
	var rect00;

	function addData() {
		rect00 = stage.paper.rect(-10, -10, 20, 20, 0).attr({
			opacity: 0.0,
			fill: "#ffffff"
		});
		
		for(i=0;i<13;i++){
			for (j=0;j<15;j++) {
				display("wind_"+i+"_"+j+"_mc");
			}
		}
	}
	
	function display(ele){
		$("#"+ele+"_1").css("display","none");
	}

	p.loadState = function(obj) {

	};

	p.saveState = function() {
		return {};
	};

	wnd.InteractiveActivity = InteractiveActivity;

})(window);