import React from 'react';
import Image from '../Shared/Image';
import Logo from '../../../assets/images/logo.png';
import Menu from './Menu';
import PropTypes from 'prop-types';

const Navigation = ({ handleToggleTheme, theme }) => {
  return (
    <nav
      data-test="NavigationComponent"
      className="nav navbar navbar-expand-lg navbar-dark fade-in-top"
    >
      <Image source={Logo} alt="brand logo" style="nav__image" />
      <Menu handleToggleTheme={handleToggleTheme} theme={theme} />
    </nav>
  );
};

export default Navigation;

Navigation.propTypes = {
  theme: PropTypes.string,
  handleToggleTheme: PropTypes.func
};
