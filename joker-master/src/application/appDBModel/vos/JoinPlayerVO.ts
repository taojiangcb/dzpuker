module appvos {

	export class JoinPlayerVO {
		
		
		public roleId: number;//ID

		public name: string;//名称

		public sex: number;//性别

		public avatarID: string;//头像

		public vipLevel: number;//VIP

		public totalBringBet: number;//总带入

		public nowBet: number;//当前筹码

		
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("JoinPlayerVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();

			this.name =vo.name==null?"": FormatUtils.protoToGBK(vo.name);

			// this.sex = vo.sex;

			// this.avatarID = vo.avatarID;

			// this.vipLevel = vo.vipLevel;

			// this.totalBringBet = vo.totalBringBet;

			// this.nowBet = vo.nowBet;

			vo = null;
		}
		
	}
}
