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
      
      Nadia.query.getNextQuestion(this.props.ruleName,(res)=>{
        if(res){

          this.setState({goalRule : res.goalRule, nextQuestion : res.nextQuestion});
        }
      });
    }


    // initialise component state
    state = {
        goalRule:'',
        nextQuestion:'',
        hasMoreQuestion: true,
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

    _createQuestionnaire=()=>{
        let questionnaire = this.questionList.map((item, index)=>{
            return(<div key={index}><QuestionItem questionData = {this.state.nextQuestion}/> </div>)
        });
        this.setState({questionnaire: questionnaire});

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
