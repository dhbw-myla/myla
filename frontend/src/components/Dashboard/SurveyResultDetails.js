import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import {
   QUESTION_TYPE_BOOLEAN,
   QUESTION_TYPE_CHECKBOX,
   QUESTION_TYPE_COMMENT,
   QUESTION_TYPE_DROPDOWN,
   QUESTION_TYPE_MULTIPLE_TEXT,
   QUESTION_TYPE_RADIO,
   QUESTION_TYPE_RATING,
   QUESTION_TYPE_TEXT,
} from '../constants';
import SectionContainer from '../sectionContainer';
import { loadingSpinner } from '../Spinner/Loading';
import surveyResult from './69surveydata.json';

class SurveyResultDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         resultsOfSurvey: {},
         showCharts: false,
      };
   }
   componentDidMount() {
      // getSurveyResults(getStoredUser(), this.props.survey.id).then((response) => {
      //    this.setState({ resultsOfSurvey: response.payload, showCharts: true })
      // });
      this.setState({ resultsOfSurvey: surveyResult, showCharts: true });
   }

   componentWillUnmount() {
      this.setState({ resultsOfSurvey: {}, showCharts: false });
   }

   dataBar = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
         {
            label: 'Penis',
            data: [12, 19, 30, 5, 2, 150],
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
   barChartOptions = {
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

   buildBarChart(question, answers) {}

   buildAnswerList(answers) {
      return (
         <MDBCol>
            <MDBRow my-3 grey lighten-4 survey-card>
               {answers.map((answer) => (
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
      let labels = Object.keys(answers);
      let data = [];

      for (let a in answers) {
         data.push(answers[a]);
      }

      let dataPie = {
         labels: labels,
         datasets: [
            {
               data: data,
               backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
               hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db'],
            },
         ],
      };

      return <Pie data={dataPie} options={{ responsive: true }} />;
   }

   buildSection(surveyResult, key) {
      const { question, answers } = surveyResult;
      let chart;
      let number = key + 1;

      switch (question.type) {
         case QUESTION_TYPE_TEXT:
         case QUESTION_TYPE_MULTIPLE_TEXT:
         case QUESTION_TYPE_COMMENT:
            chart = this.buildAnswerList(answers);
            break;
         case QUESTION_TYPE_BOOLEAN:
         case QUESTION_TYPE_DROPDOWN:
         case QUESTION_TYPE_CHECKBOX:
         case QUESTION_TYPE_RADIO:
            chart = this.buildPieChart(question, answers);
            break;
         case QUESTION_TYPE_RATING:
            chart = this.buildBarChart(question, answers);
            break;
         default:
            chart = <Bar data={this.dataBar} options={this.barChartOptions} />;
      }

      return (
         <SectionContainer title={'Question ' + number} header={question.title} noBorder={true}>
            {chart}
            <hr className="my-5" />
         </SectionContainer>
      );
   }

   render() {
      /**
       * What to show?
       * One section for each question
       *    If type is
       *          text --> einfach auflisten
       *          multipletext --> einfach auflisten
       *          matrixdropdown --> TDB
       *          matrix --> TBD
       *          boolean --> kreisdia
       *          imagepicker --> TBD
       *          rating --> balkendia
       *          comment --> auflisten
       *          dropdown --> kreis oder balkendia
       *          radio --> balkendiagramm
       *          checkbox --> balkendiagramm
       *
       */
      const { resultsOfSurvey, showCharts } = this.state;

      if (!showCharts) {
         return loadingSpinner('Results are loading ...');
      } else {
         return <MDBContainer>{resultsOfSurvey.questions.map((result, key) => this.buildSection(result, key))}</MDBContainer>;
      }
   }
}

export default withRouter(SurveyResultDetails);
