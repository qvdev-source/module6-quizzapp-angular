import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {Quiz} from "../models/quiz";
import {Observable} from "rxjs";
const API_URL = `${environment.BASE_URL}/api/save-history`

@Injectable({
  providedIn: 'root'
})

export class QuizHistoryService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  addQuizHistory(quizHistory:any):Observable<any>{
    return this.http.post(`${API_URL}`,quizHistory,{headers:this.getHeaders})
  }
  public getHistoryQuizId(userId: string):Observable<any>{
return this.http.get(`${API_URL}/${userId}`,{headers:this.getHeaders})

  }




}
