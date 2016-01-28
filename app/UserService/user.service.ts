import {Injectable} from 'angular2/core';
import {Cookie} from '../CookieService/cookie.service';

/*
constant var
*/
var USER_TOKEN = "token";

@Injectable()
export class UserService {
    constructor(private _storage: Cookie) {
	}
    isLogin(){
        if(this._storage.getCookie(USER_TOKEN)){
            console.log(this._storage.getCookie(USER_TOKEN));
            return true;
        }else{
            return false;
        }
    }
    logout(){
        this._storage.deleteCookie(USER_TOKEN);
    }
    getUserToken(){
        return this._storage.getCookie(USER_TOKEN);
    }
}