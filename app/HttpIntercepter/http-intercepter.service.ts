import {Component,Injectable} from 'angular2/core';
import {Http,Headers,RequestOptionsArgs,RequestOptions} from 'angular2/http';
import {Observable,Subscription} from "rxjs/Rx";
import {ResponseConvert2Object} from '../Type/convert-response.interface';
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
    public callApi(url:string,method:string,convertF?:ResponseConvert2Object,data?:any):Observable<any>{
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
            //TODO check is status  200
            switch(res.status){
                case 200:
                    return res.json();
                case 401:
                    //TODO to login
                    // window.alert("need login");
                    return Observable.throw(new Error('you don`t have the authorization! please login first '));
                    // return Observable.throw('you don`t have the authorization! please login first ');
                default:
                    return Observable.throw('somthing wrong ');
            }
        })
        .map(res=>{
             //TODO do something object convert 
            if(convertF == undefined){
                return res;
            }
            var dest = convertF(res);
            if( dest != undefined &&
                dest != null
            ){
                return dest;
            }else{
                return Observable.throw({err:'can`t convert to object'});
            }           
        })
        .catch(err => {
            //TODO handler exception
            console.log(err.json());
            return Observable.throw(err);
        })
    }
}