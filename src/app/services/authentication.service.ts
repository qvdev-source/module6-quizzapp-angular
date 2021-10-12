import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   userChangePassword = {

   }
   public currentUser : Observable<User>;
   private currenUserSubject : BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr);
    }
    this.currenUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currenUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currenUserSubject.value;
  }

  login(user : User):Observable<any>{
    return this.http.post<any>(API_URL + 'sign-in',user).pipe(
      map(response=>{
        if (response){
          localStorage.setItem('currentUser',JSON.stringify(response));
          this.currenUserSubject.next(response);
        }
        return response;
      })
    );
  }

  getUser() {
    return this.currenUserSubject.value;
  }

  register(user : User):Observable<any>{
    return this.http.post(API_URL + 'sign-up' , user);
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currenUserSubject.next(new User);
  }
  MathPassword(password:string,confirmPassword:string){

    // @ts-ignore
    return( formgroup: FormGroup) =>{
      const passwordControl=formgroup.controls[password];
      const confirmPasswordControl=formgroup.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordControl){
        return null
      }
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch){
        return  null
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
    }


  changePassword(){

  }



}
