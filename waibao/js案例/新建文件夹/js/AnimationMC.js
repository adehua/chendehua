;
/*
 * zdw_init传递两个值  第一个为传递关键帧的Matrix数组
 * [
 * 	{fr1:[数组]},
 * 	{fr10:[数组]}
 * ]
 * 	命名规范,f+当前帧数：[矩阵数据]
 * 第二个参数为总帧数
 */
(function($) {
	$.fn.extend({
		zdw_init: function(_KEY_FRAMES, TOTAL_FRAMES) {
			var KEY_FRAMES = _KEY_FRAMES;
			var guanjian_frame = new Array(); //关键帧数据,比如第一帧  第五帧[1,5]
			var guanjian_framedata = new Array(); //存放关键帧的具体数据的数组
			var curDom = this;
			curDom.dataframe = {};
			/**
			 * 是否循环播放，默认为不循环播放
			 */
			curDom.loop = false;
			/**
			 * 当前帧
			 */
			curDom.curFrame = 1;
			/**
			 *总帧数 
			 */
			curDom.totalframe = TOTAL_FRAMES;
			curDom.stoped = true;
			curDom.endFrame = curDom.totalframe;
			curDom.startFrame = 1;
			curDom.increment = 1;//正方向还是反方向
			
			//console.log(KEY_FRAMES)
			//获取各个关键帧的数据 数据作为一个数组，可以获得当前数组中所有关键帧
			for (var i = 0; i < KEY_FRAMES.length; i++) {
				for (var name in KEY_FRAMES[i]) {
					guanjian_frame.push(parseInt(name.substr(2)))
						//	console.log(KEY_FRAMES[i][name])
				}
			}

			//console.log(guanjian_frame)
			for (var j = 0; j < guanjian_frame.length; j++) {
				//console.log(KEY_FRAMES[j]["fr"+guanjian_frame[j]+""])
				guanjian_framedata.push(KEY_FRAMES[j]["fr" + guanjian_frame[j] + ""])
			}


			islastguanjian();

			function islastguanjian() {
				if (guanjian_frame[guanjian_frame.length - 1] < TOTAL_FRAMES) {
					guanjian_frame.push(TOTAL_FRAMES);
					guanjian_framedata.push(guanjian_framedata[guanjian_framedata.length - 1])
				}
			}
			curDom.isGetOpactiy = isGetopactiy();
			createData();

			//开始计算每个数组中数据的间隔
			function createData() {
				for (var i = 0; i < guanjian_frame.length - 1; i++) {
					//console.log("------------------")
					add_KEY_FRAMES(i, i + 1);
				}
			}

			function isGetopactiy(){

				if(guanjian_framedata[0].length>6){
					return true
				}else{
					return false
				}
			}





			//向KEY_FRAMES对象中添加start到end的全部matrix数据
			function add_KEY_FRAMES(start, end) {
				var first = guanjian_framedata[start];
				var last = guanjian_framedata[end];
				var totframe = guanjian_frame[end] - guanjian_frame[start] + 1
				var inc0 = (last[0] - first[0]) / totframe;
				var inc1 = (last[1] - first[1]) / totframe;
				var inc2 = (last[2] - first[2]) / totframe;
				var inc3 = (last[3] - first[3]) / totframe;
				var inc4 = (last[4] - first[4]) / totframe;
				var inc5 = (last[5] - first[5]) / totframe;
				
				var alpha7 = 0;
				
				if(last[6]!=undefined&&last[6]!=null){
					 alpha7 = (last[6] - first[6]) / totframe;
				}
				
				for (var i = 0; i < totframe - 1; i++) {
					var arr = [];
					arr[0] = first[0] + (inc0 * i);
					arr[1] = first[1] + (inc1 * i);
					arr[2] = first[2] + (inc2 * i);
					arr[3] = first[3] + (inc3 * i);
					arr[4] = first[4] + (inc4 * i);
					arr[5] = first[5] + (inc5 * i);
					if(curDom.isGetOpactiy){
						var alp = first[6] + (alpha7 * i);
						curDom.dataframe['alp' + (i + 1 + guanjian_frame[start])] = alp;
					//	console.log(alp)
					}
					
					curDom.dataframe['fr' + (i + 1 + guanjian_frame[start])] = 'matrix(' + arr.join(' ') + ')';
					
					//	console.log((i + 1+guanjian_frame[start]))
				}
				curDom.dataframe['fr' + guanjian_frame[start]] = 'matrix(' + first[0]+","+first[1]+","+first[2]+","+first[3]+","+first[4]+","+first[5]+ ')';
				curDom.dataframe['fr' + guanjian_frame[end]] = 'matrix(' + last[0]+","+last[1]+","+last[2]+","+last[3]+","+last[4]+","+last[5] + ')';
				
				if(curDom.isGetOpactiy){
					curDom.dataframe['alp' + guanjian_frame[start]] = first[6];
					curDom.dataframe['alp' + guanjian_frame[end]] = last[6];
				}
				
			}
			curDom.playAnimation = function(cur){
				$(curDom).attr("transform",curDom.dataframe["fr"+cur]);

				if(curDom.isGetOpactiy){
					//alert("1")
					$(curDom).css({"opacity":curDom.dataframe["alp"+cur]})
				}else{
					//alert("2")
				}
			}

			curDom.playAnimation(curDom.curFrame)
			return this;
		},
		gotoAndPlay: function(num,loop) {
			this.loop = loop;
			this.curFrame = num;
			this.endFrame = this.totalframe;
			this.stoped = false;
			return this;
		},
		gotoAndStop: function(num) {
			this.curFrame = num;
			this.playAnimation(this.curFrame)
			this.stoped = true;
			return this;
		},
		updataAnimation:function(){
			if(!this.stoped){
				this.curFrame+=this.increment;
				if(this.curFrame>=this.endFrame&&this.increment==1){
					if(this.loop == true){
						this.curFrame = this.startFrame;
					}else{
						this.curFrame = this.endFrame;
						this.stoped = true
					}
				}
				
				if((this.curFrame<=this.endFrame)&&(this.increment==-1)){
					if(this.loop != true){
						this.curFrame = this.endFrame;
						this.stoped = true
					}else{
						this.curFrame = this.startFrame;
					}
				}
				//console.log(this.curFrame)
				this.playAnimation(this.curFrame);
			}
			
			return this;
		},
		fromAndtoPlay:function(start,end){
			this.curFrame = start;
			this.playAnimation(this.curFrame);
			this.endFrame = end;
			this.startFrame = start;
			this.stoped = false;
			this.increment = (start<end)?1:-1
		},
		stop:function(){
			this.stop = true;
			return this;
		},
		play:function(){
			this.stop = false;
			return this;
		},
		zdw_initColor:function(_KEY_FRAMES, TOTAL_FRAMES){
			var KEY_FRAMES = _KEY_FRAMES;
			var guanjian_frame = new Array(); //关键帧数据,比如第一帧  第五帧[1,5]
			var guanjian_framedata = new Array(); //存放关键帧的具体数据的数组
			var curDom = this;
			
			curDom.dataframe = {};
			/**
			 * 是否循环播放，默认为不循环播放
			 */
			curDom.loop = false;
			/**
			 * 当前帧
			 */
			curDom.curFrame = 1;
			/**
			 *总帧数 
			 */
			curDom.totalframe = TOTAL_FRAMES;
			curDom.stoped = true;
			curDom.endFrame = curDom.totalframe;
			curDom.startFrame = 1;
			curDom.increment = 1;//正方向还是反方向
			
			//console.log(KEY_FRAMES)
			//获取各个关键帧的数据 数据作为一个数组，可以获得当前数组中所有关键帧
			for (var i = 0; i < KEY_FRAMES.length; i++) {
				for (var name in KEY_FRAMES[i]) {
					guanjian_frame.push(parseInt(name.substr(2)))
						//	console.log(KEY_FRAMES[i][name])
				}
			}

//			console.log(guanjian_frame)
			for (var j = 0; j < guanjian_frame.length; j++) {
				//console.log(KEY_FRAMES[j]["fr"+guanjian_frame[j]+""])
				guanjian_framedata.push(KEY_FRAMES[j]["fr" + guanjian_frame[j] + ""])
			}


			islastguanjian();

			function islastguanjian() {
				if (guanjian_frame[guanjian_frame.length - 1] <= TOTAL_FRAMES) {
					guanjian_frame.push(TOTAL_FRAMES);
					guanjian_framedata.push(guanjian_framedata[guanjian_framedata.length - 1])
				}
			}

			createData();

			//开始计算每个数组中数据的间隔
			function createData() {
				for (var i = 0; i < guanjian_frame.length - 1; i++) {
					console.log("------------------")
					add_KEY_FRAMES(i, i + 1);
				}
			}
			
			//向KEY_FRAMES对象中添加start到end的全部matrix数据
			function add_KEY_FRAMES(start, end) {
				var first = guanjian_framedata[start];
				var last = guanjian_framedata[end];
				var totframe = guanjian_frame[end] - guanjian_frame[start] + 1
		
				//console.log(totframe)
				
				var firstnum10 = first[0].split(",")
				var lastnum10 = last[0].split(",")
				var jianger = (lastnum10[0]-firstnum10[0])/totframe;
				var jiangeg = (lastnum10[1]-firstnum10[1])/totframe;
				var jiangeb = (lastnum10[2]-firstnum10[2])/totframe;
				
			//	console.log(jianger+"++++++++++++++++++++")

				for (var i = 0; i < totframe - 1; i++) {
					var arrr =0;
					var arrg =0;
					var arrb =0;
					arrr = (parseInt(firstnum10[0])+Math.round(parseFloat(jianger) * i));
					arrg = parseInt(firstnum10[1])+Math.round(parseFloat(jiangeg) * i)
					arrb = parseInt(firstnum10[2])+Math.round(parseFloat(jiangeb) * i)
				//	console.log(parseInt(firstnum10[0])+"-----"+Math.round(parseFloat(jianger) * i)+"-------"+i)
					curDom.dataframe['fr' + (i + 1 + guanjian_frame[start])] = "RGB("+arrr+","+arrg+","+arrb+")";
						//console.log("RGB("+arrr,arrg,arrb+")")
				}
				curDom.dataframe['fr' + guanjian_frame[start]] = "RGB("+first[0]+")";
				curDom.dataframe['fr' + guanjian_frame[end]] = "RGB("+last[0]+")";
			}
			curDom.playAnimation = function(cur){
				//console.log(curDom.dataframe["fr"+cur],cur)
				$(curDom).css("stop-color",curDom.dataframe["fr"+cur])
				//console.log($(curDom).css("stop-color"))
			}

			curDom.playAnimation(curDom.curFrame)
			
			
			return this;
		}
	})

})(jQuery)