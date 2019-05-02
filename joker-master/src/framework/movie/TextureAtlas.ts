module gameabc {
	/**
	 * 纹理集 可以获取纹理数组
	 * @author 
	 *
	 */
	export class TextureAtlas {
        private  mSubTextureNames:Array<string>;
        public spriteSheet: egret.SpriteSheet[];
        public constructor(spriteSheet: egret.SpriteSheet[]) {
            this.spriteSheet = spriteSheet;
		}
        public getTextures(prefix: string = ""): Array<egret.Texture>{
            var result: Array<egret.Texture> = [];
            var sNames = this.getNames(prefix);
            for(var i: number = 0,len: number = sNames.length;i < len;i++)
                result[result.length] = this.getTexture(sNames[i]);
            sNames.length = 0;
            return result;
        }
        public getTexture(prefix: string = ""): egret.Texture{
            for (var i: number = 0, len = this.spriteSheet.length; i < len; i++){
                var texture = this.spriteSheet[i].getTexture(prefix);
                if (texture) return texture;
            }
            // return this.spriteSheet.getTexture(prefix);
        }

        public getNames(prefix: string = ""): Array<string> {
                var name:string;
                var result: Array<string> =  [];           
                if(this.mSubTextureNames == null) {
                    var names: Array<string> = [];
                   var nameScort =function(a:string,b:string):number{
                        return a.localeCompare(b);
                    }
                     for (var i: number = 0, len = this.spriteSheet.length; i < len; i++){
                        var texturemap = this.spriteSheet[i]._textureMap;
                        for(name in texturemap) names[names.length] = name;
                    }
                    names.sort(nameScort);
                    this.mSubTextureNames = names
                }
            for ( var i:number = 0,len:number = this.mSubTextureNames.length;i<len;i++){
                name = this.mSubTextureNames[i];
                if(name.indexOf(prefix) == 0)
                    result[result.length] = name; 
            }           
            return result;
        }
        public dispose(): void{
             for (var i: number = 0, len = this.spriteSheet.length; i < len; i++){
                var texture = this.spriteSheet[i].dispose();              
            }
            this.mSubTextureNames=null;
            this.spriteSheet=null;
        }
	}
}
