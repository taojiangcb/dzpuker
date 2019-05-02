/**
 * HtmlText工具类
 */ 

module utils {
    export class HtmlTextUtils {
        public constructor() {
        }

        /**
         * 将Html文字,转成Label可识别的TextElement
         */ 
        public static transferHtmlText(htmlText:string): egret.ITextElement[] {
            if(htmlText == null) return null;
            return (new egret.HtmlTextParser).parser(htmlText.toLowerCase());
        }
        
        /**
         * 组建普通 text
         * 参数：
         *  - textFlows: 文字串。
         *  - textContent: 文字内容
         *  - color：颜色
         * 
         * 返回：
         *  - textFlows, 用来付值给label.textFlows
         */
        public static appendText(textFlows: egret.ITextElement[],textContent: string): egret.ITextElement[] {
            if(textFlows == null) {
                textFlows = [];
            }

            textFlows.push({ text: textContent});
            return textFlows;
        }
        
        /**
         * 组建html text
         * 参数：
         *  - textFlows: 文字串。
         *  - textContent: 文字内容
         *  - color：颜色
         * 
         * 返回：
         *  - textFlows, 用来付值给label.textFlows
         * 
         * for example:
         * var txtFlow:any = utils.HtmlTextUtils.appendHtmlText(null, "第一行红色", 0xFF0000);
         * txtFlow = utils.HtmlTextUtils.appendHtmlText(txtFlow, "第二行白色", 0x000000);
         * amLabel.textFlow = txtFlow;
         */ 
        public static appendHtmlText(textFlows: egret.ITextElement[],textContent: string,color: number): egret.ITextElement[] {
            if(textFlows == null) {
                textFlows = [];
            }

            textFlows.push({ text: textContent,style: { "textColor": color}});
            return textFlows;
        }
        
        /**
         * 
         * @param _molecule
         * @param fenm
         */
        public static numberToPercentage(_molecule:number,fenm:number):string
        {
            var retrunA:number = 0
            var s:string=""
            retrunA = _molecule / fenm * 100
            s =retrunA.toFixed(1)
            if(s=="NaN"||s=="")
            {
                s="0";
            }
            return s+"%";
        }
        
        /**
       * 
       * @param _molecule
       * @param fenm
       */
        public static numToPercentage(_molecule: number): string {
            var retrunA: number = 0
            var s: string = ""
            retrunA = _molecule * 100
            s = retrunA.toFixed(1)
            if(s == "NaN" || s == "") {
                s = "0";
            }
            return s + "%";
        }
    }
}