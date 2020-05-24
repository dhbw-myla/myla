import React, { Component } from 'react';
import { Line, Bar, Radar, Pie, Doughnut, Polar } from 'react-chartjs-2';
import { MDBContainer, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import DocsLink from '../docsLink';
import SectionContainer from '../sectionContainer';

class Dashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         activeItem: "1"
      };
   }

   toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
      }
    };

   render() {
      return (
         <MDBContainer>
         <MDBNav className="nav-tabs mt-5">
           <MDBNavItem>
             <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
               Home
             </MDBNavLink>
           </MDBNavItem>
         </MDBNav>
         <MDBTabContent activeItem={this.state.activeItem} >
           <MDBTabPane tabId="1" role="tabpanel">
             <p className="mt-2">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit.
               Nihil odit magnam minima, soluta doloribus reiciendis
               molestiae placeat unde eos molestias. Quisquam aperiam,
               pariatur. Tempora, placeat ratione porro voluptate odit
               minima.
             </p>
           </MDBTabPane>
         </MDBTabContent>
       </MDBContainer>
      );
   }
}

export default Dashboard;
