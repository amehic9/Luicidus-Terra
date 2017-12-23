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

  anthem_file:string = "assets/audio/Austria.mp3";

  getCountries() {
    this.getCountriesJson()
      .subscribe(
        response => {
          let responseJson = response.json();
          this.countryInfo = [];

          this.countryInfo = <any>responseJson[0];

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
    console.log(this.continent);
  }

  showEuropePage() {

  }


  setCountry(country) {
    this.setAnthem(country);
  }


  setAnthem(country) {
    this.anthem_file = "assets/audio/" + country + ".mp3";
    this.curret_country = country;

    this.getCountries();

    this.play();
  }

  play() {
    (<any>$("#sound-anthem")).trigger('load');
    (<any>$("#sound-anthem")).trigger('play');
  }
}
