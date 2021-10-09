import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {QuestionService} from "../../services/question.service";
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Role} from "../../models/role";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  currenUser: User = new User;

  qId:string;
  qTitle:string;
  questions:any;

  constructor(private _route:ActivatedRoute,
              private _question:QuestionService,
              private authenticationService : AuthenticationService,
              private snack : MatSnackBar) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      // console.log(data);
      this.questions=data;
    },error => {
      console.log(error);
    })
  }
  isAdmin() {
    return this.currenUser?.role === Role.ADMIN;
  }

  deleteQuesion(qid: any) {
    Swal.fire({
      icon:"info",
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure , want to delete this question ?'
    }).then((result)=>{
      if (result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            this.snack.open('Question Deleted','',{
              duration:3000
            });
            // @ts-ignore
            this.questions = this.questions.filter((q)=>q.quesId != qid);
          },error => {
            this.snack.open('Error in deleting questions','',{
              duration:3000
            });
            console.log(error);
          }
        );
      }
    })

  }
}
