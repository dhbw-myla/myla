import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import Select from 'react-select';
import { getAllOwnSurveyMasters } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import SurveyCreateMasterCard from './SurveyCreateMasterCard';
import SurveyMasterCard from './SurveyMasterCard';

class SurveyDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSurvey: false,
         surveys: [],
         selectOptions: {},
         filteredSurveys: [],
      };
   }

   showSurvey = async (survey) => {
      this.setState({ showSurvey: true, surveyToShow: survey });
   };

   returnToOverview = () => {
      this.setState({ showSurvey: false, surveyToShow: null });
   };

   scrollToTop = () => window.scrollTo(0, 0);

   getHeading = (shouldShowSurvey) => {
      if (shouldShowSurvey) {
         return 'Edit Survey';
      } else {
         return 'Survey Master Paradise';
      }
   };

   onSelectChange = (value) => {
      const { surveys } = this.state;
      if (value !== null) {
         const filteredSurveys = surveys.filter((survey) => survey.survey_master_id === value.value);
         this.setState({ filteredSurveys });
      } else {
         this.setState({ filteredSurveys: surveys });
      }
   };

   loadSurveys = async () => {
      const user = getStoredUser();
      const resObj = await getAllOwnSurveyMasters(user);
      if (resObj && resObj.status === 200) {
         this.setState({ surveys: resObj.payload, filteredSurveys: resObj.payload });
      }
   };

   buildSelectOptions(surveys) {
      const selectOptions = [];
      if (Object.keys(surveys).length === 0) {
         return selectOptions;
      }

      surveys.forEach((survey) => selectOptions.push({ label: survey.title, value: survey.survey_master_id }));
      return selectOptions;
   }

   componentDidMount = async () => {
      //getAllOwnSurveyMasters
      this.loadSurveys();
   };

   render() {
      const { showSurvey, surveys, filteredSurveys } = this.state;
      const selectOptions = this.buildSelectOptions(surveys);

      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <div className="dhbw_header_margin">
                     <h2 className="text-center my-5 font-weight-bold">{this.getHeading(showSurvey)}</h2>
                  </div>
                  <hr className="mt-5" />
                  <Select
                     className="basic-single"
                     classNamePrefix="select"
                     name="survey-filter"
                     options={selectOptions}
                     onChange={this.onSelectChange}
                     isClearable={true}
                  />
                  <MDBRow id="categories">
                     <SurveyCreateMasterCard />
                     {filteredSurveys.map((survey, key) => (
                        <SurveyMasterCard
                           counter={key}
                           infos={{ survey, type: ((key + 1) % 3) + 1 }}
                           onClickSurvey={() => this.showSurvey(survey.id)}
                           loadSurveys={this.loadSurveys}
                        />
                     ))}
                  </MDBRow>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default SurveyDashboard;
