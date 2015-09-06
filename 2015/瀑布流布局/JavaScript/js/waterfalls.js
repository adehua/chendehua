function getbyclass(parent,clsname){
    var getParent = document.getElementsByTagName("*");
    var getClassname = [];
    for (var i = 0; i < getParent.length; i++) {
        if (getParent[i].className==clsname){
            getClassname.push(getParent[i]);
        }
    };
    return getClassname;
};
window.onload = function(){
    waterfall('main','pin');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll = function(){
        if(checkscrollside()){
            var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement('div'); //添加 元素节点
                oPin.className='pin';                   //添加 类名 name属性
                oParent.appendChild(oPin);              //添加 子节点
                var oBox=document.createElement('div');
                oBox.className='box';
                oPin.appendChild(oBox);
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('main','pin');
        };
    }
}
function waterfall(parent,pin){
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getbyclass(oParent,pin);// 获取存储块框pin的数组aPin
    var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
    var num=Math.floor(document.documentElement.clientWidth/iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    oParent.style.cssText='width:'+iPinW*num+'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
        var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<aPin.length;i++){//遍历数组aPin的每个块框元素
        var pinH=aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i]=pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH 
            var minHIndex=getminHIndex(pinHArr,minH);
            aPin[i].style.position='absolute';//设置绝对位移
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}
/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}

function checkscrollside(){
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getbyclass(oParent,'pin');// 获取存储块框pin的数组aPin
    var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
    var num=Math.floor(document.documentElement.clientWidth/iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    var oParent=document.getElementById('main');
    var lastPinH=aPin[aPin.length-num-1].offsetTop+aPin[aPin.length-num-1].offsetHeight;//创建【触发添加块框函数waterfall()】的高度：
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性 标准模式和非标准模式
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}