import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPortfolio, setNetworkStatus, setTheme } from '../../redux/actions';
import Hero from '../Hero/Hero';
import Navigation from '../Header/Navigation';
import Particles from 'react-particles-js';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

const mapStateToProps = state => {
  console.log(state);
  return {
    items: setItems(state),
    hasNetworkConnection: state.getNetworkStatus,
    theme: state.getTheme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPortfolio: () => dispatch(fetchPortfolio()),
    onSetNetworkStatus: () => dispatch(setNetworkStatus()),
    onChangeTheme: theme => dispatch(setTheme(theme))
  };
};

const setItems = state => {
  let data;
  const { getNetworkStatus, requestPortfolio } = state;
  switch (getNetworkStatus) {
    case true:
      data = requestPortfolio;
      break;
    case false:
      data = JSON.parse(getLocalStorage('items'));
      break;
    default:
      data = [];
  }
  return data;
};

const getLocalStorage = key => {
  return localStorage.getItem(key);
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  configParticles() {
    let color = '#000';
    return {
      particles: {
        number: {
          value: 150,
          density: {
            enable: true,
            value_area: 300
          }
        },
        color: {
          value: color
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.25,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 3,
            size_min: 0.3,
            sync: false
          }
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'bottom-right',
          random: true,
          straight: true,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 600
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
            mode: 'bubble'
          },
          onclick: {
            enable: false,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3
          },
          repulse: {
            distance: 400,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };
  }

  handleToggleTheme = currentTheme => {
    this.switchTheme(currentTheme);
  };

  switchTheme(currentTheme) {
    const theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.props.onChangeTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  render() {
    return (
      <>
        <section className="heading">
          <Particles className="particles" params={this.configParticles()} />
          <div className="container">
            <Navigation {...this.props} handleToggleTheme={this.handleToggleTheme} />
            <Hero></Hero>
          </div>
        </section>
        <Portfolio {...this.props} />
        <Footer />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

Home.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      demo: PropTypes.string,
      source: PropTypes.string,
      preview: PropTypes.string,
      resources: PropTypes.arrayOf(
        PropTypes.shape({
          projectid: PropTypes.number,
          name: PropTypes.string
        })
      )
    })
  )
};
