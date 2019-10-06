import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPortfolio, setNetworkStatus } from '../../redux/actions';
import Hero from '../Hero/Hero';
import Navigation from '../Header/Navigation';
import Particles from 'react-particles-js';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

const mapStateToProps = state => {
  return {
    portfolioItems: !state.getNetworkStatus
      ? JSON.parse(getLocalStorage('items'))
      : state.requestPortfolio,
    hasNetworkConnection: state.getNetworkStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPortfolio: () => dispatch(fetchPortfolio()),
    onSetNetworkStatus: () => dispatch(setNetworkStatus())
  };
};

const getLocalStorage = key => {
  return localStorage.getItem(key);
};

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 300
      }
    },
    color: {
      value: '#ffffff'
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
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
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

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <section className="heading">
          <Particles className="particles" params={particlesOptions} />
          <div className="container">
            <Navigation />
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
