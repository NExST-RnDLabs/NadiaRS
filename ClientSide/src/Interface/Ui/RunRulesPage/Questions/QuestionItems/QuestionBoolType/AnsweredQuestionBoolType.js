import React from 'react';
import ReactDOM from 'react-dom';
import {Button , Segment, Header, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';

//style
import './QuestionBoolType.scss'

export default class AnsweredQuestionBoolType extends React.Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }

   
    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
    }

    static defaultProps = {

    };
   
    componentWillMount=()=>{
        this.setState({question: this.props.question, answer: this.props.answer});
    }

    _onEditAnswer=()=>{
        debugger;
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.props.question);
        }
    }
     
    // component render method
    render() {
        return (
            this.state.answer == 'true'?
                <Segment.Group raised className='questionIntItem'>
                    <Message attached='top' info header='Is the following statement true?'/>
                    <Segment attached='bottom' inverted color='green'>
                        <Header size = 'medium'>{this.props.question}</Header>
                        <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
                    </Segment>
                </Segment.Group>
                :
                <Segment.Group raised className='questionIntItem'>
                    <Message attached='top' info header='Is the following statement true?'/>
                    <Segment attached='bottom' inverted color='red'>
                        <Header size = 'medium'>{this.props.question}</Header>
                        <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
                    </Segment>
                </Segment.Group>
        );
    }
}
