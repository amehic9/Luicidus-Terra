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

  // SVG color
  filterColor:boolean[] = [false, false, false, false, false, false];
  currentColorID:number;
  currentColor:string = "white";
  //

  ngOnInit() {
    console.log(this.continent);
  }

  showEuropePage() {

  }

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
  }

}
