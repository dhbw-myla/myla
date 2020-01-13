import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute
} from "@angular/router";
import {
  Router
} from '@angular/router';
import SurveyQuestions from '../../../assets/survey.json';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  public surveycode: string;
  public clicked:string[]=[] ;
  public buttonClickable: boolean;
  public surveyQuestion: any;
  constructor(private route: ActivatedRoute, public router: Router) {
    this.route.params.subscribe(params => this.surveycode = params.surveylink);
  }
  ngOnInit() {
    this.surveyQuestion = SurveyQuestions;
    console.log(SurveyQuestions[0].question)
    /*this.surveyQuestion.forEach(question => {
      question.forEach(answer => {
        let name = "questionid" + question.id + "answerid" + answer.id;

      })
    });

    /*
      ANSWER ALS EIGENES COMPONENT EINSPEICHERN UND DANN DARIN FESTLEGEN, OBS CLICKED IST ODER NICHT -> is ja scoped und dann für jedes ne eigene variable
      dann machen wir doch den card-body mit ngFor und machen innendrin ein <answer data=answers> </answers> (so wärs in vue, kp wie man hier daten übergibt) und bauen das als eigenes Element um -> clicked wird in jedem funktionieren ;)
    */
  }
  isStyleRequired(i: number, k:number): boolean {
    return i >= 2;
    }

  alert(event) {
    var element = document.getElementById(event.path[1].id);
    this.clicked.push(event.path[1].id);
    element.classList.toggle("hovered");

    if(this.clicked.length>=2){
      var element = document.getElementById(this.clicked[0]);
      element.classList.toggle("hovered");
      this.clicked.shift();
    } 
    console.log( this.clicked)

  }
}

