module match {
    
    export class MatchMoudle extends app.base.BaseSceneUIMoudleComponent {

        public backButton:eui.Button;
        public room1:eui.Group;
        public room2:eui.Group;
        public room3:eui.Group;

        constructor() {
            super();
            this.top = this.left = this.bottom = this.right = 0;
            this.skinName = "resource/app_skin/sng/MatchSkin.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.bindButton(this.room1);
            this.bindButton(this.room2);
            this.bindButton(this.room3);
            this.addDragonBones();
        }

        addDragonBones() {
            gameabc.addMovieGroup("match_button_ske_dbmv", "match_button_tex_png", AppReg.MATCH_MAIN);
            var movie1: dragonBones.Movie = gameabc.buildMovie("MovieClip", AppReg.MATCH_MAIN);
            movie1.x = 187;
            movie1.y = 152;
            movie1.blendMode = egret.BlendMode.ADD;
            movie1.play("zuomanjiwan");
            this.room1.addChild(movie1);
            var movie2: dragonBones.Movie = gameabc.buildMovie("MovieClip", AppReg.MATCH_MAIN);
            movie2.x = 105;
            movie2.y = 120;
            movie2.blendMode = egret.BlendMode.ADD;
            movie2.play("jinbiaosai");
            this.room2.addChild(movie2);
            var movie3: dragonBones.Movie = gameabc.buildMovie("MovieClip", AppReg.MATCH_MAIN);
            movie3.x = 120;
            movie3.y = 140;
            movie3.blendMode = egret.BlendMode.ADD;
            movie3.play("zhiyunhui");
            this.room3.addChild(movie3);
        }

        addParent() {      	
            super.addParent();
			var delay: number = 0;
            for (var i: number = 1; i < 4; i++) {
                var room = this["room"+i];
                egret.Tween.removeTweens(room);
                room.y = 400;
                room.alpha = 0;
                egret.Tween.get(room).wait(delay).to({ y: 0, alpha: 1 }, 300, egret.Ease.backOut);
                delay += 100;
            }
        }
        protected touchHandler(event: egret.TouchEvent): void {
            if(event.currentTarget==this.backButton) {
                // __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
                this.close();
            } else super.touchHandler(event);
        }

        touchBindButtonHandler(tag:egret.DisplayObject):void {
            switch(tag) {
                case this.room1:
                    // this.close();
                    __OPEN_PRE_MOUDLE(AppReg.SNG,null,[AppReg.MATCH_MAIN]);
                    break;
                case this.room2:
                    // this.close();
                    __OPEN_PRE_MOUDLE(AppReg.MTT,null,[AppReg.MATCH_MAIN]);
                    break;
                case this.room3:
                    tip.popSysCenterTip("此功能尚未开放，敬请期待");
                    break;
                // case this.room3:
                //     this.chrooseRoom = room.getProxy().room6[2];
                //     playcards.getProxy().openMoudle(playcards.OPEN_PARAM.NONE);
                //     mc2sdk.event(mc2sdk.EVENT_TYPE.IN_PK_3);
                //     break;
                // case this.btnShop:
                //     user.getProxy().openShop();
                //     break;
                // case this.btnClose:
                //     this.descriptGroup.visible = false;
                //     break;
                // case this.helpButton:
                //     this.descriptGroup.visible = true;
                //     break;
            }
        }

        dispose():void {
            if (gameabc.hasMovieGroup(AppReg.MATCH_MAIN)) {
                gameabc.removeMovieGroup(AppReg.MATCH_MAIN);
            }
            super.dispose();
        }
    }
}