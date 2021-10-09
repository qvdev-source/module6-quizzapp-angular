import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import Swal from "sweetalert2";
import {Category} from "../../models/category";
import {Quiz} from "../../models/quiz";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {Role} from "../../models/role";

@Component({
  selector: 'app-view-quizz',
  templateUrl: './view-quizz.component.html',
  styleUrls: ['./view-quizz.component.css']
})
export class ViewQuizzComponent implements OnInit {
  quizzes : Array<Quiz>=[];
  currenUser: User = new User;

  constructor(private  quiz:QuizService,
              private authenticationService : AuthenticationService,
              private router : Router) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });
    this.quiz.getAllQuiz().subscribe((data:any)=>{
      this.quizzes = data;
      console.log(this.quizzes)
    },error => {
      console.log(error);
      Swal.fire('Error!!', ' Error in loading data !','error')
    })
  }
  isAdmin() {
    return this.currenUser?.role === Role.ADMIN;
  }


  deleteQuiz(qId: number) {

    Swal.fire({
      icon:"info",
      title: " Are you sure ?",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then(result=>{
      if (result.isConfirmed){
        this.quiz.deleteQuiz(qId).subscribe(data=>{
          this.quizzes = this.quizzes.filter(quiz=> quiz.qId != qId);
          Swal.fire('Success','Quiz Deleted','success');

        },error => {
          Swal.fire('Error','Error in deleteing quiz','error')
        })
      }
    })

  }

  startQuiz(qId: any) {
    Swal.fire({
      title:'Do you want to start the quiz?',
      // showDenyButton: true,
      showCancelButton:true,
      confirmButtonText:'Start',
      denyButtonText:'Dont save',
      icon:"info"
    }).then((result)=>{
      if (result.isConfirmed){

        this.router.navigate(['/start-quiz/'+qId])


      }else if (result.isDenied){
        Swal.fire('Change are not saved','','info')
      }
    })

  }
}
