(function (wnd) {

    var ImageAnimation = function (elem, url) {
        var th = this;
        this.mc = $('#' + elem);

        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.overrideMimeType("application/json");
        req.send(null);
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                th.json = JSON.parse(req.responseText);
                th.init();
            }
        };
    };

    var p = ImageAnimation.prototype;

    p.json = null;
    p.mc = null;
    p.mode = 'loop';
    p.frames = null;
    p.currentFrame = null;
    p.totalFrames = null;

    p.init = function() {
        this.frames = [];
        this.currentFrame = 1;
        for(var i in this.json.frames) {
            this.frames.push(this.json.frames[i].frame);
        }
        this.totalFrames = this.frames.length;
        //this.gotoFrame(this.currentFrame);
    };

    p.gotoNextFrame = function() {
        this.currentFrame++;
        if(this.currentFrame > this.totalFrames) {
            this.currentFrame = (this.mode === 'loop') ? 1 : this.totalFrames;
        }
        this.gotoFrame(this.currentFrame);
    };

    p.gotoFrame = function(frame) {
        var obj = this.frames[frame - 1];
        this.mc.attr('x', (-obj.x-60));
        this.mc.attr('y', (-obj.y-30));
    };

    wnd.ImageAnimation = ImageAnimation;

})(window);
