function proxyurl(url) {
	// pass further window.location parameters	
	var query = window.location.toString();
	var idx = query.indexOf("?");
	query = idx==-1?"":query.substring(idx+1);
	if (query.length>0) {
		url += (url.indexOf('?')==-1?'?':'&');
		url += query;
	}	
	
	window.location.replace(url);
}