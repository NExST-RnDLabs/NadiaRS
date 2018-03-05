import React from 'react';
import ReactDOM from 'react-dom';
import {Segment, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';

//component
import DateInputFields from '../QuestionItems/QuestionDateType/DateInputFields';



export default class GoalRuleDateType extends React.Component {
    constructor(props) {
      super(props);
    }
    
    // prop types and default values
    static propTypes = {
        goalRuleName: PropTypes.string.isRequired,
        goalRuleValue: PropTypes.string.isRequired,
    }

     
    // component render method
    render() {
        let dateInArray = this.props.goalRuleValue.split('/');
        let dayInputValue = dateInArray.shift();
        let monthInputValue = dateInArray.shift();
        let yearInputValue = dateInArray.shift();
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' possitive header= {question}/>
                <Segment attached='bottom' inverted color='green'>
                   <DateInputFields 
                        readOnly
                        dayInputValue= {dayInputValue}
                        monthInputValue= {monthInputValue}
                        yearInputValue= {dayInputValue}/>
                </Segment>
            </Segment.Group>
            
        );
    }
}
