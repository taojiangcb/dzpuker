
module egret {

    export interface DisplayObject {
        /*
         * 从父级中删除当前子级
         * @auth taojiang
         */
        removeFromParent(canDispose?: boolean): void;

        /*
         * 带有点击缩放模式
         */
        buttonMode(param?: boolean): void;
    }
}

module egret.os {
    export class OSType {
        static iOS: string = "iOS";
        static Android: string = "Android";
        static WindowsPhone: string = "Windows Phone";
        static MacOS: string = "Mac OS";
        static Unknown: string = "Unknown";
    }
}

Object.defineProperty(egret.DisplayObject.prototype, "removeFromParent", <PropertyDescriptor>{
    value: function (canDispose: boolean = false): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (canDispose) {
            __UNBIND_CLICK(this);
            //apptip.unbindTip(this);
            if (this.dispose) this.dispose();
        }
    }
});

Object.defineProperty(egret.DisplayObject.prototype, "buttonMode", <PropertyDescriptor>{
    value: function (param: boolean = true): void {
        if (param) __BIND_CLICK(this);
        else __UNBIND_CLICK(this);
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
}

