import {Injectable} from 'angular2/core';
import {Observable,Subscription} from "rxjs/Rx";
import {HttpIntercepter} from '../HttpIntercepter/http-intercepter.service';
import {ResponseConvert2Object} from '../Type/convert-response.interface';
import {list} from '../Type/list';
import {Code,CodeAll,CodeDetail,CodeStepCmd,CodeStep} from '../Type/code-all';
import {RunInfo,RunRes} from '../Type/run-all';
import {Issue,Comment} from '../Type/issue';


var baseUrl = ' ';

@Injectable()
export class OpenApi {
	constructor(private _service: HttpIntercepter) {
	}
    
    //code api
    
    getCodesByUser(userid:number,page:number,num:number,key?:string):Observable<any>{
        return this._service.callApi(
            baseUrl+"/user/code/"+userid+"?page="+page+"&num="+num+"&key="+key,
            "GET",
            null
        );
    };
    getCodeById(id:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+id,
            "GET",
            null
        );
    };
    addCode2User(userid:number,codeinfo:Code):Observable<any>{
        return this._service.callApi(
            baseUrl+"/user/code/"+userid,
            "POST",
            null,
            codeinfo
        );
    };
    updateCode(userid:number,codeinfo:Code):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeinfo.id,
            "PUT",
            null,
            codeinfo
        );

    };
    deleteCode(userid:number,codeid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid,
            "DELETE"
        );

    };
    getCodeSteps(codeid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+codeid+"/step",
            "GET"
        );
    };
    getCodeStepById(codeid:number,stepid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+codeid+"/step/"+stepid,
            "GET"
        );
    };
    addCodeStep(userid:number,codeid:number,codestep:CodeStep):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/step",
            "POST",
            null,
            codestep
        );

    };
    updateCodeStepCmd(userid:number,codeid:number,stepid:number,data:Array<CodeStepCmd>):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid+"/cmd",
            "PUT",
            null,
            data
        )
    };
    updateCodeStep(userid:number,codeid:number,stepid:number,codestep:CodeStep):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
            "PUT",
            null,
            codestep
        );

    };
    deleteCodeStep(userid:number,codeid:number,stepid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
            "DELETE"
        );

    };
    getCodeStepDetail(codeid:number,stepid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+codeid+"/step/"+stepid+"/detail",
            "GET"
        );
    };
    updateCodeStepDetail(userid:number,codeid:number,stepid:number,codestepdetail:CodeDetail):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid+"/detail",
            "PUT",
            null,
            codestepdetail
        );

    };
    coderun(imageid:number,runinfo:RunInfo):Observable<any>{
        return this._service.callApi(
            baseUrl+"/coderun/"+imageid,
            "PUT",
            null,
            runinfo
        );

    };
    coderunRes(runid:string):Observable<any>{
        return this._service.callApi(
            baseUrl+"/coderun/"+runid,
            "GET"
        );

    };
    updateCodeStar(userid:number,codeid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/star/"+userid+"/"+codeid,
            "PUT",
            null,
            {userid:userid,codeid:codeid}
        );
    };
    getHotCodes(page:number,num:number,key?:string):Observable<any>{
        if(page <=0){
            page = 1;
        }
        if(num <=0){
            num = 5;
        }
        if(key == undefined || key == null){
            key = "";
        }
        return this._service.callApi(
            baseUrl+"/code?page="+page+"&num="+num+"&key="+key,
            "GET"
        );
    };
    getCodeIssues(codeid:number,page:number,num:number,key?:string):Observable<any>{
        if(page <=0){
            page = 1;
        }
        if(num <=0){
            num = 5;
        }
        if(key == undefined || key == null){
            key = "";
        }
        return this._service.callApi(
            baseUrl+"/code/"+codeid+"/issues?page="+page+"&num="+num+"&key="+key,
            "GET"
        );
    };
    addCodeIssue(userid:string,codeid:string,obj:Issue):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/issue",
            "POST",
            null,
            obj
        );
    };
    updateCodeIssue(userid:number,codeid:number,issueid,obj:Issue):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/issue/"+issueid,
            "PUT",
            null,
            obj
        );
    };
    deleteCodeIssue(userid:number,codeid:number,issueid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/code/"+userid+"/"+codeid+"/issue/"+issueid,
            "DELETE"
        );
    };
    getIssuesComments(issueid:number,page:number,num:number,key?:string):Observable<any>{
        if(page <=0){
            page = 1;
        }
        if(num <=0){
            num = 5;
        }
        if(key == undefined || key == null){
            key = "";
        }
        return this._service.callApi(
            baseUrl+"/issue/"+issueid+"/comments?page="+page+"&num="+num+"&key="+key,
            "GET"
        );
    };
    addCodeIssueComment(userid:number,issueid:number,obj:Comment):Observable<any>{
        return this._service.callApi(
            baseUrl+"/issue/"+userid+"/"+issueid+"/comment",
            "POST",
            null,
            obj
        );
    };
    updateCodeIssueComment(userid:number,issueid:number,commentid:number,obj:Comment):Observable<any>{
        return this._service.callApi(
            baseUrl+"/issue/"+userid+"/"+issueid+"/comment/"+commentid,
            "PUT",
            null,
            obj
        );
    };
    deleteCodeIssueComment(userid:number,issueid:number,commentid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/issue/"+userid+"/"+issueid+"/comment/"+commentid,
            "DELETE"
        );
    };
    getImageIssues(imageid:number,page:number,num:number,key?:string):Observable<any>{
        if(page <=0){
            page = 1;
        }
        if(num <=0){
            num = 5;
        }
        if(key == undefined || key == null){
            key = "";
        }
        return this._service.callApi(
            baseUrl+"/image/"+imageid+"/issues?page="+page+"&num="+num+"&key="+key,
            "GET"
        );
    };
    addImageIssue(userid:number,imageid:number,obj:Issue):Observable<any>{
        return this._service.callApi(
            baseUrl+"/image/"+userid+"/"+imageid+"/issue",
            "POST",
            null,
            obj
        );
    };
    updateImageIssue(userid:number,imageid:number,issueid:number,obj:Issue):Observable<any>{
        return this._service.callApi(
            baseUrl+"/image/"+userid+"/"+imageid+"/issue/"+issueid,
            "PUT",
            null,
            obj
        );
    };
    deleteImageIssue(userid:number,imageid:number,issueid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/image/"+userid+"/"+imageid+"/issue/"+issueid,
            "DELETE"
        );
    };
    getImageIssuesComments(issueid:number,page:number,num:number,key?:string):Observable<any>{
        if(page <=0){
            page = 1;
        }
        if(num <=0){
            num = 5;
        }
        if(key == undefined || key == null){
            key = "";
        }
        return this._service.callApi(
            baseUrl+"/image/issue/"+issueid+"/comments?page="+page+"&num="+num+"&key="+key,
            "GET"
        );
    };
    addImageIssueComment(userid:number,issueid:number,obj:Comment):Observable<any>{
        return this._service.callApi(
            baseUrl+"/image/issue/"+userid+"/"+issueid+"/comment",
            "POST",
            null,
            obj
        );
    };
    updateImageIssueComment(userid:number,issueid:number,commentid:number,obj:Comment):Observable<any>{
        return this._service.callApi(
            baseUrl+"/image/issue/"+userid+"/"+issueid+"/comment/"+commentid,
            "PUT",
            null,
            obj
        );
    };
    deleteImageIssueComment(userid:number,issueid:number,commentid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/image/issue/"+userid+"/"+issueid+"/comment/"+commentid,
            "DELETE"
        );
    };
    getUserInfoById(userid:number):Observable<any>{
        return this._service.callApi(
            baseUrl+"/user/info/get/"+userid,
            "GET"
        );
    };
}