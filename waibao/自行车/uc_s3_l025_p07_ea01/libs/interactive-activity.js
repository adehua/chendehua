(function (wnd) {

    var InteractiveActivity = function (api) {
        init();
    };

    var p = InteractiveActivity.prototype;
    var navi = navigator.userAgent.toLowerCase();
    var touchDevice = /ipad|iphone|android|windows phone|blackberry/i.test(navi);
    var eventType = touchDevice ? 'touchstart' : 'mousedown';

    var bg, biker, tweenID, requestID;
    var FPS = 25;

	$(function(){
		alert("aaa")
		init()
	})

    function init() {
        biker = new ImageAnimation('bike', 'images/biker.json');
        bg = new BackgroundAnimation([$('#bg0'), $('#bg1')], FPS);
        $('#continue_btn').on(eventType, function(e) {
            e.preventDefault();
            $(this).hide();
            updateTween();
        });
    }

    function updateTween() {
        biker.gotoNextFrame();
        bg.gotoNextFrame();
        tweenID = setTimeout(function () {
            requestID = requestAnimationFrame(updateTween);
        }, 1000 / FPS);
    }

    p.reset = function () {
        clearTimeout(tweenID);
        cancelAnimationFrame(requestID);
        biker.gotoFrame(1);
        $('#continue_btn').show();
    };

    p.loadState = function (obj) {

    };

    p.saveState = function () {
        return {};
    };

    wnd.InteractiveActivity = InteractiveActivity;

})(window);