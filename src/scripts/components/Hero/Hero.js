import React from 'react';

import Social from '../Social/Social';
import Button from '../Shared/Button';
import Image from '../Shared/Image';
import Photo from '../../../assets/images/kevin.png';
import Icon from '../Shared/Icon';

const Hero = () => {
  return (
    <>
      <div className="hero__intro fade-in-top row d-flex align-items-center">
        <div className="col-12 col-sm-7 col-lg-5 offset-lg-2 order-2 order-sm-1 fade-in">
          <h1 className="display-4 text-shadow">
            <span>{`Hello, I'm`}</span>Kevin Snijders
            <span className="m-fs">Web Developer</span>
          </h1>
          <Social />
          <Button link="#" style="btn--primary btn--big mr-3" text="Download my resume" />
        </div>
        <div className="col col-sm-5 col-lg-3 order-1 order-sm-2 fade-in-right">
          <Image source={Photo} alt="A selfie of me" style="scale-in-center" />
        </div>
      </div>
      <div className="hero__cta fade-in-bottom">
        <p className="m-fs mb-0">Learn more about what I do</p>
        <a
          className="hero__scroll-down"
          href="#portfolio"
          aria-label="click here to scroll to the portfolio section"
        >
          <Icon icon="keyboard_arrow_down" style="bounce" />
        </a>
      </div>
    </>
  );
};

export default Hero;
