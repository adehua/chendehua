Snap.plugin(function (Snap, Element, Paper, global) {
	var proto = Element.prototype;		
	proto.__defineGetter__('x',function()
	{
		return this.getMatrix().x(0,0);
	});
	proto.__defineSetter__('x',function(v)
	{
		var gm = this.getMatrix();
		gm.e = v;
    	this.transform(gm);
	});
	proto.__defineGetter__('y',function()
	{
		return this.getMatrix().y(0,0);
	});
	proto.__defineSetter__('y',function(v)
	{
    	var gm = this.getMatrix();
		gm.f = v;
    	this.transform(gm);
	});
	proto.__defineGetter__('visible',function()
	{
		return this.attr("visibility") != "hiddeen";
	});
	proto.__defineSetter__('visible',function(v)
	{
    	this.attr({visibility:v?"visible":"hidden"});
	});
	proto.__defineGetter__('alpha',function()
	{
		return this.attr("opacity");
	});
	proto.__defineSetter__('alpha',function(v)
	{
    	this.attr({opacity:v});
	});
	proto.__defineGetter__('rotation',function()
	{
		var gm = this.getMatrix();
		this.transform(gm);
		var m = this.transform().local
		if(m.split('r')[1] != null)
		{
			return m.split('r')[1].split(',')[0]
		}
		return 0;
	});
	proto.__defineSetter__('rotation',function(v)
	{
    	this.transform("r0");
		this.rotate(v);
	});
	proto.__defineGetter__('width',function()
	{
		return this.getBBox().width;
	});
	proto.__defineSetter__('height',function(v)
	{
		return this.getBBox().height;
	});
	proto.rotate = function(a,rx,ry)
	{
		this.transform(this.transform().localMatrix.rotate(a,rx,ry));
	}
	proto.scale = function(sx,sy,cx,cy)
	{
		this.transform(this.transform().localMatrix.scale(sx,sy,cx,cy));
	}
	proto.getMatrix = function()
	{
		var tf = this.transform();		
		if(tf != "")
		{
			return tf.localMatrix;
		}
		if(this.node.attributes.transform != null)
		{
			var mstr = this.node.attributes.transform.value;
			mstr = mstr.replace("matrix(","");
			mstr = mstr.replace(")","");
			mstr = mstr.replace(/[ ]/g,"");
			var ma = mstr.split(",");			
			return new Snap.Matrix(ma[0],ma[1],ma[2],ma[3],ma[4],ma[5])
		}
		return new Snap.Matrix(1,0,0,1,0,0);
	}
	proto.arrow = function(c,w,sw,aw) 
	{
		var _c = c;
		var _w = w;
		var _sw = sw;
		var _aw = aw;
		var _line, _head;
		var p = this.g();
		
		draw();
		p.__defineGetter__('width',function()
		{
			return w;
		});
		p.__defineSetter__('width',function(w)
		{
			_w = w;
			_line.attr({x2:w-_aw});
			_head.x = w - _aw;
		});
		p.setColor = function(c)
		{
			_c = c;
			_line.attr({stroke:c});
			_head.attr({fill:c});
		}
		function draw()
		{
			_line = p.line(0,0,_w - _aw,0);	
			_line.attr({
				stroke: _c,
				strokeWidth: _sw	
			});
			
			_head = p.polygon(0,-_aw/2,0,_aw/2,_aw,0);
			_head.x = _w - _aw;
			_head.attr({
				fill:_c
			});
			p.add(_line,_head);
		}
		
		return p;
	}
	
	proto.slider = function(c,w,n) 
	{
		var _c = c;
		var _w = w;
		var _h = 6;
		var _n = n>1 ? n : 1;	
		var _bc = "#DBEDFD"
		var _bsw = 2;
		var _lsw = 1;
		var _enable = true;
		var _value = 0;
		var _block,_hit;
		var p = this.g();
		
		draw();	
		createListener();
		
		p.__defineGetter__('value',function()
		{
			return _value;
		});
		p.__defineSetter__('value',function(v)
		{
			v = v < 0 ? 0 : v;
			v = v<=_n ? v : _n;			
			if(v!= _value)
			{
				_value = v;
				_block.x = v*_w/_n;
				this.onchange();
			}
		});
		p.__defineGetter__('enable',function()
		{
			return _enable;
		});
		p.__defineSetter__('enable',function(v)
		{
			enable = v;
			_hit.visible = v;
		});
		p.onchange = function(f)
		{
			f.apply();
		};
		function createListener()
		{			
			var isDrag = false;
			_hit.drag();
			_hit.drag(null,startHandler,endHandler);
			function startHandler ()
			{
				isDrag = true;
			}
			function endHandler ()
			{
				this.x = _block.x;
				this.y = _block.y;
				isDrag = false;
			}	 
			setInterval(function()
			{
				if(isDrag)
				{
					p.value = Math.round(_hit.x/_w*_n);
				}else
				{
					if(_hit.x != _block.x)
					{
						_hit.x = _block.x;
						_hit.y = _block.y;
					}
				}
			},100)
		}
		
		function draw()
		{		
			//¿Ì¶ÈÏß
			var kd = p.g();
			var u = _w/_n;
			for(var i = 1; i<_n;i++)
			{
				var d = kd.line(i*u,0,i*u,-_h*0.8);
			}
			var bottom = kd.line(0,0,_w,0);
			kd.line(_lsw*0.5,0,_lsw*0.5,-_h);
			kd.line(_w-_lsw*0.5,0,_w-_lsw*0.5,-_h);
			kd.y = _h/2;
			_block = drawBlock();
			p.selectAll("line").attr({
				stroke: _c,
				strokeWidth: _lsw
			});
			bottom.attr({strokeWidth:_bsw});
			//»¬¶¯¿é£¨Òþ²Ø£©
			_hit = p.rect(-41,-23,41,46);
			_hit.y = _h/2;
			_hit.attr({opacity:0});
		}
		function drawBlock()
		{
			var gb = p.g();				
			var bg = gb.polyline([-41,-23],[-19,-23],[0,0],[-19,23],[-41,23]);
			bg.attr({
			   fill:"#495F85",
			});
			gb.rect(-34,-7,4,4);
			gb.rect(-34,3,4,4);
			gb.rect(-24,-7,4,4);
			gb.rect(-24,3,4,4);
			gb.selectAll("rect").attr({fill:"#FFF"})
			gb.y = _h/2;
			return gb;
		}
		
		return p;
	}
});
