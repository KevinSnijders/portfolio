import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Shared/Button';
import Icon from '../Shared/Icon';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socials: [
        {
          icon: 'github-square-brands',
          link: '#'
        },
        {
          icon: 'linkedin-brands',
          link: '#'
        }
      ]
    };
  }

  getCurrentYear() {
    let date = new Date();
    return date.getFullYear();
  }

  renderSocialIcons(socials) {
    socials.map(({ icon, link }, index) => {
      return (
        <li key={index} className="pl-2 pr-2">
          <a href={`${link}`}>
            <Icon icon={`icon-${icon}`} />
          </a>
        </li>
      );
    });
  }

  render() {
    let { socials } = this.state;
    return (
      <footer data-test="FooterComponent" id="contact" className="footer">
        <div className="col-sm-auto fade-in-bottom">
          <Button link="#" style="btn--light mb-4" text="Contact me" />
          {socials !== undefined && socials.length > 0 ? (
            <div data-test="IconComponent" className="footer__social">
              <ul className="d-flex flex-row justify-content-center mb-4">
                {this.renderSocialIcons(socials)}
              </ul>
            </div>
          ) : null}
          <p className="footer__copyright">
            Kevin Snijders &copy; {this.getCurrentYear()} all rights reserved
          </p>
          <div className="footer__back-to-top">
            <a href="#top">
              <Icon icon="icon-keyboard_arrow_up" style="bounce" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

Footer.propTypes = {
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      link: PropTypes.string
    })
  )
};
