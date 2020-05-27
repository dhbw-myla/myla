import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { loadingSpinner } from '../Spinner/Loading';
import surveyResult from './69surveydata.json';
import { Bar, Pie, HorizontalBar, Doughnut } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
import SectionContainer from '../sectionContainer';
import {QUESTION_TYPE_BOOLEAN, QUESTION_TYPE_CHECKBOX, QUESTION_TYPE_COMMENT, QUESTION_TYPE_DROPDOWN, QUESTION_TYPE_MULTIPLE_TEXT, QUESTION_TYPE_RADIO, QUESTION_TYPE_RATING, QUESTION_TYPE_TEXT} from '../constants'

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

   // barChart
   dataBar = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
         {
            label: 'Anwers',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
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
               barPercentage: 1,
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

   buildBarChart(){

   }


   buildAnwserList(){

   }


   buildPieChart(){

   }

   buildSection(surveyResult, key) {
      const{question, answer} = surveyResult
      let chart = "Nothing to show";

      switch(question.type){
         case QUESTION_TYPE_TEXT || QUESTION_TYPE_MULTIPLE_TEXT || QUESTION_TYPE_COMMENT:
            break;
         case QUESTION_TYPE_BOOLEAN || QUESTION_TYPE_DROPDOWN|| QUESTION_TYPE_CHECKBOX || QUESTION_TYPE_RADIO:
            break;
         case QUESTION_TYPE_RATING:
            break;
      }

      return (
         <SectionContainer title={"Question " + key} header={question.name}  description={question.text} noBorder={true}>
            {chart}
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
         return (
            <MDBContainer>
               
               <SectionContainer title="Question 1" header="Fuck off?" description="test?" noBorder={true}>
                  <Bar data={this.dataBar} options={this.barChartOptions} />
               </SectionContainer>
               <hr className="my-5" />
            </MDBContainer>
         );
      }
   }
}

export default withRouter(SurveyResultDetails);
