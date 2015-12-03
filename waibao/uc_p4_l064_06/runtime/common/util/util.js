var InternetExplorer = navigator.appName.indexOf("Microsoft") != -1;

function getPageXmlUrl() {
	var sco = getParam( window.location, "sco" );
	// bug 10771 - pena ciezka zabrania przeczenia na inny serwer
	//sco = dirname(window.location)+sco;
	sco = pathNormalize(sco);
	// bug 23460: some sites block urls with params containing ../../ - use ~ instead of ../
	sco = sco.replace(/~/g,'../');
	return sco;
}

var _absoluteBasePlayerinfoXml = null;
function getAbsoluteBase(useplayerinfoxml) {
	var base;
	if (useplayerinfoxml) {
		if (_absoluteBasePlayerinfoXml===null) {
			try {
				var req = sendRequest('playerinfo.xml');
				if (req.status==200) {
					var nodes = req.responseXML.getElementsByTagName("contentBase");
					if (nodes.length>0) {
						var src = nodes.item(0).getAttribute("src");
						if (src) {
							_absoluteBasePlayerinfoXml = src;
							jLog("loaded playerinfo.xml refers to '"+_absoluteBasePlayerinfoXml+"'");
						} else {
							jLogDebug("playerinfo.xml doesn't contain attribute src in contentBase tag");
						}
					} else {
						jLogDebug("playerinfo.xml doesn't contain contentBase tag");
					}
				} else {
					jLogDebug("error loading playerinfo.xml: "+req.status);
				}
			} catch( x ) {
				jLogDebug("error loading playerinfo.xml: "+x.message);
			}
			if (_absoluteBasePlayerinfoXml===null)
				_absoluteBasePlayerinfoXml = window.location;
		}
		base = _absoluteBasePlayerinfoXml
	} else {
		base = window.location;
	}
	return base;
}
function getAbsolutePath(path,useplayerinfoxml) {
	// use base if path is not full url
	if (!(path && path.indexOf('://') != -1)) {
		var base = getAbsoluteBase(useplayerinfoxml);
		path = dirname(base)+path;
	}
	path = pathNormalize(path);
	return path;
}

function getAbsolutePageXmlUrl(useplayerinfoxml) {
	var sco = getPageXmlUrl();
	return getAbsolutePath(sco,useplayerinfoxml);
}

function dirname(s,removeSlash) {
	if (s===null || typeof(s)=="undefined")
		return "";
	s = s.toString();
	s = removeParams(s);
	var idx = s.lastIndexOf("/");
	if (idx==-1)
		return "";
	if (typeof(removeSlash)=="undefined")
		removeSlash = false;
	if (!removeSlash)
		idx++;
	return s.substr(0,idx);
}

function pathNormalize(s) {
	var idx = s.indexOf('?');
	var params;
	if (idx!=-1) {
	 	params = s.substr(idx);
	 	s = s.substr(0,idx);
	} else {
		params = "";
	}
	var a = s.split("/");
	var i;
	for(i=0; i<a.length;) {
		if (a[i]==".") {
			a.splice(i,1);
		} else if (a[i]==".." && i>0 && a[i-1]!=".." ) {
			a.splice(i-1,2);
			i--;
		} else {
			i++;
		}
	}
	return a.join("/")+params;
}

var jLogApplet = null;
function jLog( msg ) {
	if (typeof(console)!="undefined" && typeof(console.log)!="undefined") {
		console.log(msg);
	} else if (typeof(opera)!="undefined" && typeof(opera.postError)!="undefined") {
		opera.postError(msg);
	} else {
		// IE only?
		// do nost use it
		if (jLogApplet===null) {
			jLogApplet = getPlugin("lmsImpl");
			if (jLogApplet==null)
				jLogApplet = getPlugin("scormhlp");
			if (jLogApplet==null)
				jLogApplet = false;
		}
		try {
			if (jLogApplet)
				jLogApplet.log( msg );
		} catch(x) {
		}
	}
}
var _jLogDebug = getParam(null,'debug',false);
function jLogDebug( msg ) {
	if (_jLogDebug)
		jLog(msg);
}

