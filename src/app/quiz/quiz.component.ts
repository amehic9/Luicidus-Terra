import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  cancel;
  quizStarted = false;
  quizType = "";
  allQuestions = [];
  questions = [];
  currentQuestion = {};
  seconds = 0;
  step = 1;
  answers = [];
  correctAnswers = 0;

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    //this.getQuestions();
  }

  getQuestions() {
    this.getQuestionsJson()
      .subscribe(
      response => {
        let responseJson = response.json();
        this.allQuestions = [];
        for (var i = 0; i < (<any>responseJson).questions.length; i++) {
          this.allQuestions.push((<any>responseJson).questions[i]);
        }
      }
      )
  }

  getQuestionsJson() {
    return this.http.get("../../assets/questions/" + this.quizType + ".json");
  }

  incrementSeconds() {
    this.seconds += 1;
  }

  startFlagsQuiz() {
    setTimeout(() => {
      $('.time').css('display', 'block');
      $('.general-quiz-box').css('display', 'none');
      $('.flag-quiz-box').css('display', 'block');
      $('.quiz-results').css('display', 'none');
      this.quizStarted = true;
      this.correctAnswers = 0;
      for (var i = 0; i < this.allQuestions.length; i++) {
        this.questions.push(this.allQuestions[i]);
      }
      this.cancel = setInterval(() => {
        this.incrementSeconds();
      }, 1000);

      this.showNextFlagsQuestion();
    }, 1000);
  }

  startGeneralQuiz() {
    setTimeout(() => {
      $('.time').css('display', 'block');
      $('.flag-quiz-box').css('display', 'none');
      $('.general-quiz-box').css('display', 'block');
      $('.quiz-results').css('display', 'none');
      this.quizStarted = true;
      this.correctAnswers = 0;
      for (var i = 0; i < this.allQuestions.length; i++) {
        this.questions.push(this.allQuestions[i]);
      }
      this.cancel = setInterval(() => {
        this.incrementSeconds();
      }, 1000);

      this.showNextGeneralQuestion();
    }, 1000);
  }

  showNextGeneralQuestion() {
    let index = Math.floor(Math.random() * (this.questions.length - 1 - 0) + 0);
    this.currentQuestion = this.questions[index];
    this.answers = (<any>this).currentQuestion.answers;
    this.shuffleAnswers();
    this.questions.splice(index, 1);
  }

  showNextFlagsQuestion() {
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
      this.step++;
      this.showNextFlagsQuestion();
    }
    else {
      this.atQuizEnd();
    }
  }

  atQuizEnd() {
    $('.time').css('display', 'none');
    $('.flag-quiz-box, .general-quiz-box').css('display', 'none');
    this.seconds = 0;
    this.step = 1;
    clearInterval(this.cancel);
    $('.quiz-results').css('display', 'block');
  }

}
