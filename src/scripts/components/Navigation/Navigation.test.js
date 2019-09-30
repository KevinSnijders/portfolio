import React from 'react';
import {
  setUpComponent,
  testCompontentMatchSnapshot,
  testComponentIsRendered
} from '../../utils/index';
import Navigation from './Navigation';

const testComponent = 'NavigationComponent';

describe('Navigation Component', () => {
  describe('Snapshot renders', () => {
    testCompontentMatchSnapshot(Navigation);
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
