import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Segment } from 'semantic-ui-react';

//Application
import Nadia from 'src/Application/Nadia';

//component
import QuestionIntType from './QuestionItems/QuestionIntType/QuestionIntType';
import QuestionBoolType from './QuestionItems/QuestionBoolType/QuestionBoolType';
import QuestionDateType from './QuestionItems/QuestionDateType/QuestionDateType';
import QuestionStringType from './QuestionItems/QuestionStringType/QuestionStringType';
import QuestionDoubleType from './QuestionItems/QuestionDoubleType';
import QuestionHashType from './QuestionItems/QuestionHashType';
import QuestionUrlType from './QuestionItems/QuestionUrlType';
import QuestionUuidType from './QuestionItems/QuestionUuidType';

import GoalRuleBoolType from './GoalRuleItems/GoalRuleBoolType';
import GoalRuleDateType from './GoalRuleItems/GoalRuleDateType';
import GoalRuleStringType from './GoalRuleItems/GoalRuleStringType';

export default class QuestionItem extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {
     this.setState({questionData: this.props.questionData});
      
    }


    // initialise component state
    state = {
        questionData:null,
        

    }

    // prop types and default values
    static propTypes = {
        questionData: PropTypes.object,
        // isGoalRule: PropTypes.boolean,
        goalRuleData: PropTypes.object,
    }

    _onSaveClick=(question, inputValue)=>{
        if(this.props.feedAnswer){
            this.props.feedAnswer(question, inputValue);
        }
    }

    _displayGoalRule=()=>{
        let goalRuleText = this.props.goalRuleData.goalRuleName;
        let goalRuleValue = this.props.goalRuleData.goalRuleValue;
        let questionItem;

        switch(this.props.goalRuleData.goalRuleType)
        {
            case 'boolean':
                questionItem = <GoalRuleBoolType goalRuleName = {goalRuleText} goalRuleValue={goalRuleValue}/>
                break;

            case 'date':
                questionItem = <GoalRuleDateType goalRuleName = {goalRuleText} goalRuleValue={goalRuleValue}/>
                break;

            case 'uuid':
            case 'url':
            case 'hash':
            case 'double':
            case 'integer':
            case 'defistring':
            case 'string':
                questionItem = <GoalRuleStringType goalRuleName = {goalRuleText} goalRuleValue={goalRuleValue}/>
                break;

        }
        return questionItem;
    }

    _createQuestionItem=()=>{
        let questionItem;
        let questionText = this.props.questionData.questionText;
        switch(this.props.questionData.questionValueType)
        {
            case 'integer':
                questionItem = <QuestionIntType question = {questionText} onSave={this._onSaveClick}/>
                break;
            
            case 'boolean':
                questionItem = <QuestionBoolType question = {questionText} onSave={this._onSaveClick}/>
                break;

            case 'date':
                questionItem = <QuestionDateType question = {questionText} onSave={this._onSaveClick}/>
                break;

            case 'defistring':
            case 'string':
                questionItem = <QuestionStringType question = {questionText} onSave={this._onSaveClick}/>
                break;

            case 'double':
                questionItem = <QuestionDoubleType question = {questionText} onSave={this._onSaveClick}/>
                break;

            case 'hash':
                questionItem = <QuestionHashType question = {questionText} onSave={this._onSaveClick}/>
                break;

            case 'url':
                questionItem = <QuestionUrlType question = {questionText} onSave={this._onSaveClick}/>
                break;

            case 'uuid':
                questionItem = <QuestionUuidType question = {questionText} onSave={this._onSaveClick}/>
                break;
        }
        return questionItem;
    }
    
    // component render method
    render() {
        return (
            <Segment className='questionItem'>
                {this.props.isGoalRule?
                    this._displayGoalRule()
                    :
                    this._createQuestionItem()}
            </Segment>
        );
    }
}
