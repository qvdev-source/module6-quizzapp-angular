import { Injectable } from '@angular/core';
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {templateJitUrl} from "@angular/compiler";
const API_URL =`${environment.BASE_URL}/api/user`
const API_MAKEADMIN = `${environment.BASE_URL}/api/makeadmin`

@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  public getAllUser() : Observable<any>{
    return this.http.get(`${API_URL}/show-all`,{headers:this.getHeaders});
  }
  public deleteUser(id:number){
    return this.http.delete(`${API_URL}/${id}`,{headers:this.getHeaders})
  }


  public makeAdmin(username:string) {
    return this.http.put(`${API_MAKEADMIN}/makeadmin/${username}`,username,{headers:this.getHeaders});
  }

  public makeUser(username:string) {
    return this.http.put(`${API_MAKEADMIN}/makeuser/${username}`,username,{headers:this.getHeaders});
  }


}
