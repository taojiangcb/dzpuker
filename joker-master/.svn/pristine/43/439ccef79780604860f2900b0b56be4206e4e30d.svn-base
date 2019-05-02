/**
 * Created by JiangTao on 2016/4/7.
 */
module shop {
    export class VipRowItemRenderer extends uicomps.BaseItemCilckRenderer {

        txtTitle:eui.Label;
        txtV1:eui.Label;
        txtV2:eui.Label;
        txtV3:eui.Label;
        txtV4:eui.Label;
        txtV5:eui.Label;

        bgColor:eui.Rect;

        constructor() {
            super();
            this.skinName = "resource/app_skin/shop/VipRowSkin.exml";
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        dataChanged():void {

            if(this.itemIndex % 2 == 0) {
                this.bgColor.visible = true;
            } else {
                this.bgColor.visible = false;
            }

            if(this.data) {
                this.txtTitle.text = this.data.title;

                if(this.data.isSwitch) {
                    this.txtV1.text = this.data.values[0] ? "开启" : "-";
                    this.txtV2.text = this.data.values[1] ? "开启" : "-";
                    this.txtV3.text = this.data.values[2] ? "开启" : "-";
                    this.txtV4.text = this.data.values[3] ? "开启" : "-";
                    this.txtV5.text = this.data.values[4] ? "开启" : "-";
                }
                else {
                    this.txtV1.text = this.data.values[0];
                    this.txtV2.text = this.data.values[1];
                    this.txtV3.text = this.data.values[2];
                    this.txtV4.text = this.data.values[3];
                    this.txtV5.text = this.data.values[4];
                }
            }
        }
    }
}