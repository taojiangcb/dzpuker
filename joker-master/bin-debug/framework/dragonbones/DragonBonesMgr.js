var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/9/20.
 */
var gameabc;
(function (gameabc) {
    function addAssetsToBonesFactory(appId, boneFile, textureFile, textureDataFile) {
        if (appId === void 0) { appId = 0; }
        return DragonBonesMgr.instace().addAssetsToBonesFactory(appId, boneFile, textureFile, textureDataFile);
    }
    gameabc.addAssetsToBonesFactory = addAssetsToBonesFactory;
    function hasFactory(appId) {
        return DragonBonesMgr.instace().hasFactory(appId);
    }
    gameabc.hasFactory = hasFactory;
    function getBonesFactory(appId) {
        return DragonBonesMgr.instace().getBonesFactory(appId);
    }
    gameabc.getBonesFactory = getBonesFactory;
    function destoryFactory(appId) {
        DragonBonesMgr.instace().destoryFactory(appId);
    }
    gameabc.destoryFactory = destoryFactory;
    function addMovieGroup(bone, texture, appId) {
        DragonBonesMgr.instace().addMovieGroup(bone, texture, appId);
    }
    gameabc.addMovieGroup = addMovieGroup;
    function buildMovie(movie, appId) {
        return DragonBonesMgr.instace().buildMovie(movie, appId);
    }
    gameabc.buildMovie = buildMovie;
    function hasMovieGroup(appId) {
        return DragonBonesMgr.instace().hasMovieGroup(appId);
    }
    gameabc.hasMovieGroup = hasMovieGroup;
    function removeMovieGroup(appId) {
        DragonBonesMgr.instace().removeMovieGroup(appId);
    }
    gameabc.removeMovieGroup = removeMovieGroup;
    var DragonBonesMgr = (function () {
        function DragonBonesMgr() {
            /**
             * 所有模块的dragonbonesFactory的对象池
             * @type {Object}
             */
            this.dragonPools = new Object();
        }
        DragonBonesMgr.instace = function () {
            if (DragonBonesMgr.__instace == null) {
                DragonBonesMgr.__instace = new DragonBonesMgr();
            }
            return DragonBonesMgr.__instace;
        };
        /**
         * 生成一个模块的龙骨Factory
         * @param appID
         * @returns {any}
         */
        DragonBonesMgr.prototype.generateBones = function (appID) {
            if (appID === void 0) { appID = 0; }
            if (this.dragonPools[appID] == null) {
                this.dragonPools[appID] = new dragonBones.EgretFactory();
            }
            return this.dragonPools[appID];
        };
        /**
         * 将资源添加到指定的facotry里
         * @param appId                             模块Id
         * @param boneFile                          龙骨文件
         * @param textureFile                       纹理文件
         * @param textureDataFile                   纹理数据文件
         * @returns {dragonBones.EgretFactory}
         */
        DragonBonesMgr.prototype.addAssetsToBonesFactory = function (appId, boneFile, textureFile, textureDataFile) {
            if (appId === void 0) { appId = 0; }
            // if (hasFactory(appId)) return getBonesFactory(appId);
            var boneData = RES.getRes(boneFile);
            var texture = RES.getRes(textureFile);
            var textureData = RES.getRes(textureDataFile);
            var bonesFactory = this.generateBones(appId);
            bonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(boneData));
            bonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            return bonesFactory;
        };
        /**
         * 查看龙骨Factory是否存在
         * @param appId                         模块Id
         * @returns {boolean}
         */
        DragonBonesMgr.prototype.hasFactory = function (appId) {
            return this.dragonPools[appId] != null;
        };
        /**
         * 返回该模块龙骨Facory
         * @param appId
         * @returns {dragonBones.EgretFactory}
         */
        DragonBonesMgr.prototype.getBonesFactory = function (appId) {
            if (appId === void 0) { appId = 0; }
            return this.generateBones(appId);
        };
        /**
         * 销毁一个模块的龙骨Factory
         * @param appId
         */
        DragonBonesMgr.prototype.destoryFactory = function (appId) {
            var factory = this.getBonesFactory(appId);
            if (factory) {
                factory.clear(false);
            }
            if (this.hasFactory(appId)) {
                delete this.dragonPools[appId];
            }
        };
        DragonBonesMgr.prototype.addMovieGroup = function (bone, texture, appId) {
            dragonBones.addMovieGroup(RES.getRes(bone), RES.getRes(texture), appId ? appId.toString() : null);
        };
        DragonBonesMgr.prototype.buildMovie = function (movie, appId) {
            return dragonBones.buildMovie(movie, appId ? appId.toString() : null);
        };
        DragonBonesMgr.prototype.hasMovieGroup = function (appId) {
            return dragonBones.hasMovieGroup(appId.toString());
        };
        DragonBonesMgr.prototype.removeMovieGroup = function (appId) {
            dragonBones.removeMovieGroup(appId.toString());
        };
        return DragonBonesMgr;
    }());
    gameabc.DragonBonesMgr = DragonBonesMgr;
    __reflect(DragonBonesMgr.prototype, "gameabc.DragonBonesMgr");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=DragonBonesMgr.js.map