import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        {
          text: 'Home',
          link: 'top'
        },
        {
          text: 'Portfolio',
          link: 'portfolio'
        },
        { text: 'Contact', link: 'contact' }
      ],
      activeMenuItem: 'Home'
    };
  }

  handleClikMenu(menuItem) {
    const { activeMenuItem } = this.state;

    if (menuItem !== activeMenuItem) {
      this.setState({
        activeMenuItem: menuItem
      });
    }
  }

  handleToggleTheme() {
    this.props.handleToggleTheme(this.props.theme);
  }

  render() {
    const { menuItems, activeMenuItem } = this.state;
    if (!menuItems.length > 0) {
      return null;
    }

    return (
      <ul data-test="MenuComponent" className="nav__menu">
        {menuItems.map(({ text, link }, index) => {
          index++;
          return (
            <li
              className={`nav__item  nav__item--${index} ${
                text === activeMenuItem ? 'active' : ''
              }`}
              key={index}
            >
              <a
                className={`nav__item--${index}`}
                onClick={() => this.handleClikMenu(text)}
                href={`#${link}`}
              >
                {text}
              </a>
            </li>
          );
        })}
        <li className="nav__switch">
          <input type="checkbox" onClick={() => this.handleToggleTheme()} />
          <label className="" htmlFor="darkSwitch">
            Dark Mode
          </label>
        </li>
      </ul>
    );
  }
}

export default Menu;

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string
    })
  ),
  activeMenuItem: PropTypes.string
};
