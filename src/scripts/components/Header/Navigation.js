import React from 'react';
import Image from '../Shared/Image';
import Logo from '../../../assets/images/logo.png';
import Menu from './Menu';

const backgroundStyle = {
  backgroundColor: '#282c34'
};
const Navigation = () => {
  return (
    <nav data-test="NavigationComponent" style={backgroundStyle} className="nav fade-in-top">
      <div className="container">
        <Image source={Logo} alt="brand logo" style="nav__image" />
        <Menu />
      </div>
    </nav>
  );
};

export default Navigation;
