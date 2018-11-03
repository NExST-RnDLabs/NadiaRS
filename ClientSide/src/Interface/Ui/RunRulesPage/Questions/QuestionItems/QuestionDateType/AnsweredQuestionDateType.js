import React from 'react';
import ReactDOM from 'react-dom';
import {Button , Segment, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Moment from 'moment';

//component
import DateInputFields from './DateInputFields';

//style
import './QuestionDateType.scss';

export default class AnsweredQuestionDateType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
       
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
        debugger;
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.props.question);
        }
    }
     
    // component render method
    render() {
        let question = this.props.question+'?';
        let dateAnswerArray = this.state.answer.split('-');
        let dayInputValue = dateAnswerArray[2];
        let monthInputValue = dateAnswerArray[1];
        let yearInputValue = dateAnswerArray[0];
        debugger;
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                <Message className='answered-dateType-bottom-message' attached='bottom' color='olive'>
                    <DateInputFields 
                            readOnly
                            dayInputValue= {dayInputValue}
                            monthInputValue= {monthInputValue}
                            yearInputValue= {yearInputValue}/>
                </Message>
                <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
            </Segment.Group>           
        );
    }
}
