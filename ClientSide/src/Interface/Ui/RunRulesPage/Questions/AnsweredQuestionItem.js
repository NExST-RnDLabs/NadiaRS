import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Segment } from 'semantic-ui-react';

//Application
import Nadia from 'src/Application/Nadia';

//component
import AnsweredQuestionIntType from './QuestionItems/QuestionIntType/AnsweredQuestionIntType';
import AnsweredQuestionBoolType from './QuestionItems/QuestionBoolType/AnsweredQuestionBoolType';
import AnsweredQuestionDateType from './QuestionItems/QuestionDateType/AnsweredQuestionDateType';
import AnsweredQuestionStringType from './QuestionItems/QuestionStringType/AnsweredQuestionStringType';
import AnsweredQuestionDoubleType from './QuestionItems/QuestionDoubleType/AnsweredQuestionDoubleType';
import AnsweredQuestionHashType from './QuestionItems/QuestionHashType/AnsweredQuestionHashType';
import AnsweredQuestionUrlType from './QuestionItems/QuestionUrlType/AnsweredQuestionUrlType';
import AnsweredQuestionUuidType from './QuestionItems/QuestionUuidType/AnsweredQuestionUuidType';

export default class AnsweredQuestionItem extends React.Component {
    constructor(props) {
        super(props);
        // initialise component state
        this.state = {        
    
        }
    }

    componentDidMount = () => {
     this.setState({questionData: this.props.questionData});
      
    }


   

    // prop types and default values
    static propTypes = {
        questionData: PropTypes.object,
        enditAnswer: PropTypes.func,
    }


    _onEditAnswer=(question)=>{
        if(this.props.editAnswer){
            this.props.editAnswer(question)
        }
    }

   

    _createQuestionItem=()=>{
        let questionItem;
        let questionText = this.props.questionData.questionText;
        let answer = this.props.questionData.answer;
        switch(this.props.questionData.answerValueType)
        {
            case 'integer':
                questionItem = <AnsweredQuestionIntType question = {questionText} answer ={answer} onEditAnswer={this._onEditAnswer}/>
                break;
            
            case 'boolean':
                questionItem = <AnsweredQuestionBoolType question = {questionText} answer ={answer} onEditAnswer={this._onEditAnswer}/>
                break;

            case 'date':
                questionItem = <AnsweredQuestionDateType question = {questionText} answer ={answer} onEditAnswer={this._onEditAnswer}/>
                break;

            case 'defistring':
            case 'string':
                questionItem = <AnsweredQuestionStringType question = {questionText} answer ={answer} onEditAnswer={this._onEditAnswer}/>
                break;

            case 'double':
                questionItem = <AnsweredQuestionDoubleType question = {questionText} answer ={answer} onEditAnswer={this._onEditAnswer}/>
                break;

            case 'hash':
                questionItem = <AnsweredQuestionHashType question = {questionText} answer ={answer} onEditAnswer={this._onEditAnswer}/>
                break;

            case 'url':
                questionItem = <AnsweredQuestionUrlType question = {questionText} answer ={answer} onEditAnswer={this._onEditAnswer}/>
                break;

            case 'uuid':
                questionItem = <AnsweredQuestionUuidType question = {questionText} answer={answer} onEditAnswer={this._onEditAnswer}/>
                break;
        }
        return questionItem;
    }
    
    // component render method
    render() {
        debugger;
        return (
            <Segment className='questionItem'>
                {this._createQuestionItem()}
            </Segment>
        );
    }
}
