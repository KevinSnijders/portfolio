import React from 'react';
import Image from '../Shared/Image';
import Logo from '../../../assets/images/logo.png';
import Menu from './Menu';

const Navigation = () => {
  return (
    <nav data-test="NavigationComponent" className="nav fade-in-top">
      <Image source={Logo} alt="brand logo" style="nav__image" />
      <Menu />
    </nav>
  );
};

export default Navigation;
