import React from 'react';
import ReactDOM from 'react-dom';
import {Form , Button, Icon , Segment , Header , Divider} from 'semantic-ui-react';

//application
import Nadia from 'src/Application/Nadia';

//style
import './RunRulesPage.scss';

//component
import RuleComponent from 'src/Interface/Global/Components/RuleComponent'

export default class RunRulesPage extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {
      Nadia.query.getAllRules((res)=>{
        let fields = res.map((item, index)=>{
          return(<div key={index}><RuleComponent key={index} type='run rules' ruleDescription={item} onSelectRule={this._onSelectRule}/> </div>)
          });
        this.setState({fields: fields});
      });
      
    }


    // initialise component state
    state = {
      rules:[],
      fields:[],

    }

    // prop types and default values
    static propTypes = {

    }

    _onSelectRule=(ruleName)=>{
      if(this.props.onSelectRule){
        this.props.onSelectRule(ruleName);
      }
    }

    
    // component render method
    render() {
        return (
          <div>
            <Segment basic padded='very' className='runRuleSegment'>
              <Header as='h3'>
                <Icon circular inverted color='teal' name='cogs' size='tiny' />
                <Header.Content>
                  Run Rules
                </Header.Content>
              </Header>
              <Divider />
              {this.state.fields}
            </Segment>
          </div>
        );
    }
}
