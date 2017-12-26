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
