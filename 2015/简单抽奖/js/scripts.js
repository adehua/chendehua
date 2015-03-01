/*
@陈德华
简单的抽奖概率问题
*/

var data=[['Phone5','0.1'],['xieie','0.9']];
var timer=null,
    flag=0,
    gl = 10;

window.onload=function(){
    var play=document.getElementById('play'),
        stop=document.getElementById('stop');

    // 开始抽奖
    play.onclick=playFun;
    stop.onclick=stopFun;

   // 键盘事件
   document.onkeyup=function(event){
      event = event || window.event;
      if(event.keyCode==13){
         if(flag==0){
           playFun();
           flag=1;
         }else{
           stopFun();
           flag=0;
         }
      }
   }
}

function playFun(){
	var title=document.getElementById('title');
	var play=document.getElementById('play');
	clearInterval(timer);
	timer=setInterval(function(){
	   var random=Math.floor(Math.random()*data.length);
	   title.innerHTML=data[random][0];
	},50);
    play.style.background='#999';
}

function stopFun(){
  var title=document.getElementById('title');
  var play=document.getElementById('play');
	clearInterval(timer);
  var datas=Array();
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i][1]*gl; j++) {
      datas.push(data[i][0]);
    };
  };
  var randoms=Math.floor(Math.random()*datas.length);
  title.innerHTML = datas[randoms];
	play.style.background='#036';
}