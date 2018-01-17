import React from 'react'

// client side router
import ClientRouterComponent from './ClientRouterComponent'

// screen components

module.exports = React.createClass({

  getInitialState: function() {
    return ({

      //selectedTabIndex starts from 1 not 0
      selectedTabIndex: 1,
      screens: []
    });
  },

  _setTabFocus: function(newIndex) {
    this.setState({selectedTabIndex: newIndex});
  },

  _noAutoScroll: function(hash) {

    var screenCount = this.state.screens.length;
    for(var i=0; i<screenCount; i++) {
      if(this.state.screens[i].hash==hash) {
        this.state.screens[i].autoScroll = false;
        break;
      }
    }

    this.setState({screens: this.state.screens});

  },

  _onTitleChange: function(hash, title, icons) {

    var screenCount = this.state.screens.length;
    for(var i=0; i<screenCount; i++) {
      if(this.state.screens[i].hash==hash) {
        this.state.screens[i].title = title;
        this.state.screens[i].icons = icons;
        break;
      }
    }

    this.setState({screens: this.state.screens});

  },

  _addTab: function(nav, route) {

    var component = this;

    var len = this.state.screens.length;

    var DestScreen = route.destination;

    var screen = {
      icons: ['browser'],
      title: nav.route,
      tab: <DestScreen {...nav.prams}
          key={len}
          onTitleChange={function(title, icons) {
            component._onTitleChange(nav.hash, title, icons)}}
          noAutoScroll={function() {
            component._noAutoScroll(nav.hash)}}
           />,
      canClose: true,
      autoScroll: component.props.scrollToTop,
      hash: nav.hash
    }

    // add to the end of the collection of screens
    this.state.screens.splice(len, 0, screen);

    var newState = {
      selectedTabIndex: len+1,
      screens: this.state.screens
    };

    this.setState(newState);

    // return the index of where the screen was added
    return len;

  },

   _onNavigate: function(nav, route) {

    // do we have a destination screen for this route?
    if(route.destination!=undefined) {

      // searh currently open screens
      var found = false;
      var index = null;
      var screenCount = this.state.screens.length;
      for(var i=0; i<screenCount; i++) {
        if(this.state.screens[i].hash==nav.hash) {
          found = true;
          index = i;
          break;
        }
      }

      // do we alrady have this screen open?
      if(found) {
        // yes - set focus to it
        this._setTabFocus(index+1);
      } else {
        // no - add it has a new tab
        index = this._addTab(nav, route);
      }

      // do we have scroll to top enabled on navigation?
      if(this.state.screens[index].autoScroll) {
        if(document.body.scrollTop == 0)
        {
          this._scrollTo(document.documentElement, 0, this.props.scrollSpeed);
        }
        else {
          this._scrollTo(document.body, 0, this.props.scrollSpeed);
        }
      }

      // raise callback
      if(this.props.onNavigate!=null) {
        this.props.onNavigate(nav, route);
      }

    }

  },


  _scrollTo: function(element, to, duration) {
      if (duration <= 0) {
        element.scrollTop = 0;
        return;
      }

      let difference = to - element.scrollTop;
      let perTick = difference / duration * 10;

      let component = this;
      setTimeout(function() {
          element.scrollTop = element.scrollTop + perTick;
          if (element.scrollTop == to) return;
          component._scrollTo(element, to, duration - 10);
      }, 10);
  },

  getDefaultProps: function() {
    return {
      showTabs: false,
      scrollToTop: true,
      scrollSpeed: 100,
      onNavigate: null,
    };
  },

  render: function () {

    var component = this;


    var renderWithoutTabs = function() {

      return (
        <div>
          {component.state.screens.length > 0 ?
            component.state.screens[component.state.selectedTabIndex-1].tab :
            null
          }
        </div>
      );
    }

    return (
      <div>

        <ClientRouterComponent onNavigate={this._onNavigate}>
          {this.props.children}
        </ClientRouterComponent>

        {this.props.showTabs ? renderWithTabs() : renderWithoutTabs()}

      </div>
    );
  }

});
