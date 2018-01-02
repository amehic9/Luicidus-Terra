import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})

// Class for supplying functions for the Learning environment
export class LearningComponent implements OnInit {
  continent = this.route.snapshot.params['continent'];
  constructor(private route: ActivatedRoute,  private http: Http) { }

  //countryInfo:any = [];
  // Variable used to display information about the current country selected in the Europe learning sub-page
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

  // This is an observable function which gets called each time an European country is selected in the
  // Europe learning sub-page. It calls for an Ajax request which takes the JSON file from a REST service
  // and gets the data that it needs. 
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

  // For calling the REST service in the Europe country loading of the Ajax service. It returns a Json file.
  getCountriesJson() {
    return this.http.get("https://restcountries.eu/rest/v2/name/" + this.curret_country.toLowerCase());

    // https://github.com/fayder/restcountriess
  }

  // Called on the load of the page
  ngOnInit() {
    $("#home").toggleClass('active');
    this.activeMenu = "#home";
  }

  // When a country is selected in the Europe Learning sub-page, the following actions are followed.
  setCountry(country) {
    this.curret_country = country;
    this.getCountries();
  }


  // For setting an anthem through the getCountries() function.
  setAnthem() {
    this.anthem_file = "assets/audio/" + this.curret_country + ".mp3";

    this.play();
  }

  // For loading and playing the anthem, called by the setAnthem() function.
  play() {
    (<any>$("#sound-anthem")).trigger('load');
    (<any>$("#sound-anthem")).trigger('play');
  }

  // Navigation of the sub-menu. It is activated to indicate the different CSS 
  // for the currenlty active and other, non-active, options.
  setActiveNav(object) {
    $(this.activeMenu).toggleClass('active');

    $("#"+object+"").toggleClass('active');

    $("article[id ^= " + this.activeMenu.substr(1) + "]").css('display', 'none');
    $("article[id ^= " + object + "]").css('display', 'block');

    this.activeMenu =  "#" + object + "";
  }

  // In the Continent Learning page, to make the image of the continent enlarged whenever it is
  // entered with a mouse.
  enterMouse() {
    $("#continentImg").hover(
      function(){
          var $this = $(this);
          $this.stop().animate({'opacity':'1.0','height':'200px','top':'0px','left':'0px'});
      }
    );
  }

  // In the Continent Learning page, to make the image of the continent normal sized whenever it is
  // left with a mouse.
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

  // Observable function for getting he necessary data from a JSON file
  // in the Ajax process.
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

  // For calling and getting the specific JSON file.
  getContinentJson() {
    return this.http.get("../../assets/data/continents.json");
  }

  // Function for setting the current continent in the Continet Learning sub-page.
  // It is an Ajax process.
  setContinent(selected_continent) {
    this.current_continent = selected_continent;
    this.getContinent();
  }


  /* Statistic elements */

  statistic_title:string = "";
  statistic_text:string = "";
  statistics = [];

  // Ajax observable function for selecting and providing the data
  // of a specific statistic.
  setStatistic(selected_statistics) {
    this.getStatisticsJson()
    .subscribe(
      response => {
        let responseJson = response.json();
        this.statistics = [];
        this.statistic_title = "";
        this.statistic_text = "";

        for (let i = 0; i < (<any>responseJson).options.length; i++) {
          if ((<any>responseJson).options[i].statistic_name == selected_statistics) {
            this.statistic_title = (<any>responseJson).options[i].statistics[0].title;
            this.statistic_text = (<any>responseJson).options[i].statistics[0].text;
            
            for (let j = 0; j < (<any>responseJson).options[i].statistics[0].elements.length; j++) {
              this.statistics.push((<any>responseJson).options[i].statistics[0].elements[j]);
            }

            break;
          }
        }

      }
    )
  }

  // Getting the specific JSON file needed for the Statistic Learning sub-page.
  getStatisticsJson() {
    return this.http.get("../../assets/data/statistics.json");
  }

  // Test function for the statistic.
  setSomething() {
    this.setStatistic('rivers');
  }


  // For a dynamic drawing of the statistics which are read from the JSON file.
  // This specific function is for the rectangular SVG.
  setRectY(index) {
    let new_y = index * 20;
    return new_y;
  }

  // For a dynamic drawing of the statistics which are read from the JSON file.
  // This specific function is for the text SVG, x-axis.
  setTextX(statistic) {
    let new_width = 5 + parseInt(statistic.width);
    return new_width;
  }

  // For a dynamic drawing of the statistics which are read from the JSON file.
  // This specific function is for the text SVG, y-axis.
  setTextY(index) {
    let new_y = 8 + index * 20;
    return new_y;
  }

}
