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

  // color-flag
  flag_colors:string[] = ["black", "black", "black"];
  filterColor:boolean[] = [false, false, false, false, false, false];
  currentColorID:number;
  currentColor:string = "white";

  colorFlagQuiz:boolean = false;

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
    this.playAudio();
    setTimeout(() => {
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
    this.playAudio();
    setTimeout(() => {
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
    this.playAudio();
    setTimeout(() => {
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
    this.stopAudio();
    $('#audioButton').css('display','none');
    $('.time').css('display', 'none');
    $('.flag-quiz-box, .general-quiz-box, .color-flag-quiz-box').css('display', 'none');
    this.step = 1;
    clearInterval(this.cancel);
    $('.quiz-results').css('display', 'block');
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
    (<any>$("#sound"))[0].pause();
  }
}
