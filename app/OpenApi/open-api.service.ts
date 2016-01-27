import {Injectable} from 'angular2/core';
import {HttpIntercepter} from '../HttpIntercepter/http-intercepter.service';


@Injectable()
export class OpenApi {
	constructor(private _service: HttpIntercepter) {
	}
    callOpenApi(){
        this._service.callHttp();
    }
}