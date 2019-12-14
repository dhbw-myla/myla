import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startingpage',
  templateUrl: './startingpage.component.html',
  styleUrls: ['./startingpage.component.scss']
})
export class StartingpageComponent implements OnInit {
  public surveyCode:string;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  routeToSurvey(surveyCode){
    this.router.navigate(['/survey/'+surveyCode]);
  }

}
