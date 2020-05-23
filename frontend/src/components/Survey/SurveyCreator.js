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
import 'select2/dist/css/select2.css';
import 'select2/dist/js/select2.js';
import * as SurveyJSCreator from 'survey-creator';
import 'survey-creator/survey-creator.css';
import * as SurveyKo from 'survey-knockout';
import * as widgets from 'surveyjs-widgets';
import './Survey.css';

SurveyJSCreator.StylesManager.applyTheme('default');

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
   surveyCreator;
   componentDidMount() {
      let options = { showEmbededSurveyTab: true };
      this.surveyCreator = new SurveyJSCreator.SurveyCreator('surveyCreatorContainer', options);
      this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
   }
   render() {
      return <div id="surveyCreatorContainer" />;
   }
   saveMySurvey = () => {
      console.log(JSON.stringify(this.surveyCreator.text));
   };
}

export default SurveyCreator;
