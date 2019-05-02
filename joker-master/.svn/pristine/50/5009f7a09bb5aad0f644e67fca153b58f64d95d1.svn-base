/**
 * Created by JiangTao on 2016/4/20.
 */
module test {
    export class TestChrooseMenu extends gameabc.UIMoudleComponent {
        menuBar:uicomps.ChrooseMenu;
        constructor() {
            super();
            this.skinName="resource/app_skin/test/TestChrooseMenuSkin.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            //每一页显示的个数
            this.menuBar.pageSize = 4;
            //如果数据源长度超过了每页显示的个数会出现翻页按钮，没超过就不会出现翻页按钮
            var datas:any[] = [
                {label:"测试1"},
                {label:2},
                {label:"测试3"},
                {label:4},
                {label:5},
                {label:"测试6"},
                {label:"测试7"},
                {label:"测试8"},
                {label:"测试9"},
                {label:"测试10"},
                {label:"测试11"},
                {label:"测试12"},
                {label:"测试13"}
            ]

            //数据呈现项，可自己覆盖实现功能
            this.menuBar.itemRenderer = uicomps.ChrooseMenuItemRenderer;
            this.menuBar.dataProvider = datas;
            this.menuBar.addEventListener(egret.Event.CHANGE,(event:egret.Event)=>{
                //都是当前你点击的数据项,下面两个都是一样的
                console.log(event.data);
                console.log(this.menuBar.selectItemData);
            },this)
        }

        dispose():void {
            //记得擦屁股
            if(this.menuBar) {
                this.menuBar.dispose()
            }
            super.dispose();
        }
    }
}