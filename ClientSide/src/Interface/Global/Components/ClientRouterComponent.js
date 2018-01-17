import React from 'react'

import Bus from 'src/Infrastructure/Bus';

// Client Router Component class
var ClientRouterComponent = React.createClass({


  _navigated: function() {

    let component = this;

    function parseQuery(urlhash) {
        var query = {};
        var qstr = urlhash;
        var qr = qstr.split('?');

        if (qr.length==2)
        {
          qstr = qr[1];
          var a = qstr.split('&');
          for (var i = 0; i < a.length; i++) {
              var b = a[i].split('=');
              query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
          }
        } else {
          query = null
        }
        return ({route: qr[0], prams: query, hash: urlhash});
    };

    var normalizedHash = window.location.hash.replace(/^#\/?|\/$/g, '');

    var navigation = parseQuery(normalizedHash);

    function findRoutes(match) {
      // find routes
      let homeRoute = null
      let notFoundRoute = null
      let matchingRoute = null
      React.Children.forEach(component.props.children, function(i) {

        // find home route
        if((i.type === ClientRouterComponent.Route.Home)) {
          homeRoute = i.props;
        }

        // find not found route
        if((i.type === ClientRouterComponent.Route.NotFound)) {
          notFoundRoute = i.props;
        }

        // find Route elements for destination screens
        if((i.type === ClientRouterComponent.Route) && (i.props.route==match)) {
          matchingRoute = i.props;
        }

      });

      return {homeRoute, notFoundRoute, matchingRoute};
    }

    let {homeRoute, notFoundRoute, matchingRoute} = findRoutes(navigation.route);

    // if navigating home
    if (navigation.route=='') {

      // is a home route defined?
      if(homeRoute!=null) {
        // yes - re-route to it to destination route
        let search = findRoutes(homeRoute.destination);
        matchingRoute = search.matchingRoute;
        navigation.route = homeRoute.destination;
        navigation.hash = homeRoute.destination + navigation.hash;

        // replace hash (internal re-direct - does not cause a navigation)
        // check if HTML5 History API is available?
        let hasHistoryApi = !!(window.history && window.history.replaceState);
        if(hasHistoryApi) {
          // yes - use it for maximum compatibility
          window.history.replaceState(undefined, undefined, '#' + homeRoute.destination)
        } else {
          // no - do it the old school way
          window.location.replace('#' + homeRoute.destination);
        }
      }
    }

    // if no destination found set to notFoundRoute
    if(matchingRoute==null) {
      matchingRoute = notFoundRoute
    }

    // if still nowhere to go - rais error
    if(matchingRoute==null) {

      // we're not already going to the error page are we?
      if(navigation.route!='error') {
        // no - call bus error
        Bus.error({component: 'ClientRouterComponent', message: 'No Route found'});
      }

      // doesn't trigger navigation event or callback
      return;
    }

    this.props.onNavigate(navigation, matchingRoute);
    Bus.publish('router.navigate')

  },

  componentDidMount: function() {

    // route initial url hash
    this._navigated()

    // route any subsequent url hash change
    window.addEventListener('hashchange', this._navigated, false);
  },

  render: function () {
    // this component does not render
    return null;
  }

});


// Route component class
ClientRouterComponent.Route = React.createClass({

  propTypes: {

    // properties
    route: React.PropTypes.string.isRequired,
    destination: React.PropTypes.func.isRequired,
  },

  render: function () {
    // this component does not render
    return null;
  }

});

// Route home component class
ClientRouterComponent.Route.Home = React.createClass({

  propTypes: {

    // properties
    destination: React.PropTypes.string.isRequired,
  },

  render: function () {
    // this component does not render
    return null;
  }

});

// Route component class
ClientRouterComponent.Route.NotFound = React.createClass({

  propTypes: {

    // properties
    destination: React.PropTypes.func.isRequired,
  },

  render: function () {
    // this component does not render
    return null;
  }

});

module.exports = ClientRouterComponent;
