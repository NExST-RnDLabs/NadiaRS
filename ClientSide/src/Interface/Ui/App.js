import React from 'react';
import ReactDOM from 'react-dom';
import { Link , Switch, Route } from 'react-router-dom';
import {Icon , Card , Segment, Item , Image , Sidebar , Menu , Dimmer} from 'semantic-ui-react';


//style
import './App.scss'

//components
import MenuSideBarComponent from './MenuBar/MenuSideBarComponent';
import MenuTop from './MenuBar/MenuTop';
import InitialPage from './InitialPage/InitialPage'

import RunRulesPage from './RunRulesPage/RunRulesPage';
export default class App extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {

    }


    // initialise component state
    state = {
      sidebarVisible:false,
    }

    // prop types and default values
    static propTypes = {
    }

    static defaultProps = {

    }

    // private methods
    _onClick = () => {
      this.setState({sidebarVisible: !this.state.sidebarVisible})
    }

    // component render method
    render() {
        return (
          <div>
            <Sidebar.Pushable as={Segment}>
              <MenuSideBarComponent visible={this.state.sidebarVisible} onSelection = {this._onClick}/>
              <Sidebar.Pusher>
                <Dimmer.Dimmable as={Segment} blurring dimmed={this.state.sidebarVisible}>
                <Dimmer active={this.state.sidebarVisible} onClickOutside={this._onClick} />
                  <MenuTop onClick = {this._onClick}/>
                  <Switch>
                    <Route exact path="/" component={InitialPage} />
                    <Route path="/RunRulesPage" component={RunRulesPage} />
                  </Switch>
                </Dimmer.Dimmable>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
            
          </div>
        );
    }
}
