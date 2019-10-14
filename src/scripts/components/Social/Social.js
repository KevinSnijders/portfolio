import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Shared/Icon';

class Social extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socials: [
        {
          icon: 'github-square-brands',
          link: 'https://github.com/KevinSnijders'
        },
        {
          icon: 'linkedin-brands',
          link: 'https://nl.linkedin.com/in/kevin-snijders-7822a3105'
        }
      ]
    };
  }

  renderSocialIcons(socials) {
    return socials.map(({ icon, link }, index) => {
      return (
        <li key={index} className="pl-2 pr-2">
          <a
            href={`${link}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="display a brand icon"
          >
            <Icon icon={`${icon}`} />
          </a>
        </li>
      );
    });
  }

  render() {
    let { socials } = this.state;
    let { style } = this.props;
    return (socials !== undefined && socials.length) > 0 ? (
      <ul
        data-test="SocialComponent"
        className={`d-flex flex-row ${style !== undefined ? style : ''}`}
      >
        {this.renderSocialIcons(socials)}
      </ul>
    ) : null;
  }
}

export default Social;

Social.propTypes = {
  style: PropTypes.string
};
