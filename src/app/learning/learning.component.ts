import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {
  continent = this.route.snapshot.params['continent'];
  constructor(private route: ActivatedRoute) { }

  anthem_file:string = "assets/audio/Austria.mp3";

  ngOnInit() {
    console.log(this.continent);
  }

  showEuropePage() {

  }

  /*setAnthem(country) {
    this.anthem_file = "assets/audio/" + country + ".mp3";
  }*/

  setAnthem() {
    this.anthem_file = "assets/audio/Bosnia.mp3";

    this.play();
  }

  play() {
    (<any>$("#sound-anthem")).trigger('load');
  }
}
