import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {Quiz} from "../models/quiz";
const API_URL = `${environment.BASE_URL}/api/quiz`
@Injectable({
  providedIn: 'root'
})
export class QuizService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  getAllQuiz(): Observable<any> {
    return this.http.get(API_URL);
  }

  addQuiz(quiz:Quiz):Observable<any>{
    return this.http.post(`${API_URL}`,quiz,{headers:this.getHeaders})
  }

  deleteQuiz(qId:any){
    return this.http.delete(`${API_URL}/${qId}`,{headers:this.getHeaders})
  }

  getQuiz(qid:any){
    return this.http.get(`${API_URL}/${qid}`)
  }

  updateQuiz(quiz:any){
    return this.http.put(`${API_URL}`,quiz,{headers:this.getHeaders});
  }


}
