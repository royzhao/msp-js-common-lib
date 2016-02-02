import {Component,Injectable} from 'angular2/core';
import {Http,Headers,RequestOptionsArgs,RequestOptions} from 'angular2/http';
import {Observable,Subscription} from "rxjs/Rx";
import {UserService} from '../UserService/user.service';

var apiServiceUrlRoot = '/';
@Injectable()
export class HttpIntercepter {
    constructor(
        private _http: Http,
        private _userService: UserService) {}
    private constructHeader(): Headers{
        var headers:Headers = new Headers();
        headers.append("x-session-token",this._userService.getUserToken());
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    private constructRequestData(method:string,data:any): RequestOptionsArgs{
        var args:RequestOptionsArgs = new RequestOptions({
            headers:this.constructHeader(),
            method:method,
            body:(data==undefined? null:JSON.stringify(data))
        });
        return args;
    }
    private isNeedCheckAuth(method:string): boolean{
        if(
            method == "POST"||
            method == "PUT" ||
            method == "DELETE"
        ){
            return true;
        }
        return false;
    }
    public callApi(url:string,method:string,data?:any):Observable<any>{
        if(this.isNeedCheckAuth(method)){
            //is login?
            if(this._userService.isLogin() == false){
                //error need login
            }
        }
        return this._http.request(url,this.constructRequestData(
            method,
            data
        ))
        .map(res => {
            //TODO do something object convert 
          return res;  
        })
        .catch(err => {
            //TODO handler exception
            console.log(err.json());
            return Observable.throw(err);
        })
    }
    callHttp(url?:string,method?:string,data?:any){
        this._http.get('tsd.json')
        .subscribe(res => {
            console.log(res);
        });
        this._http.request('/api/user/code/6',this.constructRequestData(
            "POST",
            {name: "开放测试", description: "不要点开"}
        ))
        .map(res => res.json())

        .catch(err => {
        console.log(err.json());
        return Observable.throw(err);
        })
        .subscribe(
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