import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestBaseService} from "./request-base.service";
import {environment} from "../../environments/environment";
const API_URL = `${environment.BASE_URL}/api/authentication/change-password`
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService  extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  changePassword(userChangePassword:any): Observable<any> {
    return this.http.post(API_URL,userChangePassword,{headers : this.getHeaders});
  }
}
