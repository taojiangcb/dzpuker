module appvos {

	export class GameConfigVO {

		public gcId: number;//模块ID

		public gcValue: number;//对应模块的值

		public business: number;//对应渠道的值

		public constructor(data: any = null) {
			if (data != null) {
				var vo: any = AppGlobal.getMessage("GameConfigVO").decode(data);
                this.setData(vo);
            }
		}
		public setString(str: string): void {
			var vo: any = AppGlobal.getMessage("GameConfigVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
		}
		public setData(vo: any): void {
			if (vo == null) {
                return;
            }

            this.gcId = vo.gcId == null ? 0 : vo.gcId.toNumber();

			this.gcValue = vo.gcValue == null ? 0 : vo.gcValue.toNumber();

			this.business = vo.business == null ? 0 : vo.business.toNumber();
            return vo;
        }
	}
}

