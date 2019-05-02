/**
 * Created by taojiang on 16/9/20.
 */
module gameabc {

    export function addAssetsToBonesFactory(appId:number = 0,boneFile:string,textureFile:string,textureDataFile:string):dragonBones.EgretFactory {
        return DragonBonesMgr.instace().addAssetsToBonesFactory(appId,boneFile,textureFile,textureDataFile);
    }

    export function hasFactory(appId:number):boolean {
        return DragonBonesMgr.instace().hasFactory(appId);
    }

    export function getBonesFactory(appId:number):dragonBones.EgretFactory {
        return DragonBonesMgr.instace().getBonesFactory(appId);
    }

    export function destoryFactory(appId:number) {
        DragonBonesMgr.instace().destoryFactory(appId);
    }

    export function addMovieGroup(bone: string, texture: string, appId?: number): void {
        DragonBonesMgr.instace().addMovieGroup(bone, texture, appId);
    }

    export function buildMovie(movie: string, appId?: number): dragonBones.Movie {
        return DragonBonesMgr.instace().buildMovie(movie, appId);
    }

    export function hasMovieGroup(appId: number): boolean {
        return DragonBonesMgr.instace().hasMovieGroup(appId);
    }

    export function removeMovieGroup(appId: number): void {
        DragonBonesMgr.instace().removeMovieGroup(appId);
    }

    export class DragonBonesMgr {

        private static __instace:DragonBonesMgr;
        public static instace():DragonBonesMgr {
            if(DragonBonesMgr.__instace == null) {
                DragonBonesMgr.__instace = new DragonBonesMgr();
            }
            return DragonBonesMgr.__instace;
        }

        /**
         * 所有模块的dragonbonesFactory的对象池
         * @type {Object}
         */
        private dragonPools:Object = new Object();

        constructor(){}

        /**
         * 生成一个模块的龙骨Factory
         * @param appID
         * @returns {any}
         */
        private generateBones(appID:number = 0):dragonBones.EgretFactory {
            if(this.dragonPools[appID] == null) {
                this.dragonPools[appID] = new dragonBones.EgretFactory();
            }
            return this.dragonPools[appID];
        }

        /**
         * 将资源添加到指定的facotry里
         * @param appId                             模块Id
         * @param boneFile                          龙骨文件
         * @param textureFile                       纹理文件
         * @param textureDataFile                   纹理数据文件
         * @returns {dragonBones.EgretFactory}
         */
        addAssetsToBonesFactory(appId:number = 0,boneFile:string,textureFile:string,textureDataFile:string):dragonBones.EgretFactory {
            // if (hasFactory(appId)) return getBonesFactory(appId);
            var boneData = RES.getRes(boneFile);
            var texture = RES.getRes(textureFile);
            var textureData = RES.getRes(textureDataFile);

            var bonesFactory = this.generateBones(appId);

            bonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(boneData));
            bonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));

            return bonesFactory;
        }
        

        /**
         * 查看龙骨Factory是否存在
         * @param appId                         模块Id
         * @returns {boolean}
         */
        hasFactory(appId:number):boolean {
            return this.dragonPools[appId] != null;
        }

        /**
         * 返回该模块龙骨Facory
         * @param appId
         * @returns {dragonBones.EgretFactory}
         */
        getBonesFactory(appId:number = 0):dragonBones.EgretFactory {
            return this.generateBones(appId);
        }

        /**
         * 销毁一个模块的龙骨Factory
         * @param appId
         */
        destoryFactory(appId:number) {
            var factory:dragonBones.EgretFactory = this.getBonesFactory(appId);
            if(factory) {
                factory.clear(false);
            }
            if(this.hasFactory(appId)) {
                delete this.dragonPools[appId];
            }
        }

        addMovieGroup(bone: string, texture: string, appId: number): void {
            dragonBones.addMovieGroup(RES.getRes(bone), RES.getRes(texture), appId? appId.toString(): null);
        }

        buildMovie(movie: string, appId: number): dragonBones.Movie {
            return dragonBones.buildMovie(movie, appId? appId.toString(): null);
        }

        hasMovieGroup(appId: number): boolean {
            return dragonBones.hasMovieGroup(appId.toString());
        }

        removeMovieGroup(appId: number): void {
            dragonBones.removeMovieGroup(appId.toString());
        }
    }
}