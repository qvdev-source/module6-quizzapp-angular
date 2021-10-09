import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {RequestBaseService} from "./request-base.service";
const API_URL = `${environment.BASE_URL}/api/question`

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  public getQuestionsOfQuiz(qid:any){
    return this.http.get(`${API_URL}/quiz/${qid}`);
  }

  public addQuestionOfQuiz(question:any){
    return this.http.post(`${API_URL}`,question,{headers:this.getHeaders})
  }

  public deleteQuestion(quesId:any){
    return this.http.delete(`${API_URL}/${quesId}`,{headers:this.getHeaders})
  }

}
