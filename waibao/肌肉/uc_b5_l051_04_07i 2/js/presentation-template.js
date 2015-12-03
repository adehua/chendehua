var cont, iframe, initW, initH, ratio, resizeFactor, offsetLeft, offsetTop;

window.init = function (empiriaAPI) {

    var empiriaObject = {};

    var ia = new InteractiveActivity(empiriaAPI);

    cont = $('#container');

    iframe = _.find($('iframe', parent.document), function (item) {
        return item.src.indexOf('uc_b5_l051_04_07i') !== -1;
    });

    initW = parseInt($(cont).css('width'));

    initH = parseInt($(cont).css('height'));

    ratio = initH / initW;

    resizeFactor = 1;

    $(window).on('resize', function () {
        onResize();
    });

    $(window).on('unload', function () {
        $(window).off('resize');
    });

    onResize();

    empiriaObject.setStateOnExternal = function (status) {
        ia.loadState(status);
    };

    empiriaObject.getStateFromExternal = function () {
        return ia.saveState();
    };

    empiriaObject.reset = function () {
        ia.reset();
    };

    empiriaObject.lock = function () {
    };

    empiriaObject.unlock = function () {
    };
 empiriaObject.showCorrectAnswers = function(){
   	 	//alert("显示答案")
    }
    empiriaObject.hideCorrectAnswers = function(){
    	//	alert("隐藏答案")
    }
    
    empiriaObject.markCorrectAnswers = function(){
    		//alert("显示标志正确答案")
    }
    empiriaObject.unmarkCorrectAnswers = function(){
    		//alert("隐藏标志正确答案")
    }
    
    empiriaObject.markWrongAnswers = function(){
    	//	alert("显示标志错误答案")
    }
    empiriaObject.unmarkWrongAnswers = function(){
    		//alert("隐藏标志错误答案")
    }
    return empiriaObject;
};

function onResize() {
    var contWidth = $(cont).width();
    var contHeight = contWidth * ratio;
    $(cont).css({'height': contHeight + 'px'});
    $(iframe).css({'height': contHeight + 'px'});
    resizeFactor = contWidth / initW;
    $(iframe).attr({"scrolling":"no"})
//  ($(iframe).css("width")-380)/2
//  offsetLeft = ($(cont).offset().left + $(iframe).offset().left);
     offsetLeft = ($(iframe).width()-450)/2;
	$("#container").css({"left":offsetLeft})
    offsetTop = $(cont).offset().top + $(iframe).offset().top;
}