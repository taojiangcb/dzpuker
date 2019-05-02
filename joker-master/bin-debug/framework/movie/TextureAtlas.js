var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    /**
     * 纹理集 可以获取纹理数组
     * @author
     *
     */
    var TextureAtlas = (function () {
        function TextureAtlas(spriteSheet) {
            this.spriteSheet = spriteSheet;
        }
        TextureAtlas.prototype.getTextures = function (prefix) {
            if (prefix === void 0) { prefix = ""; }
            var result = [];
            var sNames = this.getNames(prefix);
            for (var i = 0, len = sNames.length; i < len; i++)
                result[result.length] = this.getTexture(sNames[i]);
            sNames.length = 0;
            return result;
        };
        TextureAtlas.prototype.getTexture = function (prefix) {
            if (prefix === void 0) { prefix = ""; }
            for (var i = 0, len = this.spriteSheet.length; i < len; i++) {
                var texture = this.spriteSheet[i].getTexture(prefix);
                if (texture)
                    return texture;
            }
            // return this.spriteSheet.getTexture(prefix);
        };
        TextureAtlas.prototype.getNames = function (prefix) {
            if (prefix === void 0) { prefix = ""; }
            var name;
            var result = [];
            if (this.mSubTextureNames == null) {
                var names = [];
                var nameScort = function (a, b) {
                    return a.localeCompare(b);
                };
                for (var i = 0, len = this.spriteSheet.length; i < len; i++) {
                    var texturemap = this.spriteSheet[i]._textureMap;
                    for (name in texturemap)
                        names[names.length] = name;
                }
                names.sort(nameScort);
                this.mSubTextureNames = names;
            }
            for (var i = 0, len = this.mSubTextureNames.length; i < len; i++) {
                name = this.mSubTextureNames[i];
                if (name.indexOf(prefix) == 0)
                    result[result.length] = name;
            }
            return result;
        };
        TextureAtlas.prototype.dispose = function () {
            for (var i = 0, len = this.spriteSheet.length; i < len; i++) {
                var texture = this.spriteSheet[i].dispose();
            }
            this.mSubTextureNames = null;
            this.spriteSheet = null;
        };
        return TextureAtlas;
    }());
    gameabc.TextureAtlas = TextureAtlas;
    __reflect(TextureAtlas.prototype, "gameabc.TextureAtlas");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=TextureAtlas.js.map