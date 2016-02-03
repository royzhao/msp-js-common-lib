import {HttpIntercepter} from './http-intercepter.service';
import {UserService} from '../UserService/user.service';
import {Cookie} from '../CookieService/cookie.service';
import {it, describe, expect, inject, injectAsync, beforeEachProviders} from 'angular2/testing';
import {HTTP_PROVIDERS, Http, Response,BaseRequestOptions ,XHRBackend,ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {provide,Injector} from 'angular2/core';
import {ResponseConvert2Object} from '../Type/convert-response.interface';

describe('HttpIntercepter', () => {
    
    
    it('should get a right response', () => {
        var connection; //this will be set when a new connection is emitted from the backend.
        var text; //this will be set from mock response
        var injector = Injector.resolveAndCreate([
            MockBackend,
            UserService,
            Cookie,
            HttpIntercepter,
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
        var http = injector.get(Http);
        backend.connections.subscribe(c => connection = c);

        var httpIntercepter = injector.get(HttpIntercepter);
        var convert2Object = function(source: Response): any{
            if(source == undefined){
                return null;
            }
            console.log("convert ok");
            return source;
        }
        httpIntercepter.callApi('test.json','GET',convert2Object).subscribe(
            res =>{
                text = res;
            },
            err =>{
                text = err.message;
            }
        )

        connection.mockRespond(
            new Response(
                new ResponseOptions(
                    {
                        body: {data:'Something'},
                        status:401
                    }
                )
            )
        );
        expect(text.data).toBe('Something');
    });
})

