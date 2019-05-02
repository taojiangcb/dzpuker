var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    /**
     *
     * @author
     *
     */
    var BindleButtonUtils = (function () {
        function BindleButtonUtils() {
        }
        /*
         * 绑定一个显示对像使出发点击效果å
         */
        BindleButtonUtils.bindClickByTarget = function (tag) {
            if (!tag)
                return;
            tag.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            tag.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchHandler, this);
            tag.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        };
        BindleButtonUtils.touchHandler = function (event) {
            var tag = event.currentTarget;
            var touch = event;
            if (tag.touchEnabled) {
                if (touch.type == egret.TouchEvent.TOUCH_BEGIN) {
                    this.onClick(tag);
                }
                else if (touch.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE && this.touchCache[tag.hashCode]) {
                    this.onResterClick(tag);
                }
                else if (touch.type == egret.TouchEvent.TOUCH_END) {
                    this.onResterClick(tag);
                }
            }
        };
        BindleButtonUtils.onClick = function (tag) {
            if (!this.touchCache[tag.hashCode]) {
                this.touchCache[tag.hashCode] = [tag.x, tag.y, tag.scaleX, tag.scaleY, tag['right'], tag['bottom']]; //,tag.width,tag.height,tag.anchorOffsetX,tag.anchorOffsetY;      
            }
            //              if(tag&&this.touchCache[tag.hashCode]) {
            tag.scaleX = this.touchCache[tag.hashCode][2] * this.SCALE_ROAT;
            tag.scaleY = this.touchCache[tag.hashCode][3] * this.SCALE_ROAT;
            //                  if(tag.anchorOffsetX == 0) {
            //                    tag.anchorOffsetX = tag.width >> 1;
            //                    tag.anchorOffsetY = tag.height >> 1;
            //                    tag.x += tag.anchorOffsetX;
            //                    tag.y += tag.anchorOffsetY;
            var vx = (this.SCALE_ROAT - 1) * tag.width >> 1;
            var vy = (this.SCALE_ROAT - 1) * tag.height >> 1;
            tag.x = this.touchCache[tag.hashCode][0] - vx;
            tag.y = this.touchCache[tag.hashCode][1] - vy;
            if (!isNaN(tag['right']))
                tag['right'] = this.touchCache[tag.hashCode][4] - vx;
            if (!isNaN(tag['bottom']))
                tag['bottom'] = this.touchCache[tag.hashCode][5] - vy;
            utils.SoundUtils.playEffectSound(utils.SoundUtils.button);
            //                  }
            //                }Bind
        };
        BindleButtonUtils.onResterClick = function (tag) {
            //            if(tag) {
            if (tag && this.touchCache[tag.hashCode]) {
                tag.x = this.touchCache[tag.hashCode][0];
                tag.y = this.touchCache[tag.hashCode][1];
                tag.scaleX = this.touchCache[tag.hashCode][2];
                tag.scaleY = this.touchCache[tag.hashCode][3];
                if (!isNaN(tag['right']))
                    tag['right'] = this.touchCache[tag.hashCode][4];
                if (!isNaN(tag['bottom']))
                    tag['bottom'] = this.touchCache[tag.hashCode][5];
                //                    tag.anchorOffsetX = this.touchCache[tag.hashCode][6];
                //                    tag.anchorOffsetY = this.touchCache[tag.hashCode][7];
                delete this.touchCache[tag.hashCode];
            }
            //            }
        };
        BindleButtonUtils.unbindClick = function (tag) {
            if (tag) {
                this.onResterClick(tag);
                //                delete this.touchCache[tag.hashCode];
                tag.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                tag.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchHandler, this);
                tag.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
            }
        };
        return BindleButtonUtils;
    }());
    BindleButtonUtils.touchCache = {};
    BindleButtonUtils.SCALE_ROAT = 1.1;
    gameabc.BindleButtonUtils = BindleButtonUtils;
    __reflect(BindleButtonUtils.prototype, "gameabc.BindleButtonUtils");
})(gameabc || (gameabc = {}));
var __BIND_CLICK = function (tag) {
    gameabc.BindleButtonUtils.bindClickByTarget(tag);
};
var __UNBIND_CLICK = function (tag) {
    gameabc.BindleButtonUtils.unbindClick(tag);
};
//# sourceMappingURL=BindleButtonUtils.js.map