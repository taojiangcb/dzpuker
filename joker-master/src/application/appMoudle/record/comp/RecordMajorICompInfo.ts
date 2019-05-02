module record {
    /***
 * @author 
 *
 */
    export class RecordMajorICompInfo extends gameabc.UICustomComponent {
        // private roleVO: appvos.RoleVO;
        
        public txtVpip:eui.BitmapLabel;
        public txtPer: eui.BitmapLabel;
        public txtAf: eui.BitmapLabel;
        public txt3b: eui.BitmapLabel;
        public txtStl: eui.BitmapLabel;
        public txtCd: eui.BitmapLabel;
        public txtWtsd: eui.BitmapLabel;
        public txtBs: eui.BitmapLabel;
        private _data_array:any[];


        public constructor() {
            super();
        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            // this.roleVO = user.getProxy().roleVo;
        }

        public dispose(): void {
            super.dispose();
        }

        /**
         * 获取内部数据
         */
        public _getInsideUiData():any[]{
            this._data_array= [
                this.txtVpip,
                this.txtPer,
                this.txtAf,
                this.txt3b,
                this.txtStl,
                this.txtCd,
                this.txtWtsd,
                this.txtBs
            ];
            return this._data_array;
        }
    } 
}

