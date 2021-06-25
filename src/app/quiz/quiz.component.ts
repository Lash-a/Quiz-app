import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  counter : number = 1;

  constructor(
    public service: ApiServiceService,
    private cookie: CookieService) { }

  ngOnInit(): void {
    this.getToken();
  }

  getToken(){
    this.service.getToken().subscribe((res: any) => {
      this.cookie.set('token', res.token);
    });
  }

  generateAnswers(){
  this.service.generateAnswers();
  }

  showCorrectAnswer(answer){
    if(answer === this.service.correctAnswer){
      this.service.correctAnswerCounter += 1;
    }
    this.service.questionCounter++;
    if(this.service.questionCounter != this.service.totalQuestions){
      this.generateAnswers();
    }
  }

  reset(){
    this.service.reset();
  }

};
