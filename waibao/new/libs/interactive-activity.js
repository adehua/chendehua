(function (wnd) {

    var InteractiveActivity = function (api) {
        init();
    };

    var p = InteractiveActivity.prototype;
    var main;

    function init() 
	{
        main = new Main();       
    }    

    p.reset = function () {
        main.reset();
    };

    p.loadState = function (obj) {

    };

    p.saveState = function () {
        return {};
    };

    wnd.InteractiveActivity = InteractiveActivity;
})(window);