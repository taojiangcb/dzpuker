module playcards {
    export class PlaycardsChengZhangComp extends app.base.BaseWndUIMoudleComponent{
        public chengzhanglist:eui.List;
        public giftView:eui.ViewStack;
        public bar:eui.ProgressBar;
        public barlab:eui.Label;
         public bartipimg:eui.Image;
        public itemimage:eui.Image;
        public itemname:eui.Label;
        public itemsgroup:eui.Group;
        public btnClose:eui.Image;
        public img_lingqu:eui.Image;

		public constructor() {
			 super()
            this.skinName = "PlaycardsChengZhangSkin";
		}
		createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.itemimage);   
            this.bindButton(this.btnClose);
            this.chengzhanglist.itemRenderer = ChengzhangListItem;
		} 
		opening(): void {
			super.opening();
			 var json = RES.getRes("chengzhang_json");
            // var e = EXML.parse(RES.getRes("chengzhang_xml"));
            // var xml = egret.XML.parse(RES.getRes("chengzhang_xml"));   
            this.chengzhanglist.dataProvider = new eui.ArrayCollection(json.data);
            this.refGift();
		}
		//刷新奖励显示
        public refGift(): void{
            var json = RES.getRes("chengzhang_json");
            var myuser = user.getProxy().playInfoVO;
            var totalget: number = 0;//已经获得积分
              var max: number = 0;//积分上限
              if (myuser && json) {
                  var data = json.data;
                  for (var i: number = 0, len: number = data.length; i < len; i++) {
                      totalget += Math.min(Number(myuser[data[i].num]), Number(data[i].maxnum)) * Number(data[i].mark);
                  }
                  var gift = json.gift;//可领奖积分列表 可能不是顺序
                  var giftItem = json.giftItem;//可领奖物品列表
                  var getgift: string[] = myuser.rewardrecord;
              
                  var giftindex: number = gift.length - 1;//当前显示
                  var canget: boolean = false;//当前是否可领取
                  for (var i: number = 0, len: number = gift.length; i < len; i++) {
                      var g: number = Number(gift[i]);
                      max = Math.max(g, max);
                      if (totalget >= g) {
                          var nohas: boolean = getgift.indexOf(i + "") == -1;
                          if (nohas) {//满足 没领过
                              giftindex = i;
                              canget = true;
                          }
                      } else if (!canget && i < giftindex) {
                          giftindex = i;
                      }
                  }
                  if (totalget >= max && !canget) {//出师
                      this.giftView.selectedIndex = 1;
                       win.getProxy()._isApprenticeship = true;
                  } else {
                      this.itemsgroup.removeChildren();
                      for (var i: number = 0, len: number = gift.length; i < len; i++) {
                          var g: number = Number(gift[i]);
                          var px = (g / max) * 300;
                          var img: eui.Image = new eui.Image(RES.getRes("img_cut_line_jbc_png"));
                          this.itemsgroup.addChild(img);
                          img.x = px - 6;
                          img.y = 4;
                          var lab: eui.Label = new eui.Label();
                          lab.size = 20;
                          lab.width = 80;
                          lab.textAlign = "center";
                          lab.textColor = 0xcab1d7;
                          lab.x = px - 40;
                          lab.y = 20;
                          lab.text = g + "";
                          this.itemsgroup.addChild(lab);
                      }
                      this.giftView.selectedIndex = 0;
                      this.bar.maximum = max;
                      this.bar.value = totalget;
                      this.barlab.text = totalget + "/" + max;
                      var item = giftItem[giftindex];
                      this.itemimage.source = item[1];
                      this.bartipimg.source="iw_chengzhangl"+giftindex+"_png"
                      this.itemimage.touchEnabled = canget;
                      this.itemimage.alpha = canget ? 1 : 0.5;
                      this.itemimage.name = giftindex + "";
                      this.itemname.text = canget ? "" : item[2];
                      this.img_lingqu.visible = canget;
                      this.img_lingqu.scaleX = 1;
                      this.img_lingqu.scaleY = 1;
                      egret.Tween.removeTweens(this.img_lingqu);
                      if (canget) {
                          this.lingqutween();
                      }
                  }
                  this.giftView.visible = true;
              } else this.giftView.visible = false;
           
        }
        private toscale: number = 1;
        private lingqutween():void {
            if (this.toscale == 1)
                this.toscale = 0.8;
            else this.toscale = 1;
            egret.Tween.get(this.img_lingqu).to({scaleX:this.toscale,scaleY:this.toscale},500).call(this.lingqutween,this);
        }
        /**领取奖励返回 */
        public getItem(index): void{
            var json = RES.getRes("chengzhang_json");
               var gift = json.gift;//可领奖积分列表 可能不是顺序
               var giftItem = json.giftItem;//可领奖物品列表
               if (index != -1) {
                   var item = giftItem[index];
                 var param:any = {icon: item[1], memo: item[2]};
                 __OPEN_PRE_MOUDLE(AppReg.AWARD_MC_WIN, param);   
               }
               this.refGift();
            
        }
        dispose(): void {
            egret.Tween.removeTweens(this.img_lingqu);
            super.dispose();
        }
		touchBindButtonHandler(tag: egret.DisplayObject): void {
			switch (tag) {
				case this.btnClose:
					this.close();
					break;
			    case this.itemimage://领取
                    __PVO().i(Number(this.itemimage.name)).to(app.NetAction.REQ_USER_REWARD);
                      mc2sdk.event(mc2sdk.EVENT_TYPE.CHENGZHANG_GIFT);
                    break;    
			}
		}
	}
}
//显示条定义
class ChengzhangListItem extends uicomps.BaseItemCilckRenderer {
    //定义变量
    public btn: eui.Group;
    //text="{data.num+'/'+data.maxnum}"
    public num: eui.Label;
    public createComplete(evt: egret.Event): void {     
        super.createComplete(evt);
        this.addButton(this.btn);
    } 
    dataChanged(): void {
        super.dataChanged();
        if(user.getProxy().playInfoVO)
            this.num.text =Math.min(Number(user.getProxy().playInfoVO[this.data.num]),Number(this.data.maxnum)) +'/'+this.data.maxnum;
    }
    protected click(tag: egret.DisplayObject): void {
        if (__IS_MOUDLE_OPEN(AppReg.APP_PLAYCARDS)) {
            var parent = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS)["mainview"];
        }
        
        __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE_TIP, this.itemIndex, null, null, parent);
        //  __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWTIP);  
     }
}