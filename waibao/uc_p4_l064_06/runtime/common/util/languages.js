function initLanguages() {
	this.languages = new Object();
	languages["pl"] = "pol";
	languages["en"] = "eng";
	languages["en-us"] = "eng";
	languages["en-gb"] = "eng";
	languages["fr"] = "fra";
	languages["de"] = "deu";
}

function getLanguageCode() {
	if (getParam) {
		var s = getParam( window.location, "lang" );
		if (s!=null && s.length>0)
			return s;
	}

	var language = InternetExplorer ? window.clientInformation.userLanguage : navigator.language;
	language = language.toLowerCase();
	
	if (typeof(languages)=="undefined")
		initLanguages();
	var tlang = languages[language];
	if ( typeof(tlang)!="undefined" )
		language = tlang;
		
	return language;
}