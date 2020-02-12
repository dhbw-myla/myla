import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "bootstrap/dist/css/bootstrap.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import * as SurveyCore from "survey-core";
import * as SurveyPDF from "survey-pdf";
import * as widgets from "surveyjs-widgets";

import "pretty-checkbox/dist/pretty-checkbox.css";
import { MDBBtn } from "mdbreact";
//import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
//require("icheck");

export { MyQuestion } from "../Question/MyQuestion";

Survey.StylesManager.applyTheme("default");

//widgets.icheck(Survey, $);
widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

//widgets.icheck(SurveyCore, $);
widgets.prettycheckbox(SurveyCore);
widgets.select2(SurveyCore, $);
widgets.inputmask(SurveyCore);
widgets.jquerybarrating(SurveyCore, $);
widgets.jqueryuidatepicker(SurveyCore, $);
widgets.nouislider(SurveyCore);
widgets.select2tagbox(SurveyCore, $);
widgets.signaturepad(SurveyCore);
widgets.sortablejs(SurveyCore);
widgets.ckeditor(SurveyCore);
widgets.autocomplete(SurveyCore, $);
widgets.bootstrapslider(SurveyCore);

class SurveyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    console.log("Complete! " + result);
  }

  savePDF = model => {
    const { survey } = this.props;
    const surveyPDF = new SurveyPDF.SurveyPDF(survey);
    surveyPDF.data = model.data;
    surveyPDF.save();
  };

  render() {
    const { survey } = this.props;
    const model = new Survey.Model(survey);
    console.log('details', this.props)
    return (
      <div className="surveyjs">
        <Survey.Survey
          model={model}
          onComplete={this.onComplete}
          onValueChanged={this.onValueChanged}
        />
        <h3>SurveyPDF export:</h3>
        <MDBBtn onClick={() => this.savePDF(model)}>Save PDF</MDBBtn>

        <hr className="my-5" />

        <MDBBtn onClick={this.props.onClickReturn}>Return</MDBBtn>
      </div>
    );
  }
}

export default SurveyDetails;
