import React from 'react';
import {
  setUpComponent,
  testComponentMatchSnapshot,
  testComponentIsRendered
} from '../../utils/index';
import Navigation from './Navigation';

const testComponent = 'NavigationComponent';

describe('Navigation Component', () => {
  describe('Snapshot renders', () => {
    testComponentMatchSnapshot(Navigation);
  });
  describe('With props', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Navigation);
    });
    it('Should render without errors', () => {
      testComponentIsRendered(component, testComponent, true);
    });
  });
});
