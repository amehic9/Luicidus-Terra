import { Component, OnInit } from '@angular/core';
declare var L: any;

var lat = null;
var lon = null;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = {
    name: "",
    surname: "",
    city: "",
    country: ""
  }
  userForEdit = {
    name: "",
    surname: "",
    city: "",
    country: ""
  }
  mode = "user";
  flagsQuizCorrectAnswers;
  generalQuizCorrectAnswers;
  colorQuizCorrectAnswers;
  totalFlagsQuestions;
  totalGeneralQuestions;
  totalColorQuestions;

  constructor() { }

  ngOnInit() {
    if (typeof(Storage) !== "undefined") {
      this.user.name = localStorage.getItem("name");
      this.user.surname = localStorage.getItem("surname");
      this.user.city = localStorage.getItem("city");
      this.user.country = localStorage.getItem("country");
      this.userForEdit.name = localStorage.getItem("name");
      this.userForEdit.surname = localStorage.getItem("surname");
      this.userForEdit.city = localStorage.getItem("city");
      this.userForEdit.country = localStorage.getItem("country");
      lat = localStorage.getItem("lat");
      lon = localStorage.getItem("lon");
      this.getQuizHistory();
    }
    setTimeout(() =>{
      
        setTimeout(() =>{
          var mymap = L.map('mapid').setView([lat, lon], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'your.mapbox.access.token'
          }).addTo(mymap);
          let marker = L.marker([lat, lon]).addTo(mymap);

          marker.dragging.enable();

          marker.on('dragend', (ev) => {
            var changedPos = ev.target.getLatLng();
            lat = changedPos.lat;
            lon = changedPos.lng;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lon", lon);
          });
        }, 500);
    }, 500);
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

  showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude; 
  }

  saveInformation() {
    localStorage.setItem("name", this.userForEdit.name);
    localStorage.setItem("surname", this.userForEdit.surname);
    localStorage.setItem("city", this.userForEdit.city);
    localStorage.setItem("country", this.userForEdit.country);
    this.user.name = this.userForEdit.name;
    this.user.surname = this.userForEdit.surname;
    this.user.city = this.userForEdit.city;
    this.user.country = this.userForEdit.country;
  }

  cancelUserEdit() {
    this.userForEdit.name = this.user.name;
    this.userForEdit.surname = this.user.surname;
    this.userForEdit.city = this.user.city;
    this.userForEdit.country = this.user.country;
  }

}
