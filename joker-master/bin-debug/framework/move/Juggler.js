var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    var Juggler = (function () {
        function Juggler() {
            this.mElapsedTime = 0;
            this.mObjects = [];
        }
        Juggler.prototype.add = function (object) {
            if (object && this.mObjects.indexOf(object) == -1) {
                this.mObjects[this.mObjects.length] = object;
            }
        };
        Juggler.prototype.contains = function (object) {
            return this.mObjects.indexOf(object) != -1;
        };
        Juggler.prototype.remove = function (object) {
            if (object == null)
                return;
            var index = this.mObjects.indexOf(object);
            if (index != -1)
                this.mObjects[index] = null;
        };
        Juggler.prototype.purge = function () {
            for (var i = this.mObjects.length - 1; i >= 0; --i) {
                this.mObjects[i] = null;
            }
        };
        Juggler.prototype.advanceTime = function (time) {
            var numObjects = this.mObjects.length;
            var currentIndex = 0;
            var i = 0;
            this.mElapsedTime += time;
            if (numObjects == 0)
                return;
            for (i = 0; i < numObjects; ++i) {
                var object = this.mObjects[i];
                if (object) {
                    if (currentIndex != i) {
                        this.mObjects[currentIndex] = object;
                        this.mObjects[i] = null;
                    }
                    object.advanceTime(time);
                    ++currentIndex;
                }
            }
            if (currentIndex != i) {
                numObjects = this.mObjects.length;
                while (i < numObjects)
                    this.mObjects[(currentIndex++)] = this.mObjects[(i++)];
                this.mObjects.length = currentIndex;
            }
        };
        Object.defineProperty(Juggler.prototype, "elapsedTime", {
            get: function () {
                return this.mElapsedTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Juggler.prototype, "objects", {
            get: function () {
                return this.mObjects;
            },
            enumerable: true,
            configurable: true
        });
        return Juggler;
    }());
    gameabc.Juggler = Juggler;
    __reflect(Juggler.prototype, "gameabc.Juggler");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=Juggler.js.map