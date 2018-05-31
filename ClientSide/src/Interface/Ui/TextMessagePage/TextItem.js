import React from 'react';
import ReactDOM from 'react-dom';
import {Form , Button, Icon , Segment , Header , Divider, SegmentGroup} from 'semantic-ui-react';

//application
import Nadia from 'src/Application/Nadia';

//style



export default class TextItem extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {
     
    }


    // initialise component state
    state = {
      subject:'',
      text:'',

    }

    // prop types and default values
    static propTypes = {
        subject: PropTypes.string,
        text: PropTypes.string,
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
