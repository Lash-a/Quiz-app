import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-quiz-start-page',
  templateUrl: './quiz-start-page.component.html',
  styleUrls: ['./quiz-start-page.component.css']
})
export class QuizStartPageComponent implements OnInit {


  @ViewChild('categoryList') categoryList: ElementRef;
  @ViewChild('difficultyList') difficultyList: ElementRef; 
  difficulty: string[] = ["Any Difficulty", "Easy", "Medium", "Hard"];

  constructor(
    public service: ApiServiceService) { }

  ngOnInit(): void {
    this.getCategorys();
  }

  getCategorys(){
    this.service.getCategory().subscribe((categorys: any) => {
      this.service.category = categorys.trivia_categories;
    })
  }

  submit(form: NgForm){
    this.service.totalQuestions = form.value.totalQuestions;
    this.service.difficulty = this.difficultyList.nativeElement.value;
    this.service.categoryID = parseInt(this.categoryList.nativeElement.value);
    
    this.service.getQuestions().subscribe(res => {
      this.service.retrivedQuestions = res;
      this.service.displayQuestions = true;
      this.service.generateAnswers();
    });

  };

};
