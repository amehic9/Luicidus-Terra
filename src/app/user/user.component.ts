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
    country: "",
    birthday: null
  }
  userForEdit = {
    name: "",
    surname: "",
    city: "",
    country: "",
    birthday: null
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
    
    window.addEventListener("dragover",function(e){
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
      e.preventDefault();
    },false);

    if (typeof(Storage) !== "undefined") {
      this.user.name = localStorage.getItem("name");
      this.user.surname = localStorage.getItem("surname");
      this.user.city = localStorage.getItem("city");
      this.user.country = localStorage.getItem("country");
      this.user.birthday = localStorage.getItem("birthday");
      this.userForEdit.name = localStorage.getItem("name");
      this.userForEdit.surname = localStorage.getItem("surname");
      this.userForEdit.city = localStorage.getItem("city");
      this.userForEdit.country = localStorage.getItem("country");
      this.userForEdit.birthday = localStorage.getItem("birthday");
      if (localStorage.getItem("color")) {
        $("#colorprofile").val(localStorage.getItem("color"));
        $(".user-box").css("border", "1px solid " + localStorage.getItem("color"));
      }
      if (localStorage.getItem("lat")) {
        lat = localStorage.getItem("lat");
      }
      else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        }
      }
      if (localStorage.getItem("lon")) {
        lon = localStorage.getItem("lon");
      }
      else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        }
      }
      this.getQuizHistory();
    }
    else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
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

  getColor() {
     localStorage.setItem("color", (<any> document.getElementById("colorprofile")).value);
     $(".user-box").css("border", "1px solid " + localStorage.getItem("color"));
  }

  //dropped thumbnail
  dropImage(event) {
    event.preventDefault();
    var dt = event.dataTransfer;
    var file = dt.files[0];
    if (this.isImage(file.name)) {
      let imagePreview = $('.image-preview');
      $('.image-preview').css('display', 'block');
      $('.drop-image').css('display', 'none');

      var reader = new FileReader();
      reader.onload = function(e){
          $(".image-preview").attr("src", (<any>e).target.result);
      };
      reader.readAsDataURL(file);
    }

    return false;
  }

  isImage(file) {
    let split = file.split('.');
    if (split[split.length - 1].toLowerCase() == 'jpg' || split[split.length - 1].toLowerCase() == 'png') {
      return true;
    }
    return false;
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
      this.totalFlagsQuestions = 0;
    }
    if (localStorage.getItem("general-total-answers")) {
      this.totalGeneralQuestions = parseInt(localStorage.getItem("general-total-answers"));
    }
    else {
      this.totalGeneralQuestions = 0;
    }
    if (localStorage.getItem("color-total-answers")) {
      this.totalColorQuestions = parseInt(localStorage.getItem("color-total-answers"));
    }
    else {
      this.totalColorQuestions = 0;
    }
  }

  showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude; 
  }

  saveInformation() {
    this.userForEdit.birthday = $("#birthday").val();
    localStorage.setItem("name", this.userForEdit.name);
    localStorage.setItem("surname", this.userForEdit.surname);
    localStorage.setItem("city", this.userForEdit.city);
    localStorage.setItem("country", this.userForEdit.country);
    localStorage.setItem("birthday", this.userForEdit.birthday);
    this.user.name = this.userForEdit.name;
    this.user.surname = this.userForEdit.surname;
    this.user.city = this.userForEdit.city;
    this.user.country = this.userForEdit.country;
    this.user.birthday = this.userForEdit.birthday;
    this.getColor();
  }

  cancelUserEdit() {
    this.userForEdit.name = this.user.name;
    this.userForEdit.surname = this.user.surname;
    this.userForEdit.city = this.user.city;
    this.userForEdit.country = this.user.country;
    this.userForEdit.birthday = this.user.birthday;
  }

}
