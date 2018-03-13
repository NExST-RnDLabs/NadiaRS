import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import {Form , Radio, Button, Header, Icon, Segment, Message} from 'semantic-ui-react';

//application
import Nadia from 'src/Application/Nadia';

//style
import './MachineLearningOnPage.scss';
//component
import RuleComponent from 'src/Interface/Global/Components/RuleComponent'

class MachineLearningOnPage extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount=()=>{
        this.setState({machineLearningOn: this.props.machineLearningOn});
    }
    // initialise component state
    state = {
     

    }

    // prop types and default values
    static propTypes = {

    }

    _onChange=()=>{
        this.setState({machineLearningOn: !this.state.machineLearningOn });
        if(this.props.onChange){
            this.props.onChange(!this.state.machineLearningOn);
      }
    }
    _onClick=()=>{
        this.props.history.goBack();
    }
    
    // component render method
    render() {
        return (
            <Segment basic textAlign='center'>
                <Message info>
                    <Form>
                        <Form.Field>
                            <Header as='h2'>
                                <Icon name='plug' />
                                <Header.Content>
                                    Machine Learning {this.state.machineLearningOn?'ON':'OFF'}!
                                </Header.Content>
                            </Header>
                        </Form.Field>
                        
                        <Form.Field>
                            <Radio 
                                toggle
                                checked = {this.state.machineLearningOn}
                                onChange = {this._onChange}
                            />
                            <div>
                                <Button negative onClick={this._onClick}>Back</Button>
                            </div>
                        </Form.Field>
                    </Form>
                </Message>
                 
            </Segment>
           
        );
    }
}
export default withRouter(MachineLearningOnPage);
