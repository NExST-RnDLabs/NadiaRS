import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';




export default class AnsweredQuestionUrlType extends React.Component {
    constructor(props) {
        super(props);
        this.state ={

        }    
    }



    
    // prop types and default values
    static propTypes = {
        questionData: PropTypes.object,
        enditAnswer: PropTypes.func,
    }

    componentWillMount=()=>{
        this.setState({question: this.props.question, answer: this.props.answer});
    }
   
    _onEditAnswer=()=>{
        debugger;
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.state.question);
        }
    }
     
     
    // component render method
    render() {
        let question = this.props.question+'?';
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                <Segment attached='bottom' inverted color='green'>
                    <Message className='urlType-bottom-message' attached='bottom' color='olive'>
                        <Header floated='right' size = 'large'>{this.state.answer}</Header>
                        <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
                    </Message>
                </Segment>                    
            </Segment.Group>
        );
    }
}
