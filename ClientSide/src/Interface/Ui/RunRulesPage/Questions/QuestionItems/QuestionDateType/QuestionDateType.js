import React from 'react';
import ReactDOM from 'react-dom';
import {Button , Segment, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Moment from 'moment';

//component
import DateInputFields from './DateInputFields';

//style
import './QuestionDateType.scss';

export default class QuestionDateType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayIsDirty: false,
            dayInputValue: '',
            monthIsDirty: false,
            monthInputValue: '',
            yearIsDirty: false,
            yearInputValue: '',
            dateInvalid: false,
            answered: false,
        }
    }

    
    
    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    _isDateValid=()=>{
        let checkDateValidation = new Moment(this.state.yearInputValue+'-'+this.state.monthInputValue+'-'+this.state.dayInputValue,'YYYY-MM-DD').isValid();
        if(!((this.state.dayIsDirty && this.state.monthIsDirty && this.state.yearIsDirty) && checkDateValidation)){
            this.setState({dateInvalid: !this.state.dateInvalid});
        }
        else{
            this.setState({dateValue: checkDateValidation.toString(), dateInvalid: !this.state.dateInvalid})
        }

    }

    _onDayChange=(dayNewValue)=>{
        this.setState({dayIsDirty: dayNewValue.trim().length > 0?true:false, dayInputValue: dayNewValue.trim()}); 
        this._isDateValid();
    }

    _onMonthChange=(monthNewValue)=>{
        this.setState({monthIsDirty: monthNewValue.trim().length > 0?true:false, monthInputValue: monthNewValue.trim()}); 
        this._isDateValid();
    }
   
    _onYearChange=(yearNewValue)=>{
        this.setState({yearIsDirty: yearNewValue.trim().length > 0?true:false, yearInputValue: yearNewValue.trim()}); 
        this._isDateValid();
    }
   
    _onSave=()=>{
        let dateValue = this.state.dayInputValue+'/'+this.state.monthInputValue+'/'+this.state.yearInputValue;
        if(this.props.onSave){
            this.props.onSave(this.props.question, {answer:dateValue, type:'date'});
            this.setState({answered: !this.state.answered});
        }
    }

    _onCancel=()=>{
        this.setState({dayIsDirty: false,
                        dayInputValue: {},
                        monthIsDirty: false,
                        monthInputValue: '',
                        yearIsDirty: false,
                        yearInputValue: '',
                        dateInvalid: false,
                        answered: !this.state.answered});
    }
     
    _onEditAnswer=()=>{
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.props.question);
        }
    }
    
    // component render method
    render() {
        let question = this.props.question+'?';
        return (
            this.state.answered?
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                <Message className='answered-dateType-bottom-message' attached='bottom' color='olive'>
                    <DateInputFields 
                            readOnly
                            dayInputValue= {this.state.dayInputValue}
                            monthInputValue= {this.state.monthInputValue}
                            yearInputValue= {this.state.yearInputValue}
                            dateInvalid= {this.state.dateInvalid}/>
                    <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>                
                </Message>
            </Segment.Group>
            :
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                <Segment.Group attached='bottom' horizontal>
                    <Segment basic className='dateField'>
                        <DateInputFields 
                                dayIsDirty= {false}
                                dayInputValue= {this.state.dayInputValue}
                                monthIsDirty= {false}
                                monthInputValue= {this.state.monthInputValue}
                                yearIsDirty= {false}
                                yearInputValue= {this.state.yearInputValue}
                                dateInvalid= {this.state.dateInvalid}
                                onDayChange ={this._onDayChange} 
                                onMonthChange = {this._onMonthChange} 
                                onYearChange = {this._onYearChange}/>
                        </Segment>
                        <Segment basic>
                        {this.state.dateInvalid?
                            <Button.Group size='large' className='question-date-type-buttons'>
                                <Button positive disabled>Save</Button>
                                <Button.Or />
                                <Button onClick={this._onCancel}>Cancel</Button>
                            </Button.Group>
                        :
                            <Button.Group size='large' className='question-date-type-buttons'>
                                <Button positive onClick={this._onSave}>Save</Button>
                                <Button.Or />
                                <Button onClick={this._onCancel}>Cancel</Button>
                            </Button.Group>
                        }
                        </Segment>
                </Segment.Group>
            </Segment.Group>
        );
    }
}
