/**
 * Created by JiangTao on 2016/4/19.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uicomps;
(function (uicomps) {
    /**
     * 多项选择菜单栏组件
     * 1.当有选择项发生变动的时候会派发Event.change事件，外部需要监听这个事件处理逻辑
     * 2.selectItemData属性是当前选中的数据项
     * 3.itemRenderer是渲染呈项项
     */
    var ChrooseMenu = (function (_super) {
        __extends(ChrooseMenu, _super);
        function ChrooseMenu() {
            var _this = _super.call(this) || this;
            //=================================翻页参数===================
            _this.$pageSize = 3; //一页列表的显示,默认显示3条
            _this.$pageIndex = 0; //当前显示的页
            _this.$pageWidth = 0; //每一页的宽度
            _this.$barWidth = 0; //列表的总长度
            _this.$pageCount = 1; //总页数
            //====================================================================
            /**
             * 子项显示区域的大小
             * @type {egret.Rectangle}
             */
            _this.ITEM_FRAME = new egret.Rectangle(0, 0, 128, 58);
            /**
             * 翻页按钮的宽度
             * @type {number}
             */
            _this.PAGE_BTN_WIDTH = 35;
            /**
             * 标记是否需要刷新显示
             * @type {boolean}
             */
            _this.isUpdateListFlag = false;
            _this.delayChrooseId = 0;
            _this.coolTime = 0;
            _this.focusCD = 0;
            _this.skinName = "resource/app_skin/comp/ChrooseMenuSkin.exml";
            _this.$listEventDispatch = new egret.EventDispatcher();
            return _this;
        }
        /**
         *
         * @param event
         */
        ChrooseMenu.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.initBarDatas();
            this.bindButton(this.btnLeft);
            this.bindButton(this.btnRight);
            this.$listEventDispatch.addEventListener(uicomps.EVENT_TYPE_FOCUS_ITEM, this.focusItemHandler, this);
        };
        /**
         * 初始化列表数据
         */
        ChrooseMenu.prototype.initBarDatas = function () {
            var _this = this;
            if (this.$dataPrivoder) {
                this.menuBar.itemRenderer = this.itemRenderer;
                this.menuBar.dataProvider = this.$dataPrivoder;
                //默认选中列表里的第一项数据
                this.delayChrooseId = egret.setTimeout(function () {
                    var chrooseData = _this.$dataArray[0];
                    _this.$listEventDispatch.dispatchEventWith(uicomps.EVENT_TYPE_CHROOSE_ITEM, false, chrooseData);
                }, this, 100);
                this.initPages();
            }
        };
        /**
         * 初始化翻页相关的参数设置
         */
        ChrooseMenu.prototype.initPages = function () {
            this.$pageIndex = 0;
            this.$barWidth = 0;
            if (this.dataProvider) {
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
        };
        /**
         * 刷新当前组件的显示列表
         * @param unscaledWidth
         * @param unscaledHeight
         */
        ChrooseMenu.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.isUpdateListFlag) {
                this.isUpdateListFlag = false;
                this.width = this.$pageWidth + this.PAGE_BTN_WIDTH * 2;
                if (this.$barWidth < this.$pageWidth) {
                    this.menuBar.horizontalCenter = null;
                }
                else {
                    this.menuBar.x = 0;
                    this.menuBar.horizontalCenter = null;
                }
            }
        };
        //focusCD间隔时间 
        /**
         * 选中项个菜单项时处理
         * @param event
         */
        ChrooseMenu.prototype.focusItemHandler = function (event) {
            //========================黄侃要求这里需要设置一个CD时间,服务器那里连响应会蹦掉================
            var prevCD = this.coolTime;
            var nowTime = egret.getTimer();
            if (nowTime - prevCD < this.focusCD) {
                this.dispatchEventWith("focusCDEvent", false);
                return;
            }
            else {
                this.coolTime = nowTime;
            }
            //========================the end=====================================================
            var item = event.data;
            var focusPositionX = item.itemIndex * this.ITEM_FRAME.width;
            if (this.tween)
                this.tween.pause();
            this.tween == null;
            //焦点移动到的目标位置
            var destinationX = focusPositionX - this.menuBar.scrollH;
            this.tween = egret.Tween.get(this.chrooseBg);
            this.tween.to({ x: destinationX }, 300, egret.Ease.sineOut);
            //设置聚焦状态
            if (item == this.focusItem)
                return;
            var oldFocus = this.focusItem;
            this.focusItem = item;
            this.focusItem.setFocus(true);
            if (oldFocus) {
                oldFocus.setFocus(false);
            }
            //当有选择发生改变的时候触发变动事件给外部
            this.dispatchEventWith(egret.Event.CHANGE, false, this.focusItem.data.value);
        };
        ChrooseMenu.prototype.touchBindButtonHandler = function (target) {
            if (target == this.btnLeft) {
                this.$pageIndex = Math.max(0, this.$pageIndex - 1);
                this.pageChangeHandler(-1);
            }
            else if (target == this.btnRight) {
                this.$pageIndex = Math.min(this.$pageCount, this.$pageIndex + 1);
                this.pageChangeHandler(1);
            }
        };
        /**
         * 点击翻页按钮后的相关操作处理
         * @param offsetPage
         */
        ChrooseMenu.prototype.pageChangeHandler = function (offsetPage) {
            var _this = this;
            //列表滚动的目标位置
            var targetX = 0;
            //最后一页
            if (this.$pageIndex == this.$pageCount - 1) {
                targetX = this.$barWidth - this.$pageWidth;
            }
            else if (this.$pageIndex == 0) {
                targetX = 0;
            }
            else {
                targetX = this.$pageIndex * this.$pageWidth;
            }
            if (this.focusItem)
                this.focusItem.setFocus(false);
            if (this.pageTween)
                this.pageTween.pause();
            this.pageTween = null;
            this.pageTween = egret.Tween.get(this.menuBar);
            this.pageTween.to({ scrollH: targetX }, 300, egret.Ease.sineOut)
                .wait(100)
                .call(function () {
                var focusIndex = _this.getFocusIndex();
                if (focusIndex > -1) {
                    var chrooseData = _this.$dataArray[focusIndex];
                    _this.$listEventDispatch.dispatchEventWith(uicomps.EVENT_TYPE_CHROOSE_ITEM, false, chrooseData);
                }
            }, this);
            //检查当前翻页按钮的状态
            this.checkSwapPageBtn();
        };
        /**
         * 获取当前焦点的ItemIndex
         * @returns {number}
         */
        ChrooseMenu.prototype.getFocusIndex = function () {
            var i = 0;
            for (i; i != this.$dataArray.length; i++) {
                var focusX = this.ITEM_FRAME.width * i;
                if (focusX - this.menuBar.scrollH == this.chrooseBg.x) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * 确定当前翻页按钮的显示状态
         */
        ChrooseMenu.prototype.checkSwapPageBtn = function () {
            if (this.$pageCount > 1) {
                this.btnLeft.visible = true;
                this.btnRight.visible = true;
                this.btnLeft.touchEnabled = this.btnRight.touchEnabled = true;
                this.btnLeft.alpha = this.btnRight.alpha = 1;
                if (this.$pageIndex == 0) {
                    this.btnLeft.touchEnabled = false;
                    this.btnLeft.alpha = 0.5;
                }
                if (this.$pageIndex == this.$pageCount - 1) {
                    this.btnRight.touchEnabled = false;
                    this.btnRight.alpha = 0.5;
                }
            }
            else {
                this.btnLeft.visible = false;
                this.btnRight.visible = false;
            }
        };
        ChrooseMenu.prototype.dispose = function () {
            if (this.$listEventDispatch) {
                this.$listEventDispatch.removeEventListener(uicomps.EVENT_TYPE_FOCUS_ITEM, this.focusItemHandler, this);
            }
            if (this.delayChrooseId > 0) {
                egret.clearTimeout(this.delayChrooseId);
            }
            if (this.tween) {
                this.tween.pause();
                this.tween = null;
            }
            if (this.pageTween) {
                this.pageTween = null;
            }
            if (this.btnLeft)
                this.unbindButton(this.btnLeft);
            if (this.btnRight)
                this.unbindButton(this.btnRight);
            if (this.tween)
                this.tween = null;
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(ChrooseMenu.prototype, "pageSize", {
            get: function () { return this.$pageSize; },
            /**
             * 设置每一页显示的个数
             * @param val
             */
            set: function (val) {
                if (this.$pageSize == val)
                    return;
                this.$pageSize = val;
                this.initPages();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChrooseMenu.prototype, "itemRenderer", {
            get: function () { return this.$itemRenderer; },
            set: function (val) { this.$itemRenderer = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChrooseMenu.prototype, "dataProvider", {
            get: function () {
                return this.$dataArray;
            },
            /**
             * 设置菜单数据源
             * @param val
             */
            set: function (val) {
                if (val == this.$dataArray)
                    return;
                this.$dataArray = val;
                var providers = [];
                for (var i = 0; i != this.$dataArray.length; i++) {
                    var struct = new uicomps.MenuDataStruct(this.$listEventDispatch, this.$dataArray[i], i == 0);
                    providers.push(struct);
                }
                this.$dataPrivoder = new eui.ArrayCollection(providers);
                if (this.menuBar && this.initialized)
                    this.initBarDatas();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChrooseMenu.prototype, "selectItemData", {
            /**
             * 当前选中的数据项
             * @returns {any}
             */
            get: function () {
                return this.focusItem ? this.focusItem.data.value : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChrooseMenu.prototype, "selectItemIndex", {
            get: function () {
                return this.dataProvider == null ? -1 : this.dataProvider.indexOf(this.selectItemData);
            },
            enumerable: true,
            configurable: true
        });
        return ChrooseMenu;
    }(gameabc.UICustomComponent));
    uicomps.ChrooseMenu = ChrooseMenu;
    __reflect(ChrooseMenu.prototype, "uicomps.ChrooseMenu");
    /**
     * 呈现项的数据结构
     */
    var MenuDataStruct = (function () {
        function MenuDataStruct(dispatch, value, select) {
            /**
             * 是否标记为选中状态
             * @type {boolean}
             */
            this.selected = false;
            this.dispatch = dispatch;
            this.value = value;
            this.selected = select;
        }
        return MenuDataStruct;
    }());
    uicomps.MenuDataStruct = MenuDataStruct;
    __reflect(MenuDataStruct.prototype, "uicomps.MenuDataStruct");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=ChrooseMenu.js.map