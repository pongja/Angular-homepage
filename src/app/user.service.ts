import { ErrorHandler, Injectable } from "@angular/core";
import { baseUrl } from "src/environments/environment";
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
    return this.http.get(`${baseUrl}/users/`,{observe:'response'}) //users 가져올때
   

  }

  create(userwrite: Userwrite): Observable<any>{
    return this.http.post(`${baseUrl}/boards/board/`, JSON.stringify(userwrite),{observe:'body', withCredentials: true})
  }

  updated(id:number,userwrite:Userwrite):Observable<any>{
    return this.http.put(`${baseUrl}/boards/board/`+id, JSON.stringify(userwrite),{observe:'body', withCredentials: true})
  }

  delete(id:string,uuid:string){
    const params = new FormData();
    params.append('id', id);
    params.append('uuid', uuid);
    return this.http.delete(`${baseUrl}/boards/board/delete_file/`+ params, {observe:'body' , withCredentials:true})
  }
}
