import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {CategoryService} from "../../services/category.service";
import Swal from "sweetalert2";
import {Category} from "../../models/category";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  qId = 0;
  quiz: any;
  categories: Category[];

  constructor(private router: ActivatedRoute,
              private _quiz: QuizService,
              private _cat: CategoryService) {
  }

  ngOnInit(): void {
    this.qId = this.router.snapshot.params.qid;
    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
      }, (error: any) => {
        console.log(error);
      }
    );
    this._cat.getAllCategory().subscribe((data: Category[]) => {
      this.categories = data;
    }, error => {
      console.log(error);
    })
  }

  updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe(data => {
      Swal.fire('Success !!', 'quiz updated', 'success');
    }, error => {
      Swal.fire('Error !!', 'quiz error', 'error');
    })
  }
}
