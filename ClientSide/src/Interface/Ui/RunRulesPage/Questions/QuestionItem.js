import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//component
import Nadia from 'src/Application/Nadia';
import QuestionIntType from './QuestionItems/QuestionIntType';
import QuestionBoolType from './QuestionItems/QuestionBoolType';
import QuestionDateType from './QuestionItems/QuestionDateType';
import QuestionStringType from './QuestionItems/QuestionStringType';
import QuestionDoubleType from './QuestionItems/QuestionDoubleType';
import QuestionHashType from './QuestionItems/QuestionHashType';
import QuestionUrlType from './QuestionItems/QuestionUrlType';
import QuestionUuidType from './QuestionItems/QuestionUuidType';

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
        questionDataType: PropTypes.object.isRequired,
    }

    _createQuestionItem=()=>{
        let questionItem;
        let questionText = this.props.questionData.questionText;
        switch(this.state.questionData.type)
        {
            case 'integer':
                questionItem = <QuestionIntType question = {questionText}/>
                break;
            
            case 'boolean':
                questionItem = <QuestionBoolType question = {questionText}/>
                break;

            case 'date':
                questionItem = <QuestionDateType question = {questionText}/>
                break;

            case 'defistring':
            case 'string':
                questionItem = <QuestionStringType question = {questionText}/>
                break;

            case 'double':
                questionItem = <QuestionDoubleType question = {questionText}/>
                break;

            case 'hash':
                questionItem = <QuestionHashType question = {questionText}/>
                break;

            case 'url':
                questionItem = <QuestionUrlType question = {questionText}/>
                break;

            case 'uuid':
                questionItem = <QuestionUuidType question = {questionText}/>
                break;
        }
        return questionItem;
    }
    
    // component render method
    render() {
        return (
            <Segment className='questionItem'>
              {this._createQuestionItem()}
            </Segment>
        );
    }
}
