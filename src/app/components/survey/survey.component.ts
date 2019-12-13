import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute
} from "@angular/router";
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  public umfragelink:string;
  constructor(private route: ActivatedRoute, public router: Router) {
    this.route.params.subscribe(params => this.umfragelink = params.umfragelink);
  }
  ngOnInit() {
    console.log(this.umfragelink);
  }

}
