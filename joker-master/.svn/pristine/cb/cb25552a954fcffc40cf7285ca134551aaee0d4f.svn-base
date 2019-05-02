/**
 * Created by JiangTao on 2016/4/20.
 */
module uicomps {

    /**
     * 派发到选中的事件
     * @type {string}
     */
    export var EVENT_TYPE_FOCUS_ITEM:string = "focusItem";
    export var EVENT_TYPE_CHROOSE_ITEM:string = "chrooseItem";

    /**
     * 数据选择栏中的呈现项组件
     */
    export class ChrooseMenuItemRenderer extends uicomps.BaseItemCilckRenderer {

        /**
         * 文本组件标签
         */
        txtLabel:eui.Label;

        /**
         * 没有选中时的颜色
         * @type {number}
         */
        NORMAL_COLOR:number = 0x7D6386;

        /**
         * 选中时的颜色
         * @type {number}
         */
        CHROOSE_COLOR:number = 0xFFFFFF;

        /**
         * 当前的数据项
         */
        dataPropert:uicomps.MenuDataStruct

        constructor() {
            super();
            this.skinName = "resource/app_skin/comp/ChrooseMenuItemSkin.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.touchChildren = false;
            this.addButton(this,false);
        }

        click(tag:egret.DisplayObject):void {
            if(this.dataPropert) {
                this.dataPropert.dispatch.dispatchEventWith(EVENT_TYPE_FOCUS_ITEM, false, this);
            }
        }

        dataChanged():void {
            if(this.data) {
                this.dataPropert = <uicomps.MenuDataStruct>this.data;
                this.dataPropert.dispatch.addEventListener(EVENT_TYPE_CHROOSE_ITEM,this.chrooseItemHandler,this);
                this.txtLabel.text = this.labelFunc();
            }
            else {
                this.dataPropert = null;
                this.txtLabel.text = "";
            }
        }

        /**
         * 由ChrooseMenu组件派发当前强制选中的消息处理
         * @param event
         */
        chrooseItemHandler(event:egret.Event):void {
            if(this.dataPropert) {
                if(this.dataPropert.value == event.data) {
                    this.dataPropert.dispatch.dispatchEventWith(EVENT_TYPE_FOCUS_ITEM, false, this);
                }
            }
        }

        /**
         * 当前选中状态变动时处理
         */
        protected focusChange():void {
            if(this.dataPropert) {
                if(!this.txtLabel) return;
                this.txtLabel.textColor = this.dataPropert.selected ? this.CHROOSE_COLOR : this.NORMAL_COLOR;
                this.txtLabel.verticalCenter = this.dataPropert.selected ? 0 : 0;
            }
        }

        setFocus(val:boolean) {
            if(this.dataPropert) {
                this.dataPropert.selected = val;
                this.focusChange();
            }
        }

        /**
         * 由子级覆盖椒现该ItemRenderer的Label字段处理的方法
         * @returns {string}
         */
        protected labelFunc():string {
            if(this.dataPropert) {
                if(this.dataPropert.value.hasOwnProperty("label")) {
                    return this.dataPropert.value["label"];
                }
            }
            return "";
        }
    }
}