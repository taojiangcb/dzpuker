/**
 * Created by JiangTao on 2016/4/19.
 */

module uicomps {

    /**
     * 多项选择菜单栏组件
     * 1.当有选择项发生变动的时候会派发Event.change事件，外部需要监听这个事件处理逻辑
     * 2.selectItemData属性是当前选中的数据项
     * 3.itemRenderer是渲染呈项项
     */
    export class ChrooseMenu extends gameabc.UICustomComponent {

        //===========================ui子级=========================
        bg: eui.Image;                                  //背景条栏
        chrooseBg: eui.Image;                           //先中项背景
        menuBar:eui.List;                               //呈现列表
        btnLeft:eui.Image;
        btnRight:eui.Image;
        pageScroll:eui.Scroller;

        //===============================list参数============================
        $dataPrivoder:eui.ArrayCollection;              //数据源
        $itemRenderer:any;                              //数据显示项
        $listEventDispatch:egret.EventDispatcher;       //列表呈现项列表派发器
        $dataArray:any[];

        //=================================翻页参数===================
        $pageSize:number = 3;                           //一页列表的显示,默认显示3条
        $pageIndex:number = 0;                          //当前显示的页
        $pageWidth:number = 0;                          //每一页的宽度
        $barWidth:number = 0;                           //列表的总长度
        $pageCount:number = 1;                          //总页数
        //====================================================================
        /**
         * 子项显示区域的大小
         * @type {egret.Rectangle}
         */
        ITEM_FRAME:egret.Rectangle = new egret.Rectangle(0,0,128,58);

        /**
         * 翻页按钮的宽度
         * @type {number}
         */
        PAGE_BTN_WIDTH:number = 35;

        /**
         * 标记是否需要刷新显示
         * @type {boolean}
         */
        isUpdateListFlag:boolean = false;

        /**
         * 当前选中的呈现项
         */
        focusItem:uicomps.ChrooseMenuItemRenderer;

        /**
         * 缓动效果动画
         */
        tween:egret.Tween;
        pageTween:egret.Tween;
        delayChrooseId:number = 0;


        constructor(){
            super()
            this.skinName = "resource/app_skin/comp/ChrooseMenuSkin.exml";
            this.$listEventDispatch = new egret.EventDispatcher();
        }

        /**
         *
         * @param event
         */
        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.initBarDatas();

            this.bindButton(this.btnLeft);
            this.bindButton(this.btnRight);

            this.$listEventDispatch.addEventListener(uicomps.EVENT_TYPE_FOCUS_ITEM,this.focusItemHandler,this);
        }

        /**
         * 初始化列表数据
         */
        initBarDatas():void {
            if(this.$dataPrivoder) {
                this.menuBar.itemRenderer = this.itemRenderer;
                this.menuBar.dataProvider = this.$dataPrivoder;

                //默认选中列表里的第一项数据
                this.delayChrooseId = egret.setTimeout(()=> {
                    var chrooseData:any = this.$dataArray[0];
                    this.$listEventDispatch.dispatchEventWith(EVENT_TYPE_CHROOSE_ITEM, false, chrooseData);
                },this,100);

                this.initPages();
            }
        }

        /**
         * 初始化翻页相关的参数设置
         */
        initPages():void {
            this.$pageIndex = 0;
            this.$barWidth = 0;

            if(this.dataProvider) {
                this.$pageCount = Math.ceil(this.dataProvider.length / this.pageSize);
                this.$barWidth = this.ITEM_FRAME.width * this.dataProvider.length;
            }
            else {
                this.$pageCount = 1;
                this.$barWidth = this.ITEM_FRAME.width * 1;
            }
            this.$pageWidth = this.pageSize * this.ITEM_FRAME.width; //+ this.PAGE_BTN_WIDTH * 2;

            this.checkSwapPageBtn();
            this.isUpdateListFlag = true;
            this.invalidateDisplayList();
        }


