var cont, iframe, initW, initH, ratio, resizeFactor, offsetLeft, offsetTop;

window.init = function (empiriaAPI) {

    var empiriaObject = {};

    var ia = new InteractiveActivity(empiriaAPI);

    cont = $('#container');
    iframe = _.find($('iframe', parent.document), function (item) {
        return item.src.indexOf('uc_p4_l013_05_01s') !== -1;
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

    return empiriaObject;
};

function onResize() {
    var contWidth = $(cont).width();
    var contHeight = contWidth * ratio;
    $(cont).css({'height': contHeight + 'px'});
    $(iframe).css({'height': contHeight + 'px'});
    resizeFactor = contWidth / initW;
    offsetLeft = $(cont).offset().left + $(iframe).offset().left;
    offsetTop = $(cont).offset().top + $(iframe).offset().top;
}
this.init();