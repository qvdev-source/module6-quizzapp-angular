import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import Swal from "sweetalert2";
import {Quiz} from "../../models/quiz";
import {QuizService} from "../../services/quiz.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[{
    cid:'23',
    title:"AC",
    description:'ANMC'
  }];

  quizData=
    {
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:true,
      category:{
        cid: '',
      }
    }




  constructor(private cate : CategoryService,
              private _quiz:QuizService,
              private snack:MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  this.cate.getAllCategory().subscribe((data:any)=>{
    this.categories = data;
    console.log(this.categories);
  },error => {
    console.log(error);
    Swal.fire('Error loading data','','error');
  })
  }


  addQuiz() {
    console.log(this.quizData);
    if (this.quizData.title.trim() == '' || this.quizData.title==null){
      this.snack.open('Title Required !!','',{
        duration:3000,
      });
      return;
    }
    // @ts-ignore
    this._quiz.addQuiz(this.quizData).subscribe(data=>{
      Swal.fire('Success','quiz is added','success');
      // @ts-ignore
      this.quizData ={
        title:'',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category: {
          cid:'',
        },
      };


    },error => {
      Swal.fire('Error','error !!','error');
      console.log(error)
    })
    this.router.navigate(['/quiz']);

  }


}
