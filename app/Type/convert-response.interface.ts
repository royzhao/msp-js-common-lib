import {Response} from 'angular2/http';


export interface ResponseConvert2Object {
  (source: Response): any;
}