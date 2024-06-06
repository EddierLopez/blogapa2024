import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Observable } from "rxjs";
import { Post } from "../models/post";
@Injectable({
    providedIn:'root'
})export class PostService{
    public url:string
    constructor(
        private _http:HttpClient
    ){
        this.url=server.url
    }
    getPosts():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        let options={
            headers
        }
        return this._http.get(this.url+'post',options)
    }
    getPost(id:number):Observable<any>{
        return this._http.get(this.url+'post/'+id)
    }
    createPost(post:Post,token:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
            .set('bearertoken',token)
        let options={
            headers
        }
        let data='data='+JSON.stringify(post)
        return this._http.post(this.url+'post',data,options)
    }
    uploadImage(data:any,token:any):Observable<any>{
        let headers=new HttpHeaders().set('bearertoken',token)
        return this._http.post(this.url+'post/upload',data,{headers})

    }

}