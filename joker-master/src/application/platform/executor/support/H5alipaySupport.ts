/**
 * Created by taojiang on 16/10/10.
 */
module support {

    /**
     * 关闭按钮默认显示的图片地址,可以自行更换
     * @type {string}
     */
    export const DEFAULT_CLOSE_IMG:string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MzVBOEIzNkQ5REVFMjExQjRDM0ZDQ0Q4ODRDNUE0NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRkYyM0I0RDBCNTAxMUU2QjM5N0ZFM0QxRDY0NUE3NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRkYyM0I0QzBCNTAxMUU2QjM5N0ZFM0QxRDY0NUE3NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU3QTA4MTJEODUwQUU2MTE5M0U3OUIyMEI4QzYxQjgxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NzIzNzU5ZTItYzRlNC0xMTc4LWJjOTQtZjAxMDU4MTc4MmI4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+DhBYOQAABPJJREFUeNrMmjlMHFcYx79d7mWBBRGKSMabRcJ4ORyhpEjpRHLnEh+yJSudaezKrQundJM0cdxElqVcTpd0KWKFxkWcxAXXcuwu9y0WsJC4lnz/4Q2MZ+bNzvHG8Jf+Qqzmvff95t1vXmRgYIAU6Rz7MvsT9gV2kt3MrmVH2G/Zq+w8O8N+zX7JnlFReHnA9K3sO+wb7HSJZ5uE29lXDL8Ps39mP2dP+Q0k6jPdJfYLdo79yAWEk9Iij6zI89L7AGlhP2P/x+4L8CJksfSJvJ+JskIB6RNt+45o82EpIsrIiDKVgVSyvxXVnqD3p4Qo84mIIRBInP07u59OT3dFDHG/IDH2H6YR5rR0RcQS8wpSKd7CZ3R2hFh+kzUzGcjX7M/p7OkL9jduJ8Trdn2ivr6eWltbaW9vj7LZrPY3DKGc9vZ2Ki8vp4mJCVpdXbXrM3+JSVRaIx+yv7MroKOjgxobG6mlpYV6enqooqIiFIiuri6qqanR8k+lUrJHn4hYpSCPZUNsNHryaCwWo+7ubqUwOkRZWdnxb/v7+05D82MZSC/7pizl5OQkHR4eHv9fW1urDAYQnZ2dFojx8XGnZDdFzBaQh04z9srKCo2NjSmHqaur0yDQJ3QdHBzQ0NAQbW1tlVoBPDSDnGdfLVXo8vKy9pZUwcTjca05mSEGBwdpc3PTTRaI+SMjyG23666lpSVLlQPGHJAbCLyAABB6/F8aQW55eZN2MHaBeYVAc/IAYZwuNBDs7C56Tb24uOgLxu6ZYrGoQWxsbPjpZtiopaJBZnDAYNIq1e6dmiAg0Jx8Qui6HBV7bN9aWFiwwGAkMgdsNygErAmjPo6KqqGgMJhnZMOqDGJ4eJgKhYKK+fQCXlmbipzm5+e1v21tbZbZurq62hZifX1d1cIgBZAPVOUGmEgk8s4aCTVjVAgQ2pIFTateZY5zc3Pa6thOIUFo7ytKIQiB2i34tre3/cwTrmdGpTnrK2O74RdDMwYA40pakd4ixxVVuWEfAYjKypPdqHFdBjU0NGgDgGKYdeQ2qQoCGy4zxMjICOXzeQuM4prJIqexMCHW1tZoZmbGApNIJCidTquCySCX12E0p9HRUQ1CF2Cmpt49o8bWWRHMG+Twp9/UmOgAUVVVZYGwOTSg6enpsGBeIjW+T4z4gUBzcgthhIEVwozrfQT6QQVEJpNxhNCFWpHBYGXgUb8YN1YAKbpJheDtmhMgsK93K8Cg3wSEQczfG0Hy4oi0JARqAjVihMChhBcIXRjJzDBNTU1eYBBzznyK8hXi8gOBQwm/Aszs7KwFBgeCJYRYH9kdB/3D/kmWKplMKofQlcvlLDDNzc3aNsBBiPVf2UnjA3ah1EkjILBfVwHhBONw0lgQsR7LvLLD7qjfrmYwyuhnslim++kTbmB2dna0To/8sVqWqF/EenJaJ/nOjkPiu3Q29dQuNtkMdD/IjB+iENM92X7ETrviOPLVGYJ4JWLa9QKibejo5NvdaUv/lrnttEN03HmJt/D0lPvEVREL+QXRmxk61zXZ0BySUNZ1Ufaumz27W/1KR7d+njutABToUJSBsl54OXzwIsyAuF7RK8CKCgGKIs9eUYan2dbvNac3oqnp15zwGeyiz7xG2T9SwGtOEYUXzwCFi2ef0tF5cpKOLp7FDQOHfvEM5wR/09HFs2kVhf8vwAD7xQ5smiymBwAAAABJRU5ErkJggg==";

    var __instance:H5alipaySupport;

    function getInstance():H5alipaySupport {
        if(__instance == null) {
            __instance = new H5alipaySupport();
        }
        return __instance;
    }

    export function alipayPop(ifr_src:string="",close_btn_src:string = ""):void {
        getInstance().alipayPop(ifr_src,close_btn_src);
    }

    export function alipayClose(release:boolean=true):void {
        getInstance().alipayClose(release);
    }



    export class H5alipaySupport {

        private IFR_NAME:string = "alipyFrame";
        private IMG_NAME:string = "closeBtn";

        private ifr:any;
        private closeBtn:any;

        constructor(){}

        /**
         * 显示alipay的支付界面
         * @param ifr_src               支付地址 @刘选择 的api地址
         * @param close_btn_src         半闭按钮的图片地址 默认是盗的图地址
         */
        alipayPop(ifr_src:string="",close_btn_src:string = ""):void {
            if(document == null) return;

            if(close_btn_src == "") close_btn_src = DEFAULT_CLOSE_IMG;

            this.ifr = document.getElementById(this.IFR_NAME);
            if(this.ifr == null) {
                this.ifr = document.createElement("iframe");
            }

            this.closeBtn = document.getElementById(this.IMG_NAME);
            if(this.closeBtn == null) {
                this.closeBtn = document.createElement("img");
            }

            this.ifr.src = ifr_src;
            this.ifr.style = "position: fixed; width: 100%; height: 100%; z-index: 2147483647; top: 0px; right: 0px; background: rgba(0, 0, 0, 0.2)";

            this.closeBtn.src = close_btn_src;
            this.closeBtn.style = "position: fixed; width: 25px; height: 25px; top: 4px; z-index: 2147483647; right: 20px; background-size: 100%; background-repeat: no-repeat";

            document.body.appendChild(this.ifr);
            document.body.appendChild(this.closeBtn);

            this.closeBtn.onclick = (ev:MouseEvent)=> {
                this.alipayClose(true);                
            }
        }

        /**
         * 关闭alipay充值界面
         * @param release  是否析构界面默认为 true
         */
        alipayClose(release:boolean = true):void {

            if(document == null) return;

            if(this.ifr) {
                if(this.ifr.parentElement != null) {
                    this.ifr.parentElement.removeChild(this.ifr);
                }
            }

            if(this.closeBtn) {
                if(this.closeBtn.parentElement != null) {
                    this.closeBtn.parentElement.removeChild(this.closeBtn);
                }
            }

            if(release) {
                this.ifr = this.closeBtn = null;
            }
        }
    }
}