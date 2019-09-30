import React from 'react';
import { shallow } from 'enzyme';
import {
  setUpComponent,
  checkProps,
  testCompontentMatchSnapshot,
  testComponentIsRendered
} from '../../utils/index';
import Menu from './Menu';

const testComponent = 'MenuComponent';
const configProps = {
  menuItems: [
    { text: 'Home', link: 'top' },
    { text: 'Portfolio', link: 'portfolio' },
    { text: 'Contact', link: 'contact' }
  ],
  activeMenuItem: 'Home'
};

describe('Menu Component', () => {
  describe('Snapshot renders', () => {
    testCompontentMatchSnapshot(Menu);
  });
  describe('Check PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = configProps;
      const propsErr = checkProps(Menu, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });
  describe('Menu with correct state', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Menu);
      component.setState({
        menuItems: configProps.menuItems,
        activeMenuItem: configProps.activeMenuItem
      });
    });
    it('Should render without errors', () => {
      testComponentIsRendered(component, testComponent, true);
    });
    it('First item has active class by default', () => {
      const firstMenuItem = component.find('li.nav__item--1');
      console.log(firstMenuItem);
      expect(firstMenuItem.hasClass('active')).toBeTruthy();
    });
    it('should change active menu item onClick', () => {
      const link = component.find('a.nav__item--2');
      link.simulate('click');
      const secondMenuItem = component.find('li.nav__item--2');
      expect(secondMenuItem.hasClass('active')).toBeTruthy();
    });
  });
  describe('Menu with empty state', () => {
    let component;
    beforeEach(() => {
      component = setUpComponent(Menu);
      component.setState({
        menuItems: [],
        activeMenuItem: null
      });
    });
    it('Should NOT render without errors', () => {
      testComponentIsRendered(component, testComponent, false);
    });
  });
});
