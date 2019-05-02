module appvos {

	export class FeedbackVO {
    	
        public id:number ;
        
        public roleId:number;// 举报人
        
        public roleName:string;// 举报人
    	
        public feedbackRoleIds: string;//被举报人  ，号连接

        public feedbackRoleNames: string;//被举报人  ，号连接
    	
        public context: string;//举报内容
    	
    	public qq: string;//联系方式
    	
    	public phone: string;//联系方式
		
        public status: number;//公状态
        
		public video: PlayCardsVideoVO;//回放记录 
		
        public createTime: number;
		
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("FeedbackVO").decode(data);
                this.setData(vo);
            }
		}
		public setString(str:string): void{
			var vo: any = AppGlobal.getMessage("FeedbackVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
		}
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
            this.id = vo.id == null ? 0 : vo.id.toNumber();
            
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            
            this.roleName = vo.roleName;
            
            this.feedbackRoleIds = vo.feedbackRoleIds;
            
            this.feedbackRoleNames = vo.feedbackRoleNames;
            
            this.context = vo.context;
            
            this.qq = vo.qq;
            
            this.phone = vo.phone;
            
            this.status = vo.status;

            if(vo.video) {
                this.video = new PlayCardsVideoVO(vo.video);
            }
            
            this.createTime = vo.createTime == null ? 0 : vo.createTime.toNumber();
            
			vo = null;
		}
        toArrayBuffer(): ArrayBuffer {
            var vo: any = this.getProtoVO();
            return vo.toArrayBuffer();
        }
		getProtoVO(): any {
            var cls = AppGlobal.getMessage("FeedbackVO");
            var vo: any = new cls();
            
            vo.id = __SET_INT64(this.id);

            vo.roleId = __SET_INT64(this.roleId); 

            vo.roleName = this.roleName;

            vo.feedbackRoleIds = this.feedbackRoleIds;

            vo.feedbackRoleNames = this.feedbackRoleNames;

            vo.context = this.context;

            vo.qq = this.qq;

            vo.phone = this.phone;

            vo.status = this.status;

			if (this.video) vo.video = this.video.toArrayBuffer();
			
            vo.createTime = __SET_INT64(this.createTime);
            return vo;
        }
	}
}

