import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss']
})
export class StartseiteComponent implements OnInit {
  public surveyCode:string;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  routeToSurvey(surveyCode){
    this.router.navigate(['/survey/'+surveyCode]);
  }

}