function isUndefined(o) {
	return typeof(o)=="undefined";
}
function isEmpty(o) {
	return o===null || isUndefined(o) || (typeof(o)=="string" && o.length==0);
}
function getObj(id) {
	var o = (document.all?document.all[id]:document.getElementById(id));
	if (isUndefined(o))
		o = null;
	return o;
}
function isValidApplet(id) {
	var o = getObj(id);
	if (o!=null) {
		try {
			o.getAppletInfo();
			return true;
		} catch( e ) {
		}
	}
	return false;
}
function getPlugin(id) {
	var o = InternetExplorer ? window[id] : window.document[id];
	if (isEmpty(o))
		return null;
	return o;
}

function isValidFlash(id) {
	var o = getPlugin(id);
	if (o!=null) {
		return true;
/*		try {
			o.SetVariable("_jscheck","1");
			return true;
		} catch( e ) {
			jLog("isValidFlash SetVariable() error: "+e.message);
		}
		try {
			o.GetVariable("_level0");
			return true;
		} catch( e ) {
			jLog("isValidFlash GetVariable(_level0) error: "+e.message);
		}
*/
	}
	return false;
}

function getParam( url, param, def ) {
	if (isUndefined(def))
		def = null;
	if (url===null)
		url = window.location;
	var vname = param+"=";
	var vurl = url.toString();
	var idx = vurl.indexOf('?');
	var v = def;
	if (idx!=-1) {
		vurl = vurl.substring(idx+1);
		//vurl = unescape(vurl);
		idx = vurl.indexOf(vname);
		if (idx!=-1) {
			v = vurl.substring(idx+vname.length);
			idx = v.indexOf('&');
			if (idx!=-1) {
				v = v.substring(0,idx);
			}
			v = v.replace(/\+/g," ");
			v = decodeURIComponent(v); //unescape(v);
		}
	}
	return v;
}
function removeParams( url ) {
	var idx = url.indexOf('?');
	if (idx!=-1) {
		url = url.substring( 0, idx );
	}
	return url;
}
function getParams( url ) {
	var idx = url.indexOf('?');
	var params = "";
	if (idx!=-1) {
		params = url.substring( idx+1 );
	}
	return params;
}
function parseParams(encoded) {
	var o = new Object();
	var params = encoded.split("&");
	for(var i=0; i<params.length; i++) {
		var p = params[i];
		var idx = p.indexOf("=");
		if (idx==-1) {
			o[p] = true;
		} else {
			var key = p.substring(0,idx);
			var val = p.substring(idx+1);
			val = decodeURIComponent(val);
			o[key] = val;
		}
	}
	return o;
}
function parseParamsLowercase(encoded) {
	var o = new Object();
	var params = encoded.split("&");
	for(var i=0; i<params.length; i++) {
		var p = params[i];
		var idx = p.indexOf("=");
		if (idx==-1) {
			o[p] = true;
		} else {
			var key = p.substring(0,idx).toLowerCase();
			var val = p.substring(idx+1);
			val = decodeURIComponent(val);
			o[key] = val;
		}
	}
	return o;
}

function makeParams(paramsAsObject) {
	var params = "";
	var value;
	var key;
	var i = 0;
	for(key in paramsAsObject) {
		value = paramsAsObject[key];
		if (value===null)
			continue;
		if (i>0)
			params += '&';
		params += key+'='+encodeURIComponent(value);
		i++;
	}
	return params;
}
function removeParam( url, name ) {
	var params = getParams(url);
	params = parseParams(params);
	if (!isEmpty(params[name])) {
		params[name] = null;
		params = makeParams(params);
		url = removeParams(url);
		if (!isEmpty(params))
			url = url+"?"+params;
	}
	return url;
}
function getExtension( url ) {
	url = removeParams(url);
	var idx = url.lastIndexOf('.');
	var ext = "";
	if (idx!=-1) {
		var idx2 = url.lastIndexOf('/');
		if (idx==-1 || idx>idx2) {
			ext = url.substring(idx+1);
		}
	}
	return ext;
}
function addParam( url, name, value ) {
	var idx = url.indexOf('?');
	if (idx!=-1) {
		url += "&";
	} else {
		url += "?";
	}
	url += name+"="+encodeURIComponent(value);
	return url;
}

