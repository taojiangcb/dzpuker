module playcards {

	export class SngWheelComp extends gameabc.UICustomComponent {
        
        textLabel1:eui.BitmapLabel;
        textLabel2:eui.BitmapLabel;

        labelGroup:eui.Group;
        imagegroup: eui.Group;

        luckstarAnimation: dragonBones.Armature;
        luckgoldAnimation: dragonBones.Armature;

        constructor() {
			super();
			this.skinName = "SngWheelSkin";
            this.labelGroup.mask = new egret.Rectangle(0,0,341,80);
        }

        createComplete(event:egret.Event) {
            super.createComplete(event);
            this.addDragonBones();
        }

        tweenTimes:number; //这个参数表示转几圈停止
        tweenSpeed:number; //这个参数表示每圈的速度变化
        tweenToNumber:number; //这个参数表示最终停止的数字

        completeListener:Function;
        completeThisObj:Object;

        playAndGoto(num:number):void {
            this.visible = true;
            this.tweenToNumber = num;
            this.tweenTimes = 8; //一共出现几个数字后停止
            this.tweenSpeed = 2; //初始速度，数字越小越快
            this.goto(parseInt(this.getRandom()));
            this.textLabel2.text = this.getRandom();
            egret.Ticker.getInstance().register(this.wheelListener,this);
        }

        goto(num:number):void {
            this.textLabel1.text = String(num);
            this.textLabel1.y = 22;
            this.textLabel2.y = this.textLabel1.y + 63;
        }


        wheelListener(time:number):void {
            var gotoY1 = this.textLabel1.y - time/this.tweenSpeed;
            var gotoY2 = gotoY1 + 63;

            if (gotoY2 < 22 && this.tweenTimes==0) {
                egret.Ticker.getInstance().unregister(this.wheelListener,this);
                this.goto(this.tweenToNumber);
                var playCoin = false;
                if(match.getProxy().currentMatchVO!=null) {
                    playCoin = this.tweenToNumber>=10*match.getProxy().currentMatchVO.entryFee;
                }
                this.playFPSAnimation(playCoin);
                return;
            }
            if (gotoY1 < -38 && this.tweenTimes!=0) {
                gotoY1 = this.textLabel2.y - time/this.tweenSpeed;
                gotoY2 = gotoY1 + 63;
                this.textLabel1.text = this.textLabel2.text;
                if (--this.tweenTimes<=0) {
                    this.textLabel2.text = String(this.tweenToNumber);
                } else {
                    if (this.tweenTimes<5) this.tweenSpeed += 1.625; //转几圈以后开始减速
                    this.textLabel2.text = this.getRandom();
                }
            } 
            this.textLabel1.y = gotoY1;
            this.textLabel2.y = gotoY2;
        }

        getRandom():string {
            if (match.getProxy().currentMatchVO == null) {
                return String(Math.floor(Math.random()*9999999));
            } else {
                var r = Math.floor(Math.random() * match.getProxy().wheelProb.length);
                return String(match.getProxy().wheelProb[r] * match.getProxy().currentMatchVO.entryFee);
            }
        }

        playComplete():void {
            this.luckstarAnimation.animation.gotoAndStop("newAnimation");
            this.luckgoldAnimation.animation.gotoAndStop("shanguang+saqian");
            if (this.completeListener!=null) {
                this.completeListener.apply(this.completeThisObj);
            }
            this.removeFromParent();
        }

        FPSCreate:boolean = false;

        /**
         * 播放动画
         */
        playFPSAnimation(playCoin:boolean=false):void {
            this.luckstarAnimation.animation.play("newAnimation", -1);
            if (playCoin) {
                this.luckgoldAnimation.display.visible = true;
                this.luckgoldAnimation.animation.play("shanguang+saqian", 1);
            }
            egret.setTimeout(this.playComplete,this,1500);
        }

        addDragonBones() {
            var boneFactory:dragonBones.EgretFactory = gameabc.addAssetsToBonesFactory(AppReg.SNG,"xingyunzhuanlun_json","xingyunzhuanlun_texture_png","xingyunzhuanlun_texture_json");
            this.luckstarAnimation = boneFactory.buildFastArmature("MovieClip");
            this.luckstarAnimation.display.touchEnabled = false;
            dragonBones.WorldClock.clock.add(this.luckstarAnimation);
            this.imagegroup.addChild(<egret.DisplayObject>this.luckstarAnimation.display);
            this.luckstarAnimation.animation.gotoAndStop("newAnimation");

            var boneFactory:dragonBones.EgretFactory = gameabc.addAssetsToBonesFactory(AppReg.SNG_ENTRY,"xingyunzhuanlun_gold_json","xingyunzhuanlun_gold_texture_png","xingyunzhuanlun_gold_texture_json");
            this.luckgoldAnimation = boneFactory.buildFastArmature("MovieClip");
            this.luckgoldAnimation.display.touchEnabled = false;
            this.luckgoldAnimation.display.visible = false;
            this.luckgoldAnimation.display.y = 50;
            dragonBones.WorldClock.clock.add(this.luckgoldAnimation);
            this.imagegroup.addChild(<egret.DisplayObject>this.luckgoldAnimation.display);
            this.luckgoldAnimation.animation.gotoAndStop("shanguang+saqian");
        }

        dispose() {
            super.dispose();
            egret.Ticker.getInstance().unregister(this.wheelListener,this);
            dragonBones.WorldClock.clock.remove(this.luckstarAnimation);
            gameabc.destoryFactory(AppReg.SNG);
            dragonBones.WorldClock.clock.remove(this.luckgoldAnimation);
            gameabc.destoryFactory(AppReg.SNG_ENTRY);
        }
    }
}