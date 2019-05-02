module item {
	/**
	 *
	 * @author 
	 *
	 */
    export class PropInfoItem extends uicomps.BaseItemCilckRenderer {
        
        info: item.PropVO;
        templa:localDB.PropTemplateVO;

        iconImag:eui.Image;
        numTxt:eui.Label;
        nameTxt:eui.Label;
        descTxt:eui.Label;
        timeTxt:eui.Label;
        okBtn:eui.Group;
        bgImag:eui.Image;
        btnLabel: eui.Image;

        public constructor() {
            super();
            this.skinName = "PropInfoItemSkin";
            this.percentWidth = 100;
        }
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.okBtn.touchChildren = false;
             this.addButton(this.okBtn);
        }

        dataChanged(): void {
            if(this.itemIndex % 2 == 0) {
                this.bgImag.visible = true;
            } 
            else {
                this.bgImag.visible = false;
            }
            if(this.data) {

                this.info = this.data;
                this.timeTxt.text = "";

                if(this.info) {
                    this.templa = this.info.template;
                    if(this.templa) {
                        this.iconImag.source = this.templa.icon+"_png";
                        this.numTxt.text  = this.info.num.toString();
                        this.nameTxt.text = this.templa.name;
                        this.nameTxt.textColor = this.templa.nameColor;
                        this.descTxt.text = this.templa.descript;
                        var timeStr:string = ""
                        var tiemBool:boolean =false;

                        if(this.info.timeEnd) {
                            var now = app.SystemTimer.systemTime / 1000;
                            if(this.info.timeEnd<now) {
                                tiemBool = false;
                                timeStr ="过期"
                            } else {
                                tiemBool = true;
                                timeStr =DateUtils.dateFormat(new Date(this.info.timeEnd*1000),"yyyy-MM-dd");
                            }
                        }
                        else if(this.templa.day) {
                            timeStr =this.templa.year+"-"+this.templa.month+"-"+this.templa.day;
                        }
                        if(timeStr) {
                            this.timeTxt.text = "有效期："+timeStr;
                        } else {
                            this.timeTxt.text = "";
                        }
                        this.okBtn.visible = this.templa.btnShow;
                        if (this.templa.id == 4) this.btnLabel.source = "iw_duihuan_mtt_2_png";
                    }
                    else {
                        console.log("没有 emplate srvId:" + this.info.svrId);
                    }
                } 
            }
        }
        
        click(tag: egret.DisplayObject): void {
            if(tag==this.okBtn) {
                if (this.templa.btnEnable) {
                    __CLOSE_MOUDLE(AppReg.APP_PROP);
                    user.getProxy().openSNG();
                    //四个参数分别为：道具、数量、参数、priceId
                //  __SEND_NOTIFICATION(app.NetAction.USE_EPROPS,[this.info.id,1]);
                } else {
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                }
            }
            // __PVO().to(app.NetAction.);
        }
        
	}
}
