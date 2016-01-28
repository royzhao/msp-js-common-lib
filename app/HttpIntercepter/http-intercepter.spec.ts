import {HttpIntercepter} from './http-intercepter.service';
import {UserService} from '../UserService/user.service';
import {Cookie} from '../CookieService/cookie.service';
import {it, describe, expect, inject, injectAsync, beforeEachProviders} from 'angular2/testing';
import {HTTP_PROVIDERS, Http, Response } from 'angular2/http';
describe('HttpIntercepter', () => {
    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        UserService,
        Cookie
    ]);
    it('HttpIntercepter',inject([Http,UserService,Cookie], (http:Http,userService:UserService) => {
        var httpIntercepter = new HttpIntercepter(http,userService);
        httpIntercepter.callHttp();
    }));
})