var WINDOW_WIDTH = 500;
var WINDOW_HEIGHT = 500;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var curShowTimeSeconds = 0

var deg = 0;

// var ball = {x:512,y:100,r:20,g:2,vx:-4,vy:0,color:"#005588"};
var anniuStyle = {"width":72,"height":72};
window.onload = function(){

    var canvas1 = document.getElementById('canvas1');
    var context1 = canvas1.getContext("2d");
    var canvas2 = document.getElementById('canvas2');
    var context2 = canvas2.getContext("2d");


    canvas1.width = WINDOW_WIDTH;
    canvas1.height = WINDOW_HEIGHT;
    // canvas2.width = WINDOW_WIDTH;
    // canvas2.height = WINDOW_HEIGHT;

    dayuan(canvas1, context1);
    anniu(canvas2, context2);
    // curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function(){
        // rotate(canvas1,deg++);
    },10);
    
}
function anniu(cvs, cxt)
{
    var _xwidth = 144;
    var _xheight = 174;
    cvs.width = _xwidth;
    cvs.height = _xheight;
    cvs.style.marginTop=( _xheight - _xwidth ) / 2 + "px";
    cvs.style.position="absolute";
    cvs.style.left="50%";
    cvs.style.top="50%";
    cvs.style.webkitTransform ="translate(-50%, -50%)";
    cvs.style.MozTransform ="translate(-50%, -50%)";
    cvs.style.msTransform ="translate(-50%, -50%)";
    cvs.style.OTransform ="translate(-50%, -50%)";
    cvs.style.transform ="translate(-50%, -50%)";

    //三角形
    cxt.beginPath();
    cxt.moveTo( _xwidth / 2, 0);
    cxt.lineTo( _xwidth / 2 - ( _xheight - _xwidth ), _xheight - _xwidth + 8);
    cxt.lineTo( _xwidth / 2 + ( _xheight - _xwidth ),_xheight - _xwidth +8);
    // cxt.lineTo( _xwidth / 2 ,_xheight - _xwidth +8);
    cxt.strokeStyle = "block";
    cxt.stroke();    //笔画
    var grad  = cxt.createLinearGradient(_xwidth / 2,0, _xwidth / 2 + ( _xheight - _xwidth ),_xheight - _xwidth +8);
    /* 指定几个颜色 */
    grad.addColorStop(0,'rgb(0, 0, 0)');
    // grad.addColorStop(1,'rgb(255, 80, 77)');
    grad.addColorStop(1,'rgb(255, 255, 255)');  // 紫
    cxt.fillStyle = grad;
    cxt.fill();
    cxt.closePath();
    cxt.beginPath();
    cxt.moveTo( _xwidth / 2, 0);
    cxt.lineTo( _xwidth / 2, 30);cxt.stroke();    //笔画
    cxt.closePath();

    //圆圈
    dCircle(cxt , _xwidth / 2, _xwidth / 2 + _xheight - _xwidth, _xwidth / 2, "rgb(255,232,130)");
    dCircle(cxt , _xwidth / 2, _xwidth / 2 + _xheight - _xwidth, _xwidth / 2 - 7, "rgb(229,48,17)");
    dCircle(cxt , _xwidth / 2, _xwidth / 2 + _xheight - _xwidth, _xwidth / 2 - 12, "rgb(254,240,174)");

    //需要优化
    cxt.font = "30px Courier New";
    cxt.fillStyle = "rgb(241,71,39)";
    cxt.fillText("点击", 42, 92);
    cxt.fillText("开始", 42, 122);
    cxt.textAlign='left';
    
}
function dayuan(cvs, cxt)
{
    //使用矩阵
    dCircle(cxt , WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 2, "rgb(129,42,26)");
    dCircle(cxt , WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 2 - 15, "rgb(255,116,20)");
    dCircle(cxt , WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 2 - 20, "rgb(255,209,87)");
    //画扇形
    dSector(cxt, WINDOW_WIDTH / 2 ,WINDOW_HEIGHT / 2 ,WINDOW_HEIGHT / 2 - 20, 8);
    dSmallorigin(cxt, 250, 250, 5, 36);
}

function dCircle(cxt, x, y, r, color)   //画圆
{

    cxt.fillStyle = color;
    cxt.beginPath();
    cxt.arc(x, y, r, 0,2*Math.PI, true)
    cxt.closePath()
    cxt.fill()
}

function dSector(cxt, x, y , r, l)  //画扇形 8个
{
    for (var i = 0; i < l; i++) {
        var color = i % 2 == 0 ? "rgb(255,211,96)" : "rgb(255,187,42)";
        cxt.fillStyle = color;
        cxt.beginPath();
        cxt.moveTo(x, y);
        cxt.arc(x, y, r, (2/l * i) * Math.PI, (2/l * (i + 1)) * Math.PI);
        //cxt.arc(x, y, r, (0.25*i)*Math.PI,(0.25*(i+1))*Math.PI);
        cxt.lineWidth = 1;
        cxt.strokeStyle = "red";
        cxt.stroke();    //笔画
        cxt.closePath();
        
        cxt.fill()
    };
    // cxt.beginPath();
    // cxt.moveTo(480, 250);
    // cxt.lineTo(x,y);
    // cxt.lineWidth = 1;
    // cxt.strokeStyle = "red";
    // cxt.stroke();    //笔画
    // cxt.closePath();
}

function dSmallorigin(cxt, x, y , r, l) //画小圆点 36个
{
    for (var i = 0; i < l; i++) {
        var Xh = x + (x-7.5) * Math.sin(changeRadian((i - 1) * (360 / l)));
        var Yh = y - (y-7.5) * Math.cos(changeRadian((i - 1) * (360 / l)));
        cxt.fillStyle = "rgb(255, 213, 40)";
        cxt.beginPath();cxt.moveTo(x, y);
        cxt.arc(Xh, Yh, r, 0, 2 * Math.PI);
        //cxt.arc(x, y, r, (0.25*i)*Math.PI,(0.25*(i+1))*Math.PI);
        
        cxt.closePath()
        cxt.fill()
    };
}

function rotate(cxt,deg)
{
    cxt.style.webkitTransform ="rotate("+deg+"deg)";
    cxt.style.MozTransform  ="rotate("+deg+"deg)";
    cxt.style.msTransform  ="rotate("+deg+"deg)";
    cxt.style.OTransform  ="rotate("+deg+"deg)";
    cxt.style.transform  ="rotate("+deg+"deg)";
}

function changeRadian(angle) 
{
    return Math.PI / 180 * angle;
}

