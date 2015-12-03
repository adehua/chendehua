(function (wnd) {

    var BackgroundAnimation = function (elems, fps) {
        this.elems = elems;
        this.fps = fps;
        this.step = Math.round(height / fps);
    };

    var p = BackgroundAnimation.prototype;

    var height = 700;

    p.elems = null;
    p.mode = 'loop';
    p.fps = null;
    p.step = null;

    p.gotoNextFrame = function () {
        for (var i = 0; i < this.elems.length; i++) {
            var y = parseInt(this.elems[i].attr('y')) + this.step;
            if (y >= height) {
                y = -height;
            }
            this.elems[i].attr('y', y);
        }
    };

    wnd.BackgroundAnimation = BackgroundAnimation;

})(window);

