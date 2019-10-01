import React from 'react';
import {
  setUpComponent,
  testComponentMatchSnapshot,
  testComponentIsRendered,
  findByHTML
} from '../../utils/index';
import Footer from './Footer';

const testComponent = 'FooterComponent';

describe('Footer Component', () => {
  describe('Match Snapshot', () => {
    testComponentMatchSnapshot(Footer);
  });
  describe('Check PropTypes', () => {});
  describe('Footer correct state', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Footer);
    });
    it('Should render without errors', () => {
      testComponentIsRendered(component, testComponent, true);
    });
  });
});
