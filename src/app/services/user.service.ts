import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { User } from "../models/user";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UserService{
    private urlAPI:string
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url
    }

    login(user:User):Observable<any>{
        let userJson=JSON.stringify(user);
        let params='data='+userJson
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        let options={
            headers
        }
        return this._http.post(this.urlAPI+'user/login',params,options)

    }
    getIdentityFromAPI():Observable<any>{
        let headers;
        let bearerToken=sessionStorage.getItem('token');
        if(bearerToken){
            headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                    .set('bearertoken',bearerToken);            
        }else{
            headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
        }
        let options={
            headers
        }
        return this._http.get(this.urlAPI+'user/getidentity',options);
        
    }
    create(user:User):Observable<any>{
        let userJson=JSON.stringify(user);
        let params='data='+userJson;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        let options={
            headers
        }
        return this._http.post(this.urlAPI+'user/signup',params,options);
    }
    getIdentityFromStorage(){
        let identity=sessionStorage.getItem('identity')
        if(identity){
            
            return JSON.parse(identity)
        }
        return null
    }
    getToken(){
        return sessionStorage.getItem('token')        
    }
}