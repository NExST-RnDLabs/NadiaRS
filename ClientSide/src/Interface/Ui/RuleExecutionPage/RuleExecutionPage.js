import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Clone from 'clone';

import {Form, Icon , Button, Segment , Header , Divider} from 'semantic-ui-react';

//component
import QuestionItem from '../RunRulesPage/Questions/QuestionItem';

//application
import Nadia from 'src/Application/Nadia';



export default  class RuleExecutionPage extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount = () => {
      this.setState({ruleName: this.props.ruleName});
      Nadia.command.setNadia(this.props.ruleName);
      this._getNextQuestion();
      
    }


    // initialise component state
    state = {
        goalRule: {},
        hasMoreQuestion: true,
        questions: [],
        answeredQuestionList: [],
        nextQuestion: {},
        questionnaire: [],
    }

    // prop types and default values
    static propTypes = {
      ruleName: PropTypes.string,
    }




    _createButtonGroup=()=>{
      return(
            <Form.Group widths='equal' className='buttonField'>
              <Button floated='right' color='green' onClick={this._onCancel}>
                <Icon name='cancel'/>
                Cancel
              </Button>
              <Button floated='right' color='blue' onClick={this._onSummary}>
                <Icon name='puzzle'/>
                View Summary
              </Button>
              <Button floated='right' onClick={this._onRestart}>
                <Icon name='settings' />
                Restart
              </Button>                
            </Form.Group>
      );
    }

    _getNextQuestionFromBuffer=()=>{
      return this.state.questions.shift();
    }

    _getNextQuestion=()=>{

      let questionData;
      if(this.state.questions.length != 0)
      {
        questionData = this._getNextQuestionFromBuffer();

        this.setState({nextQuestion: questionData});
        this._createQuestionnaire(questionData);
      }
      else{
        Nadia.query.getNextQuestion(this.props.ruleName,(res)=>{
           /*
            * 'res' is an array of questions
            * if a certain node(rule) contains a number of variables(questions) to be asked then
            * 'res' contains a number of elements, otherwise the 'res' would be a length one array in other words,
            * it will contain only one question
            */
          questionData = res.shift();

          this.setState({questions: res, nextQuestion: questionData});
          this._createQuestionnaire(questionData);
        });
      }
    }

    _feedAnswer=(question, answer)=>{
      Nadia.command.feedAnswer(question, answer,(res)=>{
        if(res.hasMoreQuestion === true){
          this._getNextQuestion();
        }
        else{
          this.setState(
            {
              hasMoreQuestion: !this.state.hasMoreQuestion, 
              goalRule: 
                      {
                        goalRuleName: res.goalRuleName, 
                        goalRuleValue: res.goalRuleValue
                      }
            }
          );
        }
      });
    }

    _createQuestionnaire=(questionData)=>{
      let nextQuestionComponent = <QuestionItem key={questionData.questionText} questionData = {questionData} feedAnswer={this._feedAnswer}/>;
      let tempQuestionnaire = Clone(this.state.questionnaire);
      tempQuestionnaire.push(nextQuestionComponent);
      
      this.setState({questionnaire: tempQuestionnaire});
    }
    
    // component render method
    render() {
        return (
          <div>
            <Segment basic size='mini' className='runRuleSegment'>
              <Header as='h3'>
                <Icon circular inverted color='teal' name='cogs' size='tiny' />
                <Header.Content>
                  Execution Rule Set - {this.state.ruleName}
                </Header.Content>
              </Header>
              <Divider />
              {this._createButtonGroup()}
            </Segment>
            <Segment basic className= 'ruleEditor'>
                {this.state.questionnaire}
            </Segment>
          </div>
        );
    }
}