        /**
         * 刷新当前组件的显示列表
         * @param unscaledWidth
         * @param unscaledHeight
         */
        updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
            super.updateDisplayList(unscaledWidth,unscaledHeight);
            if(this.isUpdateListFlag) {
                this.isUpdateListFlag = false;
                this.width = this.$pageWidth + this.PAGE_BTN_WIDTH * 2;

                if(this.$barWidth < this.$pageWidth) {
                    this.menuBar.horizontalCenter = null;
                }
                else {
                    this.menuBar.x = 0;
                    this.menuBar.horizontalCenter = null;
                }
            }
        }
        
        private coolTime:number = 0;
        focusCD:number = 0;      
        
        //focusCD间隔时间 
        /**
         * 选中项个菜单项时处理
         * @param event
         */
        focusItemHandler(event:egret.Event):void {
            
            //========================黄侃要求这里需要设置一个CD时间,服务器那里连响应会蹦掉================
            var prevCD = this.coolTime;
            var nowTime:number = egret.getTimer();
            if(nowTime - prevCD < this.focusCD) {
                this.dispatchEventWith("focusCDEvent",false);
                return;
            } else {
                this.coolTime = nowTime;    
            }
            //========================the end=====================================================
            
            var item:uicomps.ChrooseMenuItemRenderer = event.data;
            var focusPositionX = item.itemIndex * this.ITEM_FRAME.width;
            if(this.tween) this.tween.pause();
            this.tween == null;

            //焦点移动到的目标位置
            var destinationX:number = focusPositionX - this.menuBar.scrollH;
            this.tween = egret.Tween.get(this.chrooseBg);
            this.tween.to({x:destinationX},300,egret.Ease.sineOut);

            //设置聚焦状态
            if(item == this.focusItem) return;
            var oldFocus:uicomps.ChrooseMenuItemRenderer = this.focusItem;
            this.focusItem = item;
            this.focusItem.setFocus(true);
            if(oldFocus) {
                oldFocus.setFocus(false);
            }

            //当有选择发生改变的时候触发变动事件给外部
            this.dispatchEventWith(egret.Event.CHANGE,false,this.focusItem.data.value)
        }

        touchBindButtonHandler(target:egret.DisplayObject):void {
            if(target == this.btnLeft) {
                this.$pageIndex = Math.max(0,this.$pageIndex - 1);
                this.pageChangeHandler(-1)
            }
            else if(target == this.btnRight) {
                this.$pageIndex = Math.min(this.$pageCount,this.$pageIndex + 1);
                this.pageChangeHandler(1)
            }
        }

        /**
         * 点击翻页按钮后的相关操作处理
         * @param offsetPage
         */
        pageChangeHandler(offsetPage:number):void {

            //列表滚动的目标位置
            var targetX:number = 0;
            //最后一页
            if(this.$pageIndex == this.$pageCount - 1) {
                targetX = this.$barWidth - this.$pageWidth;
            }
            //第一页
            else if(this.$pageIndex == 0) {
                targetX = 0;
            }
            //当前页
            else {
                targetX = this.$pageIndex * this.$pageWidth;
            }

            if(this.focusItem) this.focusItem.setFocus(false);
            if(this.pageTween) this.pageTween.pause();
            this.pageTween = null;
            this.pageTween = egret.Tween.get(this.menuBar);
            this.pageTween.to({scrollH:targetX},300,egret.Ease.sineOut)
                .wait(100)
                .call(()=>{
                    var focusIndex:number = this.getFocusIndex();
                    if(focusIndex > -1) {
                        var chrooseData:any = this.$dataArray[focusIndex];
                        this.$listEventDispatch.dispatchEventWith(EVENT_TYPE_CHROOSE_ITEM, false, chrooseData);
                    }
                },this);
            //检查当前翻页按钮的状态
            this.checkSwapPageBtn();
        }

        /**
         * 获取当前焦点的ItemIndex
         * @returns {number}
         */
        getFocusIndex():number {
            var i:number = 0;
            for(i;i != this.$dataArray.length;i++) {
                var focusX:number = this.ITEM_FRAME.width * i;
                if(focusX - this.menuBar.scrollH == this.chrooseBg.x) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * 确定当前翻页按钮的显示状态
         */
        checkSwapPageBtn():void {
            if(this.$pageCount > 1) {
                this.btnLeft.visible = true;
                this.btnRight.visible = true;

                this.btnLeft.touchEnabled = this.btnRight.touchEnabled = true;
                this.btnLeft.alpha = this.btnRight.alpha = 1;

                if(this.$pageIndex == 0) {
                    this.btnLeft.touchEnabled = false;
                    this.btnLeft.alpha = 0.5;
                }

                if(this.$pageIndex == this.$pageCount - 1) {
                    this.btnRight.touchEnabled = false;
                    this.btnRight.alpha = 0.5;
                }
            }
            else {
                this.btnLeft.visible = false;
                this.btnRight.visible = false;
            }
        }

        dispose():void {
            if(this.$listEventDispatch) {
                this.$listEventDispatch.removeEventListener(uicomps.EVENT_TYPE_FOCUS_ITEM,this.focusItemHandler,this);
            }

            if(this.delayChrooseId > 0) {
                egret.clearTimeout(this.delayChrooseId)
            }

            if(this.tween) {
                this.tween.pause();
                this.tween = null;
            }

            if(this.pageTween) {
                this.pageTween = null;
            }

            if(this.btnLeft) this.unbindButton(this.btnLeft);
            if(this.btnRight) this.unbindButton(this.btnRight);

            if(this.tween) this.tween = null;
            super.dispose();
        }

        get pageSize():number {return this.$pageSize;}

        /**
         * 设置每一页显示的个数
         * @param val
         */
        set pageSize(val:number) {
            if(this.$pageSize == val) return;
            this.$pageSize = val;
            this.initPages();
        }

        get itemRenderer():any {return this.$itemRenderer;}
        set itemRenderer(val:any) {this.$itemRenderer = val;}

        /**
         * 设置菜单数据源
         * @param val
         */
        set dataProvider(val:any[]) {
            if(val == this.$dataArray) return;
            this.$dataArray = val;

            var providers:uicomps.MenuDataStruct[] = [];
            for(var i:number = 0; i != this.$dataArray.length; i++) {
                var struct:MenuDataStruct = new uicomps.MenuDataStruct(this.$listEventDispatch,this.$dataArray[i],i == 0);
                providers.push(struct);
            }

            this.$dataPrivoder = new eui.ArrayCollection(providers);
            if(this.menuBar && this.initialized) this.initBarDatas()
        }

        get dataProvider():any[] {
            return this.$dataArray;
        }

        /**
         * 当前选中的数据项
         * @returns {any}
         */
        get selectItemData():any {
            return this.focusItem ? this.focusItem.data.value : null;
        }
        
        get selectItemIndex():number {
            return this.dataProvider == null ? -1 : this.dataProvider.indexOf(this.selectItemData);
        }
    }

    /**
     * 呈现项的数据结构
     */
    export class MenuDataStruct {
        /**
         * 呈现项的事件委托派发对像
         */
        dispatch:egret.EventDispatcher;

        /**
         * 呈现项的数据信息
         */
        value:any;

        /**
         * 是否标记为选中状态
         * @type {boolean}
         */
        selected:boolean = false;
        constructor(dispatch:egret.EventDispatcher,value:any,select:boolean) {
            this.dispatch = dispatch;
            this.value = value;
            this.selected = select;
        }
    }
}