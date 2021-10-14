import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = `${environment.BASE_URL}/api/user/resetpassword`

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) {
  }

  public resetPassword(userEmail:any) : Observable<any> {
    return this.http.post(`${API_URL}`,userEmail)
  }
}
