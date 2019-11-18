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
      activeMenuItem: 'Home',
      shouldShowSmallMenu: false
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

  handleToggleMenu() {
    this.setState({ shouldShowSmallMenu: !this.state.shouldShowSmallMenu });
  }

  render() {
    const { menuItems, activeMenuItem, shouldShowSmallMenu } = this.state;
    const show = shouldShowSmallMenu ? 'show' : '';
    let theme = this.props.theme;
    let isToggled = theme === 'dark' ? true : false;

    if (!menuItems.length > 0) {
      return null;
    }

    return (
      <>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => this.handleToggleMenu()}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${show}`}>
          <ul data-test="MenuComponent" className=" navbar-nav">
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
            <li className="nav__switch" onClick={() => this.handleToggleTheme()}>
              <input type="checkbox" checked={isToggled} />
              <label htmlFor="darkSwitch">{isToggled ? 'Dark' : 'Light'} Mode</label>
            </li>
          </ul>
        </div>
      </>
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
  activeMenuItem: PropTypes.string,
  theme: PropTypes.string,
  handleToggleTheme: PropTypes.func
};