function getElement( eid, showAlert ) {
	var e = null;
	if (typeof(showAlert)=="undefined")
		showAlert = true;
	
	 if (document.getElementById)
		e = document.getElementById(eid);
	 else if (document.layers) {
		e = document.layers[eid];
		if ( !e ) {	
			e = document.embeds[eid];
		}
		if ( !e ) {
			e = document.applets[eid];
		}
		if ( !e )
			e = document.forms[eid];
	}
	 else if (document.all)
		e = document.all[eid];
	 else if (showAlert)
	 	alert( "dont know how to find: "+eid );
	/*
	if (InternetExplorer)
		e = eval("document.all."+eid);
	else
		e = document.getElementById(eid);
	*/
	return e;
}

function decodeTime( time ) {
	time = String(time);
	var pi = 0;
	var i = time.indexOf(':',pi);
	var h = time.substring(pi,i);
	pi = i+1;
	i = time.indexOf(':',pi);
	var m = time.substring(pi,i);
	pi = i+1;
	i = time.indexOf('.',pi);
	var s = time.substring(pi,(i!=-1?i:time.length));
	s = Number(h)*3600+Number(m)*60+Number(s);
	return s;
}

function formatTime( s ) {
	var h = Math.floor(s/3600);
	var m = Math.floor((s-h*3600)/60);
	s = s % 60;
	var time = (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
	return time;
}

function setSize(elemid,datoX,datoY) {
	if (document.all && !document.getElementById) {
		jLog( "document.all[elemid].style.pixelWidth ="+ datoX);
		document.all[elemid].style.pixelWidth = datoX;
		document.all[elemid].style.pixelHeight = datoY;
	}else{
		jLog( "document.getElementById(elemid).style.width ="+ datoX);
		document.getElementById(elemid).style.width = datoX+"px";
		document.getElementById(elemid).style.height = datoY+"px";
	}
}

/**
	XMLHttpRequest
*/
function createXMLHttpRequest() {
	var req = null;
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch(e) {
		}
	// branch for IE/Windows ActiveX version
	} else if (window.ActiveXObject) {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e2) {
				alert("Microsoft XMLHttpRequest create error: "+e2.message);
			}
		}
	}
	return req;
}

