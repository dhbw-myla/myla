import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import { getSurveyResults } from '../../api/interaction';
import { getStoredUser } from '../../auth/verifyPw';
import {
   QUESTION_TYPE_BOOLEAN,
   QUESTION_TYPE_CHECKBOX,
   QUESTION_TYPE_COMMENT,
   QUESTION_TYPE_DROPDOWN,
   QUESTION_TYPE_MULTIPLE_TEXT,
   QUESTION_TYPE_RADIOGROUP,
   QUESTION_TYPE_RATING,
   QUESTION_TYPE_TEXT,
} from '../constants';
import SectionContainer from '../sectionContainer';
import { loadingSpinner } from '../Spinner/Loading';
import './resultDashboard.css';

class SurveyResultDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         resultsOfSurvey: {},
         showCharts: false,
      };
   }
   componentDidMount() {
      getSurveyResults(getStoredUser(), this.props.survey.survey_id).then((response) => {
         this.setState({ resultsOfSurvey: response.payload, showCharts: true });
      });
      //this.setState({ resultsOfSurvey: surveyResult, showCharts: true });
   }

   componentWillUnmount() {
      this.setState({ resultsOfSurvey: {}, showCharts: false });
   }

   buildBarChart(question, answers) {
      let maxRating = 5;
      let minRating = 1;
      let labels = [];
      let data = [];

      if (question.rateMin !== undefined) {
         minRating = question.rateMin;
      }

      if (question.rateMax !== undefined) {
         maxRating = question.rateMax;
      }

      for (let i = minRating; i <= maxRating; i++) {
         if (answers[i]) {
            data.push(answers[i]);
            labels.push(i + " (" + answers[i] + ")");
         } else {
            data.push(0);
            labels.push(i);
         }
      }

      if (question.minRateDescription !== undefined) {
         labels[0] = question.minRateDescription;
      }

      if (question.maxRateDescription !== undefined) {
         labels[labels.length - 1] = question.maxRateDescription;
      }

      let dataBar = {
         labels: labels,
         datasets: [
            {
               label: 'Votes',
               data: data,
               backgroundColor: [
                  'rgba(255, 134, 159, 0.4)',
                  'rgba(98,  182, 239, 0.4)',
                  'rgba(255, 218, 128, 0.4)',
                  'rgba(113, 205, 205, 0.4)',
                  'rgba(170, 128, 252, 0.4)',
                  'rgba(255, 177, 101, 0.4)',
                  'rgba(255, 134, 159, 0.4)',
                  'rgba(98,  182, 239, 0.4)',
                  'rgba(255, 218, 128, 0.4)',
                  'rgba(113, 205, 205, 0.4)',
                  'rgba(170, 128, 252, 0.4)',
                  'rgba(255, 177, 101, 0.4)',
               ],
               borderWidth: 2,
               borderColor: [
                  'rgba(255, 134, 159, 1)',
                  'rgba(98,  182, 239, 1)',
                  'rgba(255, 218, 128, 1)',
                  'rgba(113, 205, 205, 1)',
                  'rgba(170, 128, 252, 1)',
                  'rgba(255, 177, 101, 1)',
                  'rgba(255, 134, 159, 1)',
                  'rgba(98,  182, 239, 1)',
                  'rgba(255, 218, 128, 1)',
                  'rgba(113, 205, 205, 1)',
                  'rgba(170, 128, 252, 1)',
                  'rgba(255, 177, 101, 1)',
               ],
            },
         ],
      };

      let barChartOptions = {
         legend: {
            display: false,
         },
         responsive: true,
         maintainAspectRatio: false,
         scales: {
            xAxes: [
               {
                  barPercentage: 0.5,
                  gridLines: {
                     display: true,
                     color: 'rgba(0, 0, 0, 0.1)',
                  },
               },
            ],
            yAxes: [
               {
                  gridLines: {
                     display: true,
                     color: 'rgba(0, 0, 0, 0.1)',
                  },
                  ticks: {
                     beginAtZero: true,
                  },
               },
            ],
         },
      };

      return <Bar data={dataBar} options={barChartOptions} />;
   }

   buildAnswerList(answers) {
      return (
         <MDBCol>
            <MDBRow my-3 grey lighten-4 survey-card>
               {Object.keys(answers).map((answer) => (
                  <MDBCard cascade className="my-4 grey lighten-4 survey-card">
                     <MDBCardBody cascade className="text-center">
                        <MDBCardText>{answer}</MDBCardText>
                     </MDBCardBody>
                  </MDBCard>
               ))}
            </MDBRow>
         </MDBCol>
      );
   }

   buildPieChart(question, answers) {
      let labels = [];
      let data = [];
      if (question.choices) {
         if (question.choices.length !== labels.length) {
            for (let l in question.choices) {
               if (answers[question.choices[l].value]) {
                  labels.push(question.choices[l].text + ' (' + answers[question.choices[l].value] + ')');
                  data.push(answers[question.choices[l].value]);
               } else {
                  labels.push(question.choices[l].text + ' (0)');
                  data.push(0);
               }
            }
         }
      } else {
         for (let a in answers) {
            data.push(answers[a]);
            labels.push(a + " (" + answers[a] + ")")
         }
      }

      let dataPie = {
         labels: labels,
         datasets: [
            {
               data: data,
               backgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#C106C8',
                  '#18A618',
                  '#ac64ad',
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#C106C8',
                  '#18A618',
                  '#ac64ad',
               ],
               hoverBackgroundColor: [
                  '#FF5A5E',
                  '#5AD3D1',
                  '#FFC870',
                  '#C106C8',
                  '#18A618',
                  '#da92db',
                  '#FF5A5E',
                  '#5AD3D1',
                  '#FFC870',
                  '#C106C8',
                  '#18A618',
                  '#da92db',
               ],
            },
         ],
      };

      return <Pie data={dataPie} options={{ responsive: true }} />;
   }

   buildSection(surveyResult, key) {
      const { question, answers } = surveyResult;
      let chart;
      let number = key + 1;
      let participants = 0;

      for(let a in answers){
         participants += parseInt(answers[a])
      }

      if (answers === undefined || Object.keys(answers).length === 0) {
         chart = 'Nothing to show... :-(';
      } else {
         switch (question.type) {
            case QUESTION_TYPE_TEXT:
            case QUESTION_TYPE_MULTIPLE_TEXT:
            case QUESTION_TYPE_COMMENT:
               chart = this.buildAnswerList(answers);
               break;
            case QUESTION_TYPE_BOOLEAN:
            case QUESTION_TYPE_DROPDOWN:
            case QUESTION_TYPE_CHECKBOX:
            case QUESTION_TYPE_RADIOGROUP:
               chart = this.buildPieChart(question, answers);
               break;
            case QUESTION_TYPE_RATING:
               chart = this.buildBarChart(question, answers);
               break;
            default:
               chart = 'Nothing to show... :-(';
         }
      }

      return (
         <div className="dhbw_result_background">
            <SectionContainer number={number} title={'Question ' + number} header={question.title} noBorder={true}>
               {chart}
               <hr className="my-5" />
            </SectionContainer>
         </div>
      );
   }

   render() {
      const { resultsOfSurvey, showCharts } = this.state;
      let subtitle = null;
      let numberOfParticipants = null;
      let surveyDescription = null;
      subtitle = 'Survey Master: ' + resultsOfSurvey.title;
      numberOfParticipants = 'Number of Participations: ' + resultsOfSurvey.participations;
      surveyDescription = resultsOfSurvey.description;


      if (!showCharts) {
         return loadingSpinner('Results are loading ...');
      } else {
         return (
            <MDBContainer>
              <div className="dhbw_result_container"></div>
              <SectionContainer number={454} noBorder={true} className="dhbw_result_background">
               <div className="dashboard-fg-dhbw-links">
                  <p className="font-weight-bold dhbw_margin_p">{subtitle}</p>
                  <p className="font-weight-bold dhbw_margin_p">{numberOfParticipants}</p>
               </div>
               <p className="font-weight-bold dhbw_margin_p">Description: </p> 
               <p className="dhbw_margin_p_description">{surveyDescription}</p>
               </SectionContainer>
               {resultsOfSurvey.questions.map((result, key) => this.buildSection(result, key))}

            </MDBContainer>
         );
      }
   }
}

export default withRouter(SurveyResultDetails);
