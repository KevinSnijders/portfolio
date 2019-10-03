import React from 'react';
import {
  setUpComponent,
  testComponentMatchSnapshot,
  testComponentIsRendered
} from '../../utils/index';
import Social from './Social';

const testComponent = 'SocialComponent';
const props = [
  {
    icon: 'github-square-brands',
    link: '#'
  },
  {
    icon: 'linkedin-brands',
    link: '#'
  }
];

describe('Social Component', () => {
  describe('Match Snapshot', () => {
    testComponentMatchSnapshot(Social);
  });
  describe('Social icons with state', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Social);
      component.setState({
        socials: props
      });
    });
    it('Should render socials', () => {
      testComponentIsRendered(component, testComponent, true);
    });
  });
  describe('Social icons without state', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Social);
      component.setState({
        socials: []
      });
    });
    it('Should not render socials', () => {
      testComponentIsRendered(component, testComponent, false);
    });
  });
});
