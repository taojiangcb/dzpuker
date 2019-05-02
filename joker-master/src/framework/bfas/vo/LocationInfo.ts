module mc2sdk {
	
	export class LocationInfo {
		
		
		lng:number = 0.0;
		
		lat:number = 0.0;
		
		LocationInfo() {
			
		}
		
		toArray():any[] {
			return [this.lng, this.lat];
		}
	}
}