import {HttpIntercepter} from './http-intercepter.service';
import {UserService} from '../UserService/user.service';
import {Cookie} from '../CookieService/cookie.service';
import {it, describe, expect, inject, injectAsync, beforeEachProviders} from 'angular2/testing';
import {HTTP_PROVIDERS, Http, Response,BaseRequestOptions ,XHRBackend} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {provide,Injector} from 'angular2/core';

describe('HttpIntercepter', () => {
    // beforeEachProviders(() => [
    //     HttpIntercepter,
    //     HTTP_PROVIDERS,
    //     UserService,
    //     BaseRequestOptions,
    //     Cookie
    // ]);

    // it('HttpIntercepter',inject([HttpIntercepter,Http,UserService,Cookie], (httpIntercepter:HttpIntercepter) => {
    //     httpIntercepter.callHttp();

    // }));
    
    
    it('should get a response', () => {
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
            // bind(Http).toFactory((backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            //         return new Http(backend, defaultOptions);
            //     }, [
            //         MockBackend,
            //         BaseRequestOptions
            //     ]),
        ]);
        var backend = injector.get(MockBackend);
        var http = injector.get(Http);
        backend.connections.subscribe(c => connection = c);
        // http.request('something.json').subscribe(res => {
        //     text = res.text();
        // });
        var httpIntercepter = injector.get(HttpIntercepter);
        httpIntercepter.callApi('test.json','GET').subscribe(res =>{
            text = res.text();
        })
        connection.mockRespond(new Response({body: 'Something'}));
        expect(text).toBe('Something');
    });
})

