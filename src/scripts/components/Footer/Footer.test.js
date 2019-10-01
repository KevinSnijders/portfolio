import React from 'react';
import {
  setUpComponent,
  testComponentMatchSnapshot,
  testComponentIsRendered,
  findByHTML
} from '../../utils/index';
import Footer from './Footer';

const testComponent = 'FooterComponent';
const state = {
  socials: [
    {
      icon: 'github-square-brands',
      link: '#'
    },
    {
      icon: 'linkedin-brands',
      link: '#'
    }
  ]
};

describe('Footer Component', () => {
  describe('Match Snapshot', () => {
    testComponentMatchSnapshot(Footer, state);
  });
  describe('Check PropTypes', () => {});
  describe('Footer correct state', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Footer, state);
    });
    it('Should render without errors', () => {
      testComponentIsRendered(component, testComponent, true);
    });
  });
  describe('Social icons', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Footer);
      component.setState({
        socials: []
      });
    });
    it('Should not render socials without state', () => {
      testComponentIsRendered(component, 'IconComponent', false);
    });
  });
});
