import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Form, Icon , Button, Segment , Header , Divider} from 'semantic-ui-react';

//component
import Questionnaire from '../RunRulesPage/Questions/Questionnaire';

//application
import Nadia from 'src/Application/Nadia';



export default  class RuleExecutionPage extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {

      this.setState({ruleName: this.props.ruleName});
      this._getNextQuestion();
      
    }


    // initialise component state
    state = {
        goalRule:{},
        hasMoreQuestion: true,
        questions:[],
        answeredQuestionList:[],
        questionList:[],
    }

    // prop types and default values
    static propTypes = {
      ruleName: PropTypes.string,
    }




    _createButtonGroup=()=>{
      return(
            <Form.Group widths='equal' className='buttonField'>
              <Button floated='right' onClick={this._onCancel}>
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
      debugger;
      let questionData;
      if(this.state.questions.length != 0)
      {
        questionData = this._getNextQuestionFromBuffer();
        let tempQuestionList = Clone(this.state.questionList);
        tempQuestionList.push(questionData);
        this.setState({questionList: tempQuestionList});
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
          let tempQuestionList = Clone(this.state.questionList);
          tempQuestionList.push(questionData);
          this.setState({questions: res, questionList: tempQuestionList});
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

    _createQuestionnaire=()=>{
        let questionnaire = this.questionList.map((item, index)=>{
            return(<div key={index}><QuestionItem questionData = {item} feedAnswer={this._feedAnswer}/> </div>)
        });
        this.setState({questionnaire: questionnaire});
        return (questionList);
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
                {this._createQuestionnaire()}
            </Segment>
          </div>
        );
    }
}
