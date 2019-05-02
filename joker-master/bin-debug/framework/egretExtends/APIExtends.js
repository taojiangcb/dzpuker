var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    var os;
    (function (os) {
        var OSType = (function () {
            function OSType() {
            }
            return OSType;
        }());
        OSType.iOS = "iOS";
        OSType.Android = "Android";
        OSType.WindowsPhone = "Windows Phone";
        OSType.MacOS = "Mac OS";
        OSType.Unknown = "Unknown";
        os.OSType = OSType;
        __reflect(OSType.prototype, "egret.os.OSType");
    })(os = egret.os || (egret.os = {}));
})(egret || (egret = {}));
Object.defineProperty(egret.DisplayObject.prototype, "removeFromParent", {
    value: function (canDispose) {
        if (canDispose === void 0) { canDispose = false; }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (canDispose) {
            __UNBIND_CLICK(this);
            //apptip.unbindTip(this);
            if (this.dispose)
                this.dispose();
        }
    }
});
Object.defineProperty(egret.DisplayObject.prototype, "buttonMode", {
    value: function (param) {
        if (param === void 0) { param = true; }
        if (param)
            __BIND_CLICK(this);
        else
            __UNBIND_CLICK(this);
    }
});
/**
 *
 * @language zh_CN
 * 释放动画。
 * @version DragonBones 3.0
 *
 * 龙骨函数出bug
 * _slots 释放时没有加空判断，这里给他补上。
 */
dragonBones.Movie.prototype.dispose = function () {
    if (this._isLockDispose) {
        this._isDelayDispose = true;
    }
    else {
        this.advanceTimeBySelf(false);
        if (this._slots) {
            for (var i = 0, l = this._slots.length; i < l; ++i) {
                this._slots[i].dispose();
            }
        }
        this._isPlaying = false;
        this._cacheRectangle = null;
        this._groupConfig = null;
        this._clipConfig = null;
        this._currentFrameConfig = null;
        this._clipNames = null;
        this._slots = null;
        this._childMovies = null;
    }
};
//# sourceMappingURL=APIExtends.js.map