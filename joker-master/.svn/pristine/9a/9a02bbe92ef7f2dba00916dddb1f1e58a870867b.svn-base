module happy {
	/**
	 *
	 * @author 
	 *
	 */
    export class HappyStatItem extends eui.ItemRenderer {

        icon1:eui.Image;
        icon2:eui.Image;
        icon3:eui.Image;
        icon4:eui.Image;

        typeIcon:eui.Image;
        public constructor() {
            super();
            this.skinName = "HappyStatItemSkin"
        }
        dataChanged(): void {
             if(this.itemIndex<1)
                {
                    this.typeIcon.source ="icon_main_zx_png"
                }
            if (this.data) {
                var a:number= this.data;
                if((a&1)==1)
                {
                    this.icon1.source ="icon_happy_s_png"
                }else{
                    this.icon1.source ="icon_happy_p_png"
                }
                if((a&2)==2)
                {
                    this.icon2.source ="icon_happy_s_png"
                }else{
                    this.icon2.source ="icon_happy_p_png"
                }

                if((a&4)==4)
                {
                    this.icon3.source ="icon_happy_s_png"
                }else{
                    this.icon3.source ="icon_happy_p_png"
                }

                if((a&8)==8)
                {
                    this.icon4.source ="icon_happy_s_png"
                }else{
                    this.icon4.source ="icon_happy_p_png"
                }
            }
        }
    }
}
