import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment, Message, Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';


//style
import './QuestionStringType.scss';

export default class AnsweredQuestionStringType extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
        
        } 
    }

    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,  
    }

    componentWillMount=()=>{
        this.setState({question: this.props.question, answer: this.props.answer});
    }
   
    _onEditAnswer=()=>{
        
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
                <Message className='answered-stringType-bottom-message' attached='bottom' color='olive'>
                    <Header className='input-value'size = 'large'>{this.state.answer}</Header>
                    <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>                
                </Message>
            </Segment.Group>
        );
    }
}
