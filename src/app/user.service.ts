import { Injectable } from "@angular/core";
import { Userwrite } from "./Userwrite";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class UserService {
  constructor(private http:HttpClient,){
  }

  getAll():Observable<any>{
    return this.http.get(`/users/`,{observe:'response'}) //users 가져올때
   

  }

  create(userwrite: Userwrite): Observable<any>{
    return this.http.post(`/boards/board/`, JSON.stringify(userwrite),{observe:'body', withCredentials: true})
  }

  updated(id:number,userwrite:Userwrite):Observable<any>{
    return this.http.put(`/boards/board/`+id, JSON.stringify(userwrite),{observe:'body', withCredentials: true})
  }

  delete(id:string,uuid:string){
    const params = new FormData();
    params.append('id', id);
    params.append('uuid', uuid);
    return this.http.delete(`/boards/board/delete_file/`+ params, {observe:'body' , withCredentials:true})
  }
}
