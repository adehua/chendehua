(function(wnd){
	function Tween(target) 
	{
		this._steps = [];
		this._target = target;
		this._isActive = false;
		this._startState = "";
		this._timer = null;
	}
	Tween.get = function(target) 
	{
		var t = new Tween(target);
		t._startState = target.attr();
		return t;
	};
	var p = Tween.prototype;
	
	p.wait = function (duration)
	{
		if (isNaN(duration) || duration < 0) { duration = 0; }
		return this._addStep({t:"wait",d:duration});
	}
	p.call = function (callback,params)
	{
		return this._addStep({t:"call",c:callback,p:params});
	}
	p.set = function (attrs) 
	{		
		return this._addStep({t:"set",a:attrs});
	}
	p.to = function (attrs,duration,easing) 
	{		
		if (isNaN(duration) || duration < 0) { duration = 0; }
		return this._addStep({t:"to",a:attrs,d:duration,e:easing})
	}
	p.remove = function () 
	{		
		this._isActive = false;	
		this._steps = [];
		this._target.stop();
		clearTimeout(this._timer);		
	}
	p.reset = function()
	{
		this._set(this._startState);
	}
	p._addStep = function(o)
	{		
		this._steps.push(o);		
		if(!this._isActive)this._updateStep();
		return this;
	}
	p._updateStep = function()
	{			
		if(this._steps.length == 0)
		{
			this._isActive = false;
			return;
		}
		this._isActive = true;
		
		var _this = this;
		var o = this._steps.shift();		
		switch(o.t)
		{
			case "to" :				
				this._target.animate(o.a,o.d,o.e,function()
				{
					_this._isActive = false;	
					_this._updateStep();
				});	
				break;
			case "wait" :
				this._timer = setTimeout(function()
				{
					_this._isActive = false;
					_this._updateStep();
				},o.d);
				break;
			case "call" :
				o.c.call(this,o.p);
				this._isActive = false;
				this._updateStep();
				break;
			case "set" :
				this._set(o.a);
				this._isActive = false;
				this._updateStep();
				break;
			default:
				break;
		}			
	}
	p._set = function(attrs)
	{
		this._target.attr(attrs);
	}
	wnd.Tween = Tween;
})(window);