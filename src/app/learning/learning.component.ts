import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})

export class LearningComponent implements OnInit {
  continent = this.route.snapshot.params['continent'];
  constructor(private route: ActivatedRoute,  private http: Http) { }

  //countryInfo:any = [];
  countryInfo = {
    "name": "",
    "nativeName": "",
    "altSpellings": "",
    "flag": "",
    "capital": "",
    "region": "",
    "subregion": "",
    "population": "",
    "demonym": "",
    "area": "",
    "lat": "",
    "lng": "",
    "timezone": "",
    "gini": "",
    "currency_name": "",
    "currency_code": "",
    "languages": "",
    "regionalBlocks": ""
  };
  curret_country:string = "";

  anthem_file:string = "assets/audio/Austria.mp3";

  // Current active sub-menu
  activeMenu:string = "";

  getCountries() {
    this.getCountriesJson()
      .subscribe(
        response => {
          let responseJson = response.json();

          for (let i = 0; i < 1; i++) {
            this.countryInfo.name = (<any>responseJson)[i].name;
            this.countryInfo.nativeName = (<any>responseJson)[i].nativeName;
            this.countryInfo.altSpellings = (<any>responseJson)[i].altSpellings[2];
            this.countryInfo.flag = (<any>responseJson)[i].flag;
            this.countryInfo.capital = (<any>responseJson)[i].capital;
            this.countryInfo.region = (<any>responseJson)[i].region;
            this.countryInfo.subregion = (<any>responseJson)[i].subregion;
            this.countryInfo.population = (<any>responseJson)[i].population;
            this.countryInfo.demonym = (<any>responseJson)[i].demonym;
            this.countryInfo.area = (<any>responseJson)[i].area;
            this.countryInfo.lat = (<any>responseJson)[i].latlng[0];
            this.countryInfo.lng = (<any>responseJson)[i].latlng[1];
            this.countryInfo.timezone = (<any>responseJson)[i].timezones[0];
            this.countryInfo.gini = (<any>responseJson)[i].gini;
            this.countryInfo.currency_name = (<any>responseJson)[i].currencies[0].name;
            this.countryInfo.currency_code = (<any>responseJson)[i].currencies[0].code;

            this.countryInfo.languages = "";
            (<any>responseJson)[i].languages.forEach(element => {
              this.countryInfo.languages = this.countryInfo.languages.concat(element.name + " ( " + element.nativeName + " ) , ");
            });

            this.countryInfo.regionalBlocks = "";
            (<any>responseJson)[i].regionalBlocs.forEach(element => {
              this.countryInfo.regionalBlocks = this.countryInfo.regionalBlocks.concat(element.name + " ( " + element.acronym + " )");
            });
          }

          //this.countryInfo = <any>responseJson[0];

          this.setAnthem();

          //window.alert("Click: " + this.curret_country);
        }
      )
  }

  getCountriesJson() {
    return this.http.get("https://restcountries.eu/rest/v2/name/" + this.curret_country.toLowerCase());
    //return this.http.get("https://restcountries.eu/rest/v2/alpha/col");

    // https://github.com/fayder/restcountriess
  }

  ngOnInit() {
    $("#home").toggleClass('active');
    this.activeMenu = "#home";
  }

  setCountry(country) {
    this.curret_country = country;
    this.getCountries();
  }


  setAnthem() {
    this.anthem_file = "assets/audio/" + this.curret_country + ".mp3";

    this.play();
  }

  play() {
    (<any>$("#sound-anthem")).trigger('load');
    (<any>$("#sound-anthem")).trigger('play');
  }

  setActiveNav(object) {
    $(this.activeMenu).toggleClass('active');

    $("#"+object+"").toggleClass('active');

    $("article[id ^= " + this.activeMenu.substr(1) + "]").css('display', 'none');
    $("article[id ^= " + object + "]").css('display', 'block');

    this.activeMenu =  "#" + object + "";
  }

  enterMouse() {
    $("#continentImg").hover(
      function(){
          var $this = $(this);
          $this.stop().animate({'opacity':'1.0','height':'200px','top':'0px','left':'0px'});
      }
    );
  }

  leaveMouse() {
    $("#continentImg").hover(
      function(){
          var $this = $(this);
          $this.stop().animate({'opacity':'0.8','height':'500px','top':'-66.5px','left':'-150px'});
      }
    );
  }

  // Continents 

  current_continent:string = "";
  continent_info = [];

  getContinent() {
    this.getContinentJson()
    .subscribe(
      response => {
        let responseJson = response.json();
        this.continent_info = [];

        for (let i = 0; i < (<any>responseJson).continents.length; i++) {
          if ((<any>responseJson).continents[i].name == this.current_continent) {
            this.continent_info = (<any>responseJson).continents[i];
          }
        }

      }
    )
  }

  getContinentJson() {
    return this.http.get("../../assets/data/continents.json");
  }

  setContinent(selected_continent) {
    this.current_continent = selected_continent;
    this.getContinent();
  }

}
