var w=0;
var bEnd=true;
var i=0;
var mWidth=130;
window.onload=function ()
{
	var oDiv=document.getElementById('show1');
	var aLi=oDiv.getElementsByTagName('li');
	var aSpan=oDiv.getElementsByTagName('span');
	oDiv.timer=null;
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].index=i;
		aLi[i].onmouseover=function ()
		{
		   var ind=this.index;
			if(oDiv.timer)
	           {
					clearInterval(oDiv.timer);
			   }
				oDiv.timer=setInterval
				(
					function ()
					{
						var iWidth=oDiv.offsetWidth;

						for(i=0;i<aLi.length;i++)
						{
							if(i==ind)
							{
								continue;
							}
							if(mWidth==aLi[i].offsetWidth)
							{
								iWidth-=mWidth;
							    continue;
							}
							bEnd=false;
							speed=Math.ceil((aLi[i].offsetWidth-mWidth)/10);
							w=aLi[i].offsetWidth-speed;
							if(w<=mWidth)
							{
								w=mWidth;
							}
							aLi[i].style.width=w+'px';
							iWidth-=w;
						}
						aLi[ind].style.width=iWidth+'px';
						if(bEnd)
						{
							clearInterval(oDiv.timer);
							oDiv.timer=null;
						}
					}, 30
				);
		};
		mWidth=Math.min(mWidth, aLi[i].offsetWidth);
	}
};

