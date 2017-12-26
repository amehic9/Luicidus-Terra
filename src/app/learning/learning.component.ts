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

  countryInfo;
  curret_country:string;
  languages:string = "";
  regionalBlocks:string = "";

  anthem_file:string = "assets/audio/Austria.mp3";

  // Current active sub-menu
  activeMenu:string = "";

  getCountries() {
    this.getCountriesJson()
      .subscribe(
        response => {
          let responseJson = response.json();
          this.countryInfo = [];

          this.countryInfo = <any>responseJson[0];

          this.setLanguages();
          this.setAnthem();
          this.setRegionalBlocks();

          //window.alert(this.countryInfo.name);
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

  setLanguages() {
    this.languages = "";

    this.countryInfo.languages.forEach(element => {
      this.languages = this.languages.concat(element.name + " ( " + element.nativeName + " ) , ");
    });
  }

  setRegionalBlocks() {
    this.regionalBlocks = "";

    this.countryInfo.regionalBlocs.forEach(element => {
      this.regionalBlocks = this.regionalBlocks.concat(element.name + " ( " + element.acronym + " )");
    });
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
  continent_info;

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
