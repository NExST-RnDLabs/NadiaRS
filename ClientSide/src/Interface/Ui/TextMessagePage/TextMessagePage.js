import React from 'react';
import ReactDOM from 'react-dom';
import {Form , Button, Icon , Segment , Header , Divider, SegmentGroup} from 'semantic-ui-react';

//application
import Nadia from 'src/Application/Nadia';

//style


//component
import RuleComponent from 'src/Interface/Global/Components/RuleComponent'

export default class TextMessagePage extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {
      Nadia.query.getAllRules((res)=>{
        let fields = res.map((item, index)=>{
          return(<div key={index}><RuleComponent key={index} type='text messages' ruleDescription={item} onSelectRule={this._onSelectRule}/> </div>)
          });
        this.setState({fields: fields});
      });
      
    }


    // initialise component state
    state = {
      dialogue:[],

    }

    // prop types and default values
    static propTypes = {

    }

    _onSelectRule=(ruleName)=>{
      if(this.props.onSelectRule){
        this.props.onSelectRule(ruleName);
      }
    }

    _messageSend=()=>{

    }
    
    // component render method
    render() {
        return (
            <div>
            <Segment basic size='mini' className='textMessageSegment'>
              <Header as='h3'>
                <Icon circular inverted color='teal' name='comments' size='tiny' />
                <Header.Content>
                  Text Message Demo
                </Header.Content>
              </Header>
              <Divider />
            </Segment>
            <Segment.Group>
                <Segment className= 'textDialogue'>
                    {this.state.dialogue}
                </Segment>
                <Segment>
                    <Input 
                        fluid 
                        icon='send outline'
                        iconPosition='left'
                        label={<Button color='green' onClick={this._messageSend}>Send</Button>}
                        placeholder='Type your message' />
                </Segment>
            </Segment.Group>
            
          </div>
        );
    }
}
