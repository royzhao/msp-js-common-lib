import {Injectable} from 'angular2/core';
import {Cookie} from '../CookieService/cookie.service';

/*
constant var
*/
var USER_TOKEN = "_user_token";

@Injectable()
export class UserService {
    constructor(private _storage: Cookie) {
        _storage.setCookie(USER_TOKEN,'0bc113ed3e690e4a35729eb753bce314');
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
	getHeroes(){
		//return Promise.resolve(''HEROES'');
	}
	getHeroById(id:number|string){
		// return this.getHeroes()
		// 	.then(heroes => heroes.filter(h => h.id === +id)[0]);
	}
	getHeroesSlowly(){
		// return new Promise<Hero[]>(resolve=>
		// 	setTimeout(()=>resolve(HEROES),2000));
	}
}