import {Component, OnInit} from '@angular/core';
import {formatNumber, LocationStrategy} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})


export class StartQuizComponent implements OnInit {
  qid: any;
  questions: any;
  isSubmit = false;
  timer: any;
  myNumber = [1,2,3,4];
  randomLocationAnswer = 0;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  constructor(private locationSt: LocationStrategy,
              private router: ActivatedRoute,
              private _question: QuestionService) {
  }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.router.snapshot.params.qid;
    this.loadQuestion();
    this.randomLocationAnswer = this.myNumber[Math.floor(Math.random() * this.myNumber.length)];
    console.log(this.randomLocationAnswer);
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href)
    })
  }

  private loadQuestion() {
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length *2 *60

        // @ts-ignore
        this.questions.forEach((q) => {
          q['givenAnswer'] = '';
        });

        // console.log(this.questions);
        this.startTimer();
      }, error => {
        // console.log(error);
        Swal.fire('Error', 'Error when loading question', 'error');
      }
    );
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTimer() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: "info"
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz()
      }
    })
  }

  evalQuiz() {

    this.isSubmit = true;
    // @ts-ignore
    this.questions.forEach(q => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }

      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }

    });
    //
    // console.log("Correct Answer " + this.correctAnswers)
    // console.log("Mark Got " + this.marksGot);
  }

}
