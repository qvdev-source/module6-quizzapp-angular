import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import Swal from "sweetalert2";
import {QuizService} from "../../services/quiz.service";
import {MatSnackBar} from "@angular/material/snack-bar";

import {Router} from "@angular/router";

import {Quiz} from "../../models/quiz";


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories: Category[];
  quizData: Quiz = new Quiz();


  constructor(private categoryService: CategoryService,
              private quizService: QuizService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }


  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((data: Category[]) => {
      this.categories = data;
    }, () => {
      Swal.fire('Error loading data', '', 'error');
    })
  }

  addQuiz(): void {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snackBar.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }
    this.quizService.addQuiz(this.quizData).subscribe(() => {
      Swal.fire('Success', 'quiz is added', 'success');
      this.quizData = new Quiz();
    }, () => {
      Swal.fire('Error', 'error !!', 'error');
    })

    this.router.navigate(['/quiz']);

  }

}
