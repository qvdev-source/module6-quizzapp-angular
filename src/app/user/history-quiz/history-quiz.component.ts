import {Component, OnInit} from '@angular/core';
import {QuizHistoryService} from "../../services/quiz-history.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-history-quiz',
  templateUrl: './history-quiz.component.html',
  styleUrls: ['./history-quiz.component.css']
})
export class HistoryQuizComponent implements OnInit {

 quizhistory=[{
   id:'',
   userId:'',
   marksGot:'',
   correctAnswers:'',
   quizId:'',
   quizTitle:'',
   username:''

 }];
 userId:string


  constructor(private quizHistoryId: QuizHistoryService,
              private router: Router, private http: HttpClient,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.userId = this.activeRoute.snapshot.paramMap.get('userId');
      this.listHistory(this.userId)
    }

   private listHistory(userId: string) {
    this.quizHistoryId.getHistoryQuizId(this.userId).subscribe((data:any)=>{
      this.quizhistory=data
    })

  }

}

