import React from 'react';
import ReactDOM from 'react-dom';
import {Segment, Header, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';

//style
import './GoalRuleBoolType.scss';

export default class GoalRuleBoolType extends React.Component {
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
        return (
                <Segment.Group raised className='questionIntItem'>
                    <Message attached='top' positive header={this.props.goalRuleName}/>
                    {this.props.goalRuleValue == 'true'?
                        <Message className='boolType-bottom-message' attached='bottom' color='olive'>
                            <Header floated='right' size = 'large'>{this.props.goalRuleValue.toUpperCase()}</Header>
                        </Message>
                        :
                        <Message className='boolType-bottom-message' attached='bottom' color='red'>
                            <Header floated='right' size = 'large'>{this.props.goalRuleValue.toUpperCase()}</Header>
                        </Message>
                    }
                </Segment.Group>
        );
    }
}
