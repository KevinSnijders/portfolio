import React from 'react';
import Image from '../Shared/Image';
import Logo from '../../../assets/images/logo.png';
import Menu from './Menu';

const Navigation = ({ handleToggleTheme, theme }) => {
  return (
    <nav data-test="NavigationComponent" className="nav fade-in-top">
      <Image source={Logo} alt="brand logo" style="nav__image" />
      <Menu handleToggleTheme={handleToggleTheme} theme={theme} />
    </nav>
  );
};

export default Navigation;