/**
	Sends request using XMLHttpRequest
	@param url (string) - request url
	@param data (string) - data sent during request. optional.
	@param type (string) - "POST" or "GET". optional - if data is null it is GET
	@return XMLHttpRequest object or false
*/
function sendRequest(url,data,type) {
	if (isUndefined(data))
		data = null;
	if (isUndefined(type))
		type = (data===null?"GET":"POST");
	var async = false;
	var req = createXMLHttpRequest();
	if (req) {
		req.open( type, url, async );
		if (type=="POST") {
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		req.send(data);
	}
	return req;
}

function setBackground(bg) {
	if (typeof(bg)=="undefined")
		bg = getParam(window.location,"bg");
	if (bg===null || bg.length==0)
		bg = "#FFFFFF";
	if (bg.charAt(0)!="#")
		bg = "#"+bg;
	window.document.body.style.background = bg;
	return bg;
}

function popup( url, width, height, target, wparams ) {
	if (isUndefined(width))
		width = 350;
	if (isUndefined(height))
		height = 400;
	if (isUndefined(target))
		target = "_blank";
	if (isUndefined(wparams))
		wparams = "location=0,menubar=0,resizeable=1,scrollbars=1,status=0,titlebar=0";
	var w = window;
	if (!isEmpty(w.top))
		w = w.top;
	var left = (w.screen.width-width)/2;
	var top = w.screen.height*0.4-height/2;
	wparams = "height="+height+",width="+width
		+",left="+left+",top="+top
		+","+wparams;
	w.open( url, target, wparams );
}

function getVal(o,name,def) {
	if (typeof(o)!="undefined" && typeof(o[name])!="undefined")
		return o[name];
	if (typeof(def)=="undefined")
		def = null;
	return def;
}

function getFlashHtml(url,opts) {
	var width = getVal(opts,"width",800);
	var height = getVal(opts,"height",600);
	var bgcolor = getVal(opts,"bgcolor","#FFFFFF");
	var version = getVal(opts,"version","6.0.0.0").replace(".",",");
	var id = getVal(opts,"id","page");
	var wmode = getVal(opts,"wmode","window");
	var scaleMode = getVal(opts,"scale","noscale");
	var flashvars = getVal(opts,"flashvars","");
	var html = '';
	if (InternetExplorer) {
		html += '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"\n';
		html += ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+version+'"\n';
		html += ' ID="'+id+'" WIDTH="'+width+'" HEIGHT="'+height+'" ALIGN="" mayscript="true" scriptable="true">\n';
		html += ' <PARAM NAME=movie VALUE="'+url+'">\n';
		html += ' <PARAM NAME=loop VALUE=false>\n';
		html += ' <PARAM NAME=quality VALUE=high>\n';
		html += ' <PARAM NAME=bgcolor VALUE='+bgcolor+'>\n';
		html += ' <PARAM NAME=salign VALUE=LT>\n';
		html += ' <PARAM NAME=swLiveConnect VALUE=true>\n';
		html += ' <PARAM NAME=wmode VALUE="'+wmode+'">\n';
		html += ' <PARAM NAME=scale VALUE="'+scaleMode+'">\n';
		html += ' <PARAM NAME=FlashVars VALUE="'+flashvars+'">\n';
		html += '<\/OBJECT>\n';
	} else {
		html += ' <EMBED\n';
		html += ' 	ID="'+id+'"\n';
		html += ' 	src="'+url+'"\n';
		html += ' 	loop=false\n';
		html += ' 	quality=high\n';
		html += ' 	bgcolor='+bgcolor+'\n';
		html += ' 	WIDTH="'+width+'"\n';
		html += ' 	HEIGHT="'+height+'"\n';
		html += ' 	swLiveConnect="true"\n';
		html += ' 	NAME="'+id+'"\n';
		html += ' 	salign="LT"\n';
		html += ' 	menu=false\n';
		html += ' 	TYPE="application/x-shockwave-flash"\n';
		html += ' 	wmode="'+wmode+'"\n';
		html += ' 	scale="'+scaleMode+'"\n';
		html += ' 	FlashVars="'+flashvars+'"\n';
		html += ' 	PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">\n';
		html += ' <\/EMBED>\n';
	}
	return html;
}

function writeFlash(url,opts) {
	document.write(getFlashHtml(url,opts));
}

function docWrite(s,doc) {
	if (typeof(doc)=="undefined")
		doc = document;
	doc.write(s);
}

function toBool(o) {
	if (o==0 || o=="false" || o=="no")
		return false;
	return Boolean(o);
}

function loadFile2Head(filename, filetype) {
	if (filetype=='js') {
		var objFile = document.createElement('script');
		objFile.setAttribute('type', 'text/javascript');
		objFile.setAttribute('src', filename);
	}
	else if (filetype=='css') {
		var objFile = document.createElement('link');
		objFile.setAttribute('rel', 'stylesheet');
		objFile.setAttribute('type', 'text/css');
		objFile.setAttribute('href', filename);
	}
	if (typeof objFile!='undefined')
		document.getElementsByTagName('head')[0].appendChild(objFile);
}
