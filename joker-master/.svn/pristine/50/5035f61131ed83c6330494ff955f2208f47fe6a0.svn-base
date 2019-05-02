/**
 *
 * @author 
 *
 */
class BrowserUserExecutor {
	public constructor() {
	}
	
    public login(): void {
        alert("login");
    }
    
    public callFunctionArray(functionName: string,array: string[]): void {
        var josnList = [];
        for(var i = 0;i < array.length;i++) {
            josnList.push(array[i]);
        }

        var json = JSON.parse("{}");
        json.functionName = functionName;
        json.args = josnList;
        var msg = JSON.stringify(json);

        alert(msg);
    }
}
