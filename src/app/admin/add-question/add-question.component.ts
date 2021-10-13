import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {QuestionService} from "../../services/question.service";
import Swal from "sweetalert2";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  qId:any;
  qTitle:any;
  question={
    quiz:{

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(private _route:ActivatedRoute,
              private _question:QuestionService,
              private router : Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    // @ts-ignore
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit() {
    if (this.question.content.trim()==''|| this.question.content==null){
      return;
    }

    if (this.question.option1.trim()==''|| this.question.option1==null){
      return;
    }
    if (this.question.option2.trim()==''|| this.question.option2==null){
      return;
    }
    if (this.question.option3.trim()==''|| this.question.option3==null){
      return;
    }
    if (this.question.option4.trim()==''|| this.question.option4==null){
      return;
    }
    if (this.question.answer.trim()==''|| this.question.answer==null){
      return;
    }
    this._question.addQuestionOfQuiz(this.question).subscribe((data:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a [routerLink]="">Why do I have this issue?</a>'
      })
      this.question.content="";
      this.question.option1="";
      this.question.option2="";
      this.question.option3="";
      this.question.option4="";
      this.question.answer="";
      this.router.navigate(['/profile'])
    },error => {
      Swal.fire('Error','Error in adding question',error);
    })


  }
}
