import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import Clone from 'clone';

import {Form, Icon , Button, Segment , Header , Divider, List, Message} from 'semantic-ui-react';

//component
import QuestionItem from '../RunRulesPage/Questions/QuestionItem';
import AnsweredQuestionItem from '../RunRulesPage/Questions/AnsweredQuestionItem';
//application
import Nadia from 'src/Application/Nadia';



class RuleExecutionPage extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount = () => {
      this.setState({ruleName: this.props.ruleName});
      if(this.props.machineLearningOn == true)
      {
        Nadia.query.setNadiaForMachineLearning(this.props.ruleName, (res)=>{
          if(res.InferenceEngine == 'created'){
            this._getNextQuestion();
          }
        });
      }
      else{
        Nadia.query.setNadia(this.props.ruleName, (res)=>{
          if(res.InferenceEngine == 'created'){
            this._getNextQuestion();
          }
        });
      }
      
    }

    // componentDidMount=()=>{
    //   this._getNextQuestion();
    // }

    // initialise component state
    state = {
        summaryView: false,
        goalRule: {},
        nadiaReady: false,
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

    _reset=()=>{
      this.setState({
        summaryView: false,
        goalRule: {},
        nadiaReady: false,
        hasMoreQuestion: true,
        questions: [],
        answeredQuestionList: [],
        nextQuestion: {},
        questionnaire: [],
      })
    }


    _createButtonGroup=()=>{
      return(
            <Form.Group widths='equal' className='buttonField'>
              <Button floated='right' color='red' onClick={this._onCancel}>
                <Icon name='cancel'/>
                Cancel
              </Button>
              {
                
                !this.state.hasMoreQuestion && this.props.machineLearningOn?
                  <Button floated='right' color='yellow' onClick={this._onSaveSummary}>
                    <Icon name='save'/>
                    Save Summary
                  </Button>
                :
                  null
              }
              {
                this.state.summaryView?
                  <Button floated='right' color='violet' onClick={this._onSummary}>
                    <Icon name='puzzle'/>
                    Hide Summary
                  </Button>
                :
                  <Button floated='right' color='blue' onClick={this._onSummary}>
                    <Icon name='puzzle'/>
                    View Summary
                  </Button>
              }
              
              <Button floated='right' color='green' onClick={this._onRestart}>
                <Icon name='settings' />
                Restart
              </Button>                
            </Form.Group>
      );
    }

    _onRestart=()=>{

      this._reset();
      if(this.props.machineLearningOn == true)
      {
        Nadia.query.setNadiaForMachineLearning(this.props.ruleName, (res)=>{
          if(res.InferenceEngine == 'created'){
            this._getNextQuestion();
          }
        });
      }
      else{
        Nadia.query.setNadia(this.props.ruleName, (res)=>{
          if(res.InferenceEngine == 'created'){
            this._getNextQuestion();
          }
        });
      }
      
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
        if(res.hasMoreQuestion == 'true'){
          this._getNextQuestion();
        }
        else{
          let goalRuleData = {goalRuleName: res.goalRuleName, goalRuleValue: res.goalRuleValue, goalRuleType: res.goalRuleType};
          let goalRuleComponent = <QuestionItem key={res.goalRuleName} isGoalRule goalRuleData = {goalRuleData} />
          let tempQuestionnaire = Clone(this.state.questionnaire);
          tempQuestionnaire.unshift(goalRuleComponent);
  
          this.setState(
            {
              hasMoreQuestion: !this.state.hasMoreQuestion, 
              goalRule: goalRuleData,
              questionnaire: tempQuestionnaire,
            }
          );
        }
      });
    }

    _onEditAnswer=(question)=>{
      this.setState({questionnaire:[],questions:[]});
      Nadia.command.editAnswer(question,(res)=>{
        debugger;
        if(res.hasMoreQuestion == 'true'){
          let tempQuestionnaire = Clone(this.state.questionnaire);
          res.workingMemory.map((item)=>{
            let answeredQuestion = <AnsweredQuestionItem key={item.question} questionData = {item}  editAnswer={this._onEditAnswer}/>;
            
            tempQuestionnaire.unshift(answeredQuestion);
          });
          this.setState({questionnaire: tempQuestionnaire});
          this._getNextQuestion();
        }
        else{
          let goalRuleData = {goalRuleName: res.goalRuleName, goalRuleValue: res.goalRuleValue, goalRuleType: res.goalRuleType};
          let goalRuleComponent = <QuestionItem key={res.goalRuleName} isGoalRule goalRuleData = {goalRuleData}/>
          let tempQuestionnaire = Clone(this.state.questionnaire);
          tempQuestionnaire.unshift(goalRuleComponent);
  
          this.setState(
            {
              hasMoreQuestion: !this.state.hasMoreQuestion, 
              goalRule: goalRuleData,
              questionnaire: tempQuestionnaire,
            }
          );
        }
      });
    }

    _createQuestionnaire=(questionData)=>{

      let nextQuestionComponent = <QuestionItem key={questionData.questionText} questionData = {questionData} feedAnswer={this._feedAnswer} editAnswer={this._onEditAnswer}/>;
      let tempQuestionnaire = Clone(this.state.questionnaire);
      tempQuestionnaire.unshift(nextQuestionComponent);
      
      this.setState({questionnaire: tempQuestionnaire});
    }
    
    _viewSummary =()=>{

      Nadia.query.viewSummary((res)=>{
        let tempSummayrList = res?
                                res.reverse().map((item, index)=>{
                                  return(<List.Item key={index}>
                                          <List.Icon name='pin' />
                                          <List.Content>
                                            <List.Header>{item.nodeValue.toUpperCase()}</List.Header>
                                            <List.Description>{item.nodeText}</List.Description>
                                          </List.Content>
                                        </List.Item>);
                                })
                              :
                              [];
        let summaryBlock = tempSummayrList.length != 0?<Message color='teal'><List animated size='massive'>{tempSummayrList}</List></Message>: null;
        this.setState({summaryBlock: summaryBlock});
      });
    }

    _onSummary=()=>{
      this.setState({summaryView: !this.state.summaryView});
      this._viewSummary();
    }

    _onSaveSummary=()=>{
      Nadia.command.updateHistory(this.props.ruleName,(res)=>{
        if(res.update == 'done'){
          this.setState({updateHistory: 'done'});
          this._onRestart();
        }
      })
    }


    _onCancel=()=>{
      this.props.history.goBack();
    }
    // component render method
    render() {
      let summary = this.state.summaryView? this.state.summaryBlock : null;
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
            {summary}
            <Segment basic className= 'ruleEditor'>
                {this.state.questionnaire}
            </Segment>
          </div>
        );
    }
}
export default withRouter(RuleExecutionPage);

