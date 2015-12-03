function showVideo( url, color ) {
	//showVideoNewWindow( url, color );
	showVideoJSP( url );
}
function showFlash( url ) {
//var idx;
//	idx = url.indexOf( '?' );
//	if (idx!=-1) {
//		url = url.substring( 0, idx );
//	}
	//var videoWindow = window.open( "/data/pages/flash.jsp?url="+escape(url),"video","width=320,height=264" );
	
	var w = 320;
	var h=264;
	var ix = url.indexOf( "width=" );
	if ( ix>0 ) 
		w = parseInt( url.substring(ix+6) );
	ix = url.indexOf( "height=" );
	if ( ix>0 ) 
		h = parseInt( url.substring(ix+7) );
	var videoWindow = window.open( url,"video","width="+w+",height="+h );
}

function showVideoDiv( url, color ) {
	var width = 352;
	var height = 400;

	var oPopBody = oPopup.document.body;

	divHeader="<div style='font-family:verdana;background:#"+color+";text-align:right'>";
	divHeader+="video <img style='cursor:hand;margin:2 2 2 2' onClick='parent.oPopup.hide()' src='%codebase%/close.gif'> </div>";

	divHTML="<div><embed width='"+width+"' height='"+height+"' src='"+url+"'></div>";
	//divWindow.innerHTML=divHeader+divHTML;

    oPopBody.innerHTML = divHeader+divHTML;
    oPopup.show(100, 100, width, height, document.body);

}


// funkcja closeWindow()
//funkcja zamykajaca utworzone okno typu "div"
function closeWindow() {
	oPopup.hide();
}

function showVideoJSP( url ) {
	var videoWindow = window.open( "/data/pages/video.jsp?url="+url,"video","width=320,height=264" );
}

function showVideoNewWindow( url ) {
	var controlPanelHeight=46;

	var videoWindow = window.open( "","video","width=320,height=264" );
	var doc = videoWindow.document;
	doc.open( "text/html" );
	doc.writeln( '<html><head><title>Prezentacja video</title>' );
	doc.writeln( '<SCRIPT LANGUAGE=javascript >' );
	doc.writeln( 'function loaded() {');
	doc.writeln( 'amResize();');
	doc.writeln( 'ActiveMovie1.open("'+url+'");');
	doc.writeln( '}');
	doc.writeln( '</SCRIPT>' );
	doc.writeln( '<SCRIPT ID=clientEventHandlersJS LANGUAGE=javascript>' );
	doc.writeln( 'function amResize()' );
	doc.writeln( '{' );
	doc.writeln( '	var w = ActiveMovie1.offsetWidth;' );
	doc.writeln( '	var h = ActiveMovie1.offsetHeight;' );

	doc.writeln( '	var diffW = 10;' );
	doc.writeln( 'var diffH = 30;' );

	//doc.writeln( 'window.status =  diffW + " - " + diffH ;' );

	doc.writeln( 'window.resizeTo( w+diffW, h+diffH );' );
	doc.writeln( '}' );

	doc.writeln( '</script>' );
	
	doc.writeln( '<SCRIPT LANGUAGE=javascript FOR=ActiveMovie1 EVENT=onresize>' );

	doc.writeln( ' amResize()' );

	doc.writeln( '</SCRIPT>' );
	

	doc.writeln( '</head><body topmargin="0" leftmargin="0">' );
/*
doc.writeln( '<div>
  <embed id="ActiveMovie1" src="'+url+'" width="128" height="128"></div>' );
7.1: 6BF52A52-394A-11d3-B153-00C04F79FAA6
6.4: 22D6f312-B0F6-11D0-94AB-0080C74C7E95
*/

	doc.writeln( '<div>');
	doc.writeln( '<object classid="clsid:22D6f312-B0F6-11D0-94AB-0080C74C7E95" id="ActiveMovie1">');
	//doc.writeln( '<param name="AutoStart" value="1">');
	//doc.writeln( '<param name="DisplayMode" value="1">');
	//doc.writeln( '<param name="EnablePositionControls" value="-1">');
	//doc.writeln( '<param name="EnableSelectionControls" value="0">');
	//doc.writeln( '<param name="URL" value="'+url+'">');
	doc.writeln( '<param name="url" value="'+url+'">');
	//doc.writeln( '<param name="uiMode" value="mini">');
	doc.writeln( '</object>' );
	doc.writeln( '</div>');

	doc.writeln( '</body></html>');
	doc.close();
}
function openNewWindowVideo (url) {
	var videoWindow = window.open( "","video","width=320,height=286" );
	var doc = videoWindow.document;
	doc.open( "text/html" );
	doc.writeln( '<html><head><title>Prezentacja video</title></head><body topmargin="0" leftmargin="0">' );
	doc.writeln('<object id="MediaPlayer" width="320" height="286" classid="CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95" standby="Loading Windows Media Player components..." type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112">');
	doc.writeln('<param name="filename" value="'+url+'">');
	doc.writeln('<param name="Showcontrols" value="True">');
	doc.writeln('<param name="autoStart" value="True">');
	doc.writeln('<embed type="application/x-mplayer2" src="'+url+'" name="MediaPlayer" width="320" height="286"></embed>');
	doc.writeln('</object></body></html>');
}