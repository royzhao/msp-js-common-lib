import {Component}     from 'angular2/core';


import {HttpIntercepter} from './HttpIntercepter/http-intercepter.service';
import {OpenApi} from './OpenApi/open-api.service';
import {UserService} from './UserService/user.service';
import {Cookie} from './CookieService/cookie.service';


@Component({
  selector: 'my-app',
  template:`
  <h1>Component Router</h1>

  <router-outlet></router-outlet>
  

    `,
    styles:[`
`],
  providers: [OpenApi,HttpIntercepter,Cookie,UserService]
})
export class AppComponent{
	
}
