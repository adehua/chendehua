function myAddEvent(obj,sEv,fn){
	if(obj.addEventListener){//谷歌下添加事件
	 	obj.addEventListener(sEv,fn,false);
	 }else if(obj.attachEvent){	//IE下添加事件
	 	obj.attachEvent('on' + sEv,fn);
	 }else{//低版本下添加事件
	 	obj['on'+sEv] = fn;
	 }
}
function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');
  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}
function Cquery(vArg){
	this.elements = [];
	switch(typeof vArg){
		case 'function':
			myAddEvent(window,'load',vArg);
			break;
		case 'string':
			switch(vArg.charAt(0)){
				case '#':
					var obj=document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case '.':
					this.elements=getByClass(vArg.substring(1));
					break;
				default:
					this.elements=document.getElementsByTagName(vArg);
			}
	}
	return this.elements;
}

Cquery.prototype.click = function(fn) {
	var i =0;
	for (var i = 0; i < this.elements.length; i++) {
		myAddEvent(this.elements[i],'click',fn);
	};
};