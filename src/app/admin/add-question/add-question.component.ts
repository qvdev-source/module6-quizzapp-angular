import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  // question: Question = new Question();
  question={
    quiz:{
    },
    image:'',
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
    if (this.question.answer.trim()==''|| this.question.answer==null){
      return;
    }
    this._question.addQuestionOfQuiz(this.question).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Question is Add!',
        footer: '<a [routerLink]="">Why do I have this issue?</a>'

      })
      this.router.navigate(['/view-questions/'+ this.qId +'/'+this.qTitle])
    },error => {
      Swal.fire('Error','Error in adding question',error);
    })


  }
}
