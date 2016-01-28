import {Component,Injectable} from 'angular2/core';
import {Http,Headers,RequestOptionsArgs,RequestOptions} from 'angular2/http';
import {UserService} from '../UserService/user.service';

@Injectable()
export class HttpIntercepter {
    constructor(
        private _http: Http,
        private _userService: UserService) {}
    private constructHeader(){
        var headers:Headers = new Headers();
        headers.append("x-session-token",this._userService.getUserToken());
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    private constructRequestData(method:string,data:any){
        var args:RequestOptionsArgs = new RequestOptions({
            headers:this.constructHeader(),
            method:method,
            body:JSON.stringify(data)
        });
        return args;
    }
    callHttp(url?:string,method?:string,data?:any){
        this._http.get('tsd.json')
        .subscribe(res => {
            console.log(res);
        });
        this._http.request('http://local.learn4me.com:9000/api/user/code/6',this.constructRequestData(
            "POST",
            {name: "开放测试", description: "不要点开"}
        )).subscribe(
            res =>{
                console.log(res);
            },
            err =>{
                console.log(err);
            },
            () =>{
                console.log("complete");
            }
        )
        
    if(this._userService.isLogin()){
        console.log('ok');
    }
        console.log("httpIntercepter!");

    }
}