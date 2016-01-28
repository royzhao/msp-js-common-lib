import {HttpIntercepter} from './http-intercepter.service';
import {UserService} from '../UserService/user.service';
import {Cookie} from '../CookieService/cookie.service';
import {it, describe, expect, inject, injectAsync, beforeEachProviders} from 'angular2/testing';
import {HTTP_PROVIDERS, Http, Response } from 'angular2/http';
describe('HttpIntercepter', () => {
    beforeEachProviders(() => [
        HttpIntercepter,
        HTTP_PROVIDERS,
        UserService,
        Cookie
    ]);
    it('HttpIntercepter',inject([HttpIntercepter,Http,UserService,Cookie], (httpIntercepter:HttpIntercepter) => {
        httpIntercepter.callHttp();
    }));
})