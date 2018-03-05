import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Icon , Segment, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';




export default class GoalRuleStringType extends React.Component {
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
        let question = this.props.question+'?';
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' possitive header= {this.props.goalRuleName}/>
                <Segment attached='bottom'>
                    <Input floated='right' disabled value={this.props.goalRuleValue}/>
                </Segment>
            </Segment.Group>
        );
    }
}
