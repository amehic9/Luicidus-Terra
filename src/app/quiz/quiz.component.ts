import { Component, OnInit, OnDestroy } from '@angular/core';
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
  flagsQuizCorrectAnswers;
  generalQuizCorrectAnswers;
  colorQuizCorrectAnswers;
  totalFlagsQuestions;
  totalGeneralQuestions;
  totalColorQuestions;
  quizEnded = false;

  // color-flag
  flag_colors:string[] = ["black", "black", "black"];
  filterColor:boolean[] = [false, false, false, false, false, false];
  currentColorID:number;
  currentColor:string = "white";

  colorFlagQuiz:boolean = false;

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.getQuizHistory();
  }

  getQuizHistory() {
    if (localStorage.getItem("flags-quiz-correct-answers")) {
    this.flagsQuizCorrectAnswers = parseInt(localStorage.getItem("flags-quiz-correct-answers"));
    } 
    else {
      this.flagsQuizCorrectAnswers = 0;
    }
    if (localStorage.getItem("general-quiz-correct-answers")) {
    this.generalQuizCorrectAnswers = parseInt(localStorage.getItem("general-quiz-correct-answers"));
    } 
    else {
      this.generalQuizCorrectAnswers = 0;
    }
    if (localStorage.getItem("color-quiz-correct-answers")) {
    this.colorQuizCorrectAnswers = parseInt(localStorage.getItem("color-quiz-correct-answers"));
    } 
    else {
      this.colorQuizCorrectAnswers = 0;
    }
  

    if (localStorage.getItem("flags-total-answers")) {
    this.totalFlagsQuestions = parseInt(localStorage.getItem("flags-total-answers"));
    }
    else {
    this.totalFlagsQuestions = localStorage.getItem("flags-total-answers");
    }
    if (localStorage.getItem("general-total-answers")) {
    this.totalGeneralQuestions = parseInt(localStorage.getItem("general-total-answers"));
    }
    else {
    this.totalGeneralQuestions = localStorage.getItem("general-total-answers");
    }
    if (localStorage.getItem("color-total-answers")) {
    this.totalColorQuestions = parseInt(localStorage.getItem("color-total-answers"));
    }
    else {
    this.totalColorQuestions = localStorage.getItem("color-total-answers");
    }
  }

  ngOnDestroy() {
    if (!this.quizEnded) {
      this.atQuizEnd();
    }
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

          this.shuffleQuestions();  // take random values from the list
          this.allQuestions = this.allQuestions.slice(0,10);  // take only first 10 elements
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
    this.quizEnded = false;
    setTimeout(() => {
      $('.quiz-quiz').css('display', 'block');
      this.playAudio();
      $('.time').css('display', 'block');
      $('.general-quiz-box').css('display', 'none');
      $('.flag-quiz-box').css('display', 'block');
      $('.color-flag-quiz-box').css('display', 'none');
      $('.quiz-results').css('display', 'none');
      $('#audioButton').css('display','block');
      this.colorFlagQuiz = false;

      this.seconds = 0;
      this.quizStarted = true;
      this.correctAnswers = 0;
      for (var i = 0; i < this.allQuestions.length; i++) {
        this.questions.push(this.allQuestions[i]);
      }
      this.cancel = setInterval(() => {
        this.incrementSeconds();
      }, 1000);

      this.showNextQuestion();
    }, 1000);
  }

  startGeneralQuiz() {
    this.quizEnded = false;
    setTimeout(() => {
      $('.quiz-quiz').css('display', 'block');
      this.playAudio();
      $('.time').css('display', 'block');
      $('.flag-quiz-box').css('display', 'none');
      $('.general-quiz-box').css('display', 'block');
      $('.color-flag-quiz-box').css('display', 'none');
      $('.quiz-results').css('display', 'none');
      $('#audioButton').css('display','block');
      this.colorFlagQuiz = false;

      this.seconds = 0;
      this.quizStarted = true;
      this.correctAnswers = 0;
      for (var i = 0; i < this.allQuestions.length; i++) {
        this.questions.push(this.allQuestions[i]);
      }
      this.cancel = setInterval(() => {
        this.incrementSeconds();
      }, 1000);

      this.showNextQuestion();
    }, 1000);
  }

  startColorFlagsQuiz() {
    this.quizEnded = false;
    setTimeout(() => {
      $('.quiz-quiz').css('display', 'block');
      this.playAudio();
      $('.time').css('display', 'block');
      $('.color-flag-quiz-box').css('display', 'block');
      $('.flag-quiz-box').css('display', 'none');
      $('.general-quiz-box').css('display', 'none');
      $('.quiz-results').css('display', 'none');
      $('#audioButton').css('display','block');
      this.colorFlagQuiz = true;

      this.seconds = 0;
      this.quizStarted = true;
      this.correctAnswers = 0;
      for (var i = 0; i < this.allQuestions.length; i++) {
        this.questions.push(this.allQuestions[i]);
      }
      this.cancel = setInterval(() => {
        this.incrementSeconds();
      }, 1000);

      this.showNextQuestion();
    }, 1000);
  }

  showNextQuestion() {
    let index = Math.floor(Math.random() * (this.questions.length - 1 - 0) + 0);
    this.currentQuestion = this.questions[index];

    if(!this.colorFlagQuiz) {
      this.answers = (<any>this).currentQuestion.answers;
      this.shuffleAnswers();
    }

    this.questions.splice(index, 1);
  }

  shuffleAnswers() {
    for (let i = this.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
    }
  }

  shuffleQuestions() {
    for (let i = this.allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.allQuestions[i], this.allQuestions[j]] = [this.allQuestions[j], this.allQuestions[i]];
    }
  }

  submitAnswer(answer) {
    if (answer === (<any>this.currentQuestion).correct) {
      this.correctAnswers++;
    }
    if (this.questions.length) {
      this.step++;
      this.showNextQuestion();
    }
    else {
      this.atQuizEnd();
    }
  }

  submitAnswerColorFlag() {
    let correct_flag_colors = (<any>this.currentQuestion).correct;

    let color_check_1 = correct_flag_colors[0] === this.flag_colors[0];
    let color_check_2 = correct_flag_colors[1] === this.flag_colors[1];
    let color_check_3 = correct_flag_colors[2] === this.flag_colors[2];

    if (color_check_1 && color_check_2 && color_check_3) {
      this.correctAnswers++;
    }

    this.flag_colors = ["black", "black", "black"];
    document.getElementById("rectColor1").setAttribute("fill", "black");
    document.getElementById("rectColor2").setAttribute("fill", "black");
    document.getElementById("rectColor3").setAttribute("fill", "black");

    if (this.questions.length) {
      this.step++;
      this.showNextQuestion();
    }
    else {
      this.atQuizEnd();
    }
  }

  atQuizEnd() {
    this.quizEnded = true;
    this.stopAudio();
    $('#audioButton').css('display','none');
    $('.time').css('display', 'none');
    $('.flag-quiz-box, .general-quiz-box, .color-flag-quiz-box').css('display', 'none');
    this.step = 1;
    clearInterval(this.cancel);
    $('.quiz-results').css('display', 'block');
    $('.quiz-quiz').css('display', 'none');
    if (this.quizType === 'flags') {
      localStorage.setItem('flags-quiz-correct-answers', this.flagsQuizCorrectAnswers + this.correctAnswers);
      localStorage.setItem('flags-total-answers', this.totalFlagsQuestions + 10);
    }
    else if (this.quizType === 'general') {
      localStorage.setItem('general-quiz-correct-answers', this.generalQuizCorrectAnswers + this.correctAnswers);
      localStorage.setItem('general-total-answers', this.totalGeneralQuestions + 10);
    }
    else if (this.quizType === 'color_flags') {
      localStorage.setItem('color-quiz-correct-answers', this.colorQuizCorrectAnswers + this.correctAnswers);
      localStorage.setItem('color-total-answers', this.totalColorQuestions + 10);
    }
    this.getQuizHistory();
  }

  // color-flag
  pickColor(): void{  
    this.filterColor.forEach((element, index, array) => {
        if(index == this.currentColorID) {
            array[index] = true;
        }
        else {
            array[index] = false;
        }
    });
  }

  colorFlag(object): void{
      object.target.attributes['fill'].value = this.currentColor;
      
      if(object.target.attributes['id'].value === "rectColor1")
      {
        this.flag_colors[0] = this.currentColor;
      }
      else if (object.target.attributes['id'].value === "rectColor2") {
        this.flag_colors[1] = this.currentColor;
      } else {
        this.flag_colors[2] = this.currentColor;
      }
  }

  playAudio(){
    (<any>$("#sound")).trigger('play')
  }

  stopAudio(){
    if((<any>$("#sound"))[0]) {
      (<any>$("#sound"))[0].pause();
    }
  }
}
