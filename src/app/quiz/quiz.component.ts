import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizStarted = false;
  quizType = this.route.snapshot.params['type'];
  questions = [];
  currentQuestion = {};
  seconds = 0;
  step = 1;
  answers = [];
  correctAnswers = 0;

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.getQuestionsJson()
      .subscribe(
      response => {
        let responseJson = response.json();
        this.questions = (<any>responseJson).questions;
      }
      )
  }

  getQuestionsJson() {
    return this.http.get("../../assets/questions/" + this.quizType + ".json");
  }

  incrementSeconds() {
    this.seconds += 1;
  }

  startQuiz() {
    this.quizStarted = true;
    let cancel = setInterval(() => {
      this.incrementSeconds();
    }, 1000);

    this.showNextQuestion();
  }

  showNextQuestion() {
    let index = Math.floor(Math.random() * (this.questions.length - 1 - 0) + 0);
    this.currentQuestion = this.questions[index];
    this.answers = (<any>this).currentQuestion.answers;
    this.shuffleAnswers();
    this.questions.splice(index, 1);
  }

  shuffleAnswers() {
    for (let i = this.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
    }
  }

  submitAnswer(answer) {
    if (answer === (<any>this.currentQuestion).correct) {
      this.correctAnswers++;
    }
    if (this.questions.length) {
      this.showNextQuestion();
    }
    else {
      alert("right answers: " + this.correctAnswers);
    }
  }

}
