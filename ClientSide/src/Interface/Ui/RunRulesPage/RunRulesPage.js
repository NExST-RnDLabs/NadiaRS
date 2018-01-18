import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import {Icon , Segment, Item , Header , Divider} from 'semantic-ui-react';

//application
import Nadia from 'src/Application/Nadia';

//style
import './RunRulesPage.scss';

export default class App extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {
      Nadia.query.getAllRules((res)=>{
        this.setState({rules: res});
      })
    }


    // initialise component state
    state = {
      rules:[],
    }

    // prop types and default values
    static propTypes = {

    }

    // component render method
    render() {
      let component = this;
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
            </Segment>
           
          </div>
        );
    }
}
