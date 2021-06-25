import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questions } from './Questions';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  //სუ რამდენი კითხვაა
  totalQuestions: number = 10;
  // სირთულე
  difficulty: string;
  // ინახავს კატეგორიას
  category: any;
  // დაბრუნებულ კატეგორიის მასივში ID-ს უნდა მივწვდე აპი call-ისთვის
  categoryID: number;
  // სწორი პასუხები მთვლელი 
  correctAnswerCounter: number = 0;
  // აქ ვინახავ ყველა კითხვას სირთულის და კატეგორიის მიხედვით
  retrivedQuestions: any;
  // გენერირდება უი იმის მიხედვით შეავსო თუ არა ფორმა იუზერმა
  displayQuestions: boolean = false;
  // ინახავს სწორ პასუხს
  correctAnswer: any;
  // ითვლის რამდენ კითხვაზეა გაცემული პასუხი
  questionCounter: number = 0;
  // ინახავს კითხვას სათითაოდ იცვლება ყოველ იტერაციაზე
  question: any;
  // არის კითხვის 4 სავარაუდო პასუხის მასივი
  answers: any;

  constructor(
    private http : HttpClient,
    private cookie: CookieService
  ) { 
  }


  getQuestions(): Observable<Questions>{
    let token = this.cookie.get('token');
    let difficulty = this.difficulty.toLocaleLowerCase();

    if(difficulty === "any difficulty" && this.categoryID === 0){
      return this.http.get<Questions>(`https://opentdb.com/api.php?amount=${this.totalQuestions}&token=${token}`);
    }else if(difficulty !== "any difficulty" && this.categoryID === 0){
      return this.http.get<Questions>(`https://opentdb.com/api.php?amount=${this.totalQuestions}&token=${token}&difficulty=${difficulty}`);
    }else if (difficulty === "any difficulty" && this.categoryID != 0){
      return this.http.get<Questions>(`https://opentdb.com/api.php?amount=${this.totalQuestions}&token=${token}&category=${this.categoryID}`);
    }
    return this.http.get<Questions>(`https://opentdb.com/api.php?amount=${this.totalQuestions}&token=${token}&difficulty=${difficulty}&category=${this.categoryID}`);
  }

  getToken(){
    return this.http.get(`https://opentdb.com/api_token.php?command=request`);
  }

  getCategory(): Observable<Category>{
    return this.http.get<Category>("https://opentdb.com/api_category.php");
  }

  generateAnswers(){
    this.answers = [...this.retrivedQuestions.results[this.questionCounter].incorrect_answers, this.retrivedQuestions.results[this.questionCounter].correct_answer];
    this.correctAnswer = this.retrivedQuestions.results[this.questionCounter].correct_answer;
    this.question = this.retrivedQuestions.results[this.questionCounter].question;

    for (var i = this.answers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.answers[i];
      this.answers[i] = this.answers[j];
      this.answers[j] = temp;
    }
  };

  reset(){
    this.difficulty = 'Any Difficulty';
    this.categoryID = 0;
    this.correctAnswerCounter = 0;
    this.retrivedQuestions = undefined;
    this.displayQuestions = false;
    this.questionCounter = 0;
  }

};
