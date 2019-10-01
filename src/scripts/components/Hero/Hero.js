import React from 'react';

import Social from '../Social/Social';
import Button from '../Shared/Button';
import Image from '../Shared/Image';
import Photo from '../../../assets/images/kevin.png';
import Icon from '../Shared/Icon';

const Hero = () => {
  return (
    <>
      <div className="hero__intro jumbotron fade-in-top row d-flex align-items-center">
        <div className="col-6 col-lg-5 offset-lg-2 order-md-1 fade-in">
          <h1 className="display-4 text-shadow">
            <span>Hello, Im</span>Kevin Snijders
            <span className="m-fs">Web Developer</span>
          </h1>
          <Social />
          <Button link="#" style="btn--light mr-3" text="Download my resume" />
        </div>
        <div className="col-6 col-lg-3 order-md-2 fade-in-right">
          <Image source={Photo} alt="Image Kevin" style="scale-in-center" />
        </div>
      </div>
      <div className="hero__cta fade-in-bottom">
        <p className="m-fs mb-0">Learn more about what I do</p>
        <a className="hero__scroll-down" href="#portfolio">
          <Icon icon="keyboard_arrow_down" style="bounce" />
        </a>
      </div>
    </>
  );
};

export default Hero;
