import { Injectable } from "@angular/core";
import { server } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})export class CategoryService{
    public url:string
    constructor(
        private _http:HttpClient
    ){
        this.url=server.url
    }
    getCategories():Observable<any>{
        const headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        const options={
            headers
        }
        return this._http.get(this.url+'category',options)
    }
    getCategory(id:number):Observable<any>{
        return this._http.get(this.url+'category/'+id)
    }
}