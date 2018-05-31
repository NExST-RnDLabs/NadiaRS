import React from 'react';
import ReactDOM from 'react-dom';
import { Link , Switch, Route } from 'react-router-dom';
import {Icon , Card , Segment, Item , Image , Sidebar , Menu , Dimmer} from 'semantic-ui-react';


//style
import './App.scss'

//components
import MenuSideBarComponent from './MenuBar/MenuSideBarComponent';
import MenuTop from './MenuBar/MenuTop';
import InitialPage from './InitialPage/InitialPage';
import ToastList from '../Global/Components/Toast Notification/ToastList';

//pages
import RunRulesPage from './RunRulesPage/RunRulesPage';
import ViewRulesPage from './ViewRulesPage/ViewRulesPage';
import RuleEditorPage from './RuleEditorPage/RuleEditorPage';
import RuleExecutionPage from './RuleExecutionPage/RuleExecutionPage';
import MachineLearningOnPage from './MachineLearningOnPage/MachineLearningOnPage';
import TextMessagePage from './TextMessagePage/TextMessagePage';

export default class App extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {

    }


    // initialise component state
    state = {
      sidebarVisible:false,
      selectedRule:'',
      machineLearningOn: false,
    }

    // prop types and default values
    static propTypes = {
    }

    static defaultProps = {

    }

    _onSelectRule=(ruleName)=>{
      this.setState({selectedRule: ruleName});
    }
    // private methods
    _onClick = () => {
      this.setState({sidebarVisible: !this.state.sidebarVisible})
    }

    _machineLearningOn=(passedMachineLearningOn)=>{
      this.setState({machineLearningOn: passedMachineLearningOn });
    }

    // component render method
    render() {
        return (
          <div>

            <Sidebar.Pushable as={Segment}>
              <MenuSideBarComponent visible={this.state.sidebarVisible} onSelection = {this._onClick}/>
              <Sidebar.Pusher>
                <Dimmer.Dimmable basic as={Segment} blurring dimmed={this.state.sidebarVisible}>
                <Dimmer active={this.state.sidebarVisible} onClickOutside={this._onClick} />
                  <ToastList bottom right/>
                  <MenuTop onClick = {this._onClick}/>
                  <Switch>
                    <Route exact path='/' component={InitialPage} />
                    <Route path='/RunRulesPage' component={()=> <RunRulesPage key={Date.now()} onSelectRule={this._onSelectRule}/>} />
                    <Route path='/ViewRulespage' component={()=> <ViewRulesPage key={Date.now()} onSelectRule={this._onSelectRule}/>}/>
                    <Route path='/RuleEditorPage' component={()=> <RuleEditorPage key={Date.now()} ruleName={this.state.selectedRule}/>}/>
                    <Route path='/RuleExecutionPage' component={()=> <RuleExecutionPage key={Date.now()} ruleName={this.state.selectedRule} machineLearningOn={this.state.machineLearningOn}/>}/>
                    <Route path='/MachineLearningOnPage' component={()=> <MachineLearningOnPage key={Date.now()} machineLearningOn={this.state.machineLearningOn} onChange={this._machineLearningOn}/>}/>
                    <Route path='/TextMessagePage' component={()=> <TextMessagePage key={Date.now()} onSelectRule={this._onSelectRule}/>} />
                  </Switch>
                </Dimmer.Dimmable>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
            
          </div>
        );
    }
}
