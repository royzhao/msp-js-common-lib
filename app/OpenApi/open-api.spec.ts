import {HttpIntercepter} from '../HttpIntercepter/http-intercepter.service';
import {OpenApi} from './open-api.service';
import {UserService} from '../UserService/user.service';
import {Cookie} from '../CookieService/cookie.service';
import {it, describe, expect, inject, injectAsync, beforeEachProviders} from 'angular2/testing';
import {HTTP_PROVIDERS, Http, Response,BaseRequestOptions ,XHRBackend,ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {provide,Injector} from 'angular2/core';
import {ResponseConvert2Object} from '../Type/convert-response.interface';

describe('open api test', () => {
    var connection; //this will be set when a new connection is emitted from the backend.

    var injector = Injector.resolveAndCreate([
        MockBackend,
        UserService,
        Cookie,
        HttpIntercepter,
        OpenApi,
        provide(
            Http, 
            {
                useFactory: (backend) =>{
                    return new Http(backend, new BaseRequestOptions());
                }, 
                deps: [MockBackend]
            }
        )
    ]);
    var backend = injector.get(MockBackend);
    var openApi:OpenApi = injector.get(OpenApi);
    
    backend.connections.subscribe(c => connection = c);

    
    it('get codes by user id ', () => {

        var convert2Object = function(source: Response): any{
            if(source == undefined){
                return null;
            }
            console.log("convert ok");
            return source;
        }
        var list;
        openApi.getCodesByUser(6,1,4).subscribe(
            res =>{
                list = res;
            },
            err =>{
                console.log(err);
            }
        )

        connection.mockRespond(
            new Response(
                new ResponseOptions(
                    {
                        body: {"list":[{"id":61,"create_date":"2015-09-21 10:00:04","name":"排序","description":"排序算法","user_id":6,"star":1},{"id":62,"create_date":"2015-09-29 16:33:46","name":"杂项","description":"记录一些看到的好算法","user_id":6,"star":1},{"id":60,"create_date":"2015-09-13 11:00:29","name":"js学习","description":"这里是js的学习","user_id":6,"star":0},{"id":64,"create_date":"2016-01-27 17:28:19","name":"开放测试","description":"不要点开","user_id":6,"star":0}],"total":4,"page":1,"num":5},
                        status:200
                    }
                )
            )
        );
        expect(list.num).toBe(5);
    });
    
    
    it('get code by code id ', () => {

        var code;
        openApi.getCodeById(61).subscribe(
            res =>{
                code = res;
            },
            err =>{
                console.log(err);
            }
        )

        connection.mockRespond(
            new Response(
                new ResponseOptions(
                    {
                        body: {"id":61,"create_date":"2015-09-21 10:00:04","name":"排序","description":"排序算法","user_id":6,"star":1},
                        status:200
                    }
                )
            )
        );
        expect(code.id).toBe(61);
    });
})

