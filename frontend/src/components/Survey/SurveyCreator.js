import 'bootstrap-slider/dist/css/bootstrap-slider.css';
import $ from 'jquery';
import 'jquery-bar-rating';
import 'jquery-bar-rating/dist/themes/css-stars.css';
import 'jquery-bar-rating/dist/themes/fontawesome-stars.css';
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/datepicker.js';
import 'nouislider/distribute/nouislider.css';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'select2/dist/css/select2.css';
import 'select2/dist/js/select2.js';
import * as SurveyJSCreator from 'survey-creator';
import 'survey-creator/survey-creator.css';
import * as SurveyKo from 'survey-knockout';
import * as widgets from 'surveyjs-widgets';
import { createSurveyMaster } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import './Survey.css';
import { surveys } from './surveys';
import { SURVEY } from '../constants';
import './SurveyEditor.css';

const mainColor = '#e30613';

const defaultThemeColorsEditor = SurveyJSCreator.StylesManager.ThemeColors['default'];
defaultThemeColorsEditor['$primary-color'] = mainColor;
defaultThemeColorsEditor['$secondary-color'] = mainColor;
defaultThemeColorsEditor['$primary-hover-color'] = mainColor;
//defaultThemeColorsEditor['$primary-text-color'] = mainColor;
defaultThemeColorsEditor['$selection-border-color'] = mainColor;
//defaultThemeColorsEditor['$main-color'] = mainColor;
defaultThemeColorsEditor['$main-hover-color'] = mainColor;
defaultThemeColorsEditor['$text-color'] = mainColor;
//defaultThemeColorsEditor['$header-color'] = mainColor;
//defaultThemeColorsEditor['$header-background-color'] = mainColor;
defaultThemeColorsEditor['$body-container-background-color'] = mainColor;
//defaultThemeColorsEditor['$btn-primary'] = mainColor;

SurveyJSCreator.StylesManager.applyTheme();

// SurveyJSCreator.StylesManager.applyTheme('default');

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class SurveyCreator extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   surveyCreator;

   saveCreatedSurvey = async () => {
      const user = getStoredUser();
      const createdSurvey = JSON.parse(this.surveyCreator.text);
      const resObj = await createSurveyMaster(user, createdSurvey);
      if (resObj && resObj.status === 201) {
         swalHelper.success('Survey Master saved!', 'Survey Master has been saved successfully! You can access it via Survey Masters.');
         this.props.history.push('/' + SURVEY);
      } else {
         return swalHelper.error('Could not save Survey Master!', 'Please try again.');
      }
   };

   componentDidMount() {
      let options = { showEmbededSurveyTab: false, showTranslationTab:false, showTestSurveyTab:true, showJSONEditorTab:false, designerHeight:""  };
      const {surveyToEdit} = this.props.history.location;
      debugger
      this.surveyCreator = new SurveyJSCreator.SurveyCreator('surveyCreatorContainer', options);
      if (surveyToEdit) {
         const {surveyMaster, surveyjs} = surveyToEdit;
         //this.surveyCreator.text = surveyjs;
         //this.surveyCreator = new SurveyJSCreator.SurveyEditor(surveys[0]);
         //this.surveyCreator = new SurveyJSCreator.SurveyEditor();
      }
      this.surveyCreator.saveSurveyFunc = this.saveCreatedSurvey;

      //Change and remove useless things
      document.getElementsByClassName('svd_survey_header--hidden')[0].classList.remove("svd_survey_header--hidden");
   }

   render() {
      return <div id="surveyCreatorContainer" />;
   }
}

export default withRouter(SurveyCreator);
