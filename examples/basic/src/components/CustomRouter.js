import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { connect } from 'react-redux';

import { getRoutes } from '../routes.js';

class CustomRouter extends PureComponent {
  UNSAFE_componentWillMount() {
    const { plugins, store } = this.props;

    this.routes = getRoutes(store, plugins);
  }

  render() {
    const { history } = this.props;

    return <Router history={history} routes={this.routes} />;
  }
}

CustomRouter.propTypes = {
  store: PropTypes.object.isRequired,
  plugins: PropTypes.array,
  history: PropTypes.any,
};

const mapStateToProps = state => ({
  plugins: state.pluginsHandler.files,
});

export default connect(mapStateToProps)(CustomRouter);
