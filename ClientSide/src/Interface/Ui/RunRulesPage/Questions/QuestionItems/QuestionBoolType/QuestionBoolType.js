import React from 'react';
import ReactDOM from 'react-dom';
import {Button , Segment, Header, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';

//style
import './QuestionBoolType.scss'

export default class QuestionBoolType extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            answered: false,
        }
    }

    
    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    static defaultProps = {
        foo: "default"
      };
   
    _onTrue=()=>{
        if(this.props.onSave){
            this.props.onSave(this.props.question, {answer:true, type:'boolean'});
            this.setState({answered: true, answer: true});

        }
    }

    _onFalse=()=>{
        if(this.props.onSave){
            this.props.onSave(this.props.question, {answer:false, type:'boolean'});
            this.setState({answered: true, answer: false});
        }
    }

    _onEditAnswer=()=>{
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.props.question);
        }
    }
     
    // component render method
    render() {
        return (
            this.state.answered?
                this.state.answer?
                <Segment.Group raised className='answered-questionBoolItem'>
                    <Message attached='top' info header='Is the following statement true?'/>
                    <Segment attached='bottom' inverted color='green'>
                        <Header className = 'question' size = 'medium'>{this.props.question}</Header>
                        <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
                    </Segment>
                </Segment.Group>
                :
                <Segment.Group raised className='answered-questionBoolItem'>
                    <Message attached='top' info header='Is the following statement true?'/>
                    <Segment attached='bottom' inverted color='red'>
                        <Header className = 'question' size = 'medium'>{this.props.question}</Header>
                        <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
                    </Segment>
                </Segment.Group>

            :
            <Segment.Group raised className='questionBoolItem'>
                <Message attached='top' info header='Is the following statement true?'/>
                <Segment attached='bottom'>
                    <Header className = 'question' size = 'medium'>{this.props.question}</Header>
                    <Button.Group size = 'large' floated = 'right' className='question-bool-type-buttons'>
                        <Button positive onClick={this._onTrue}>True</Button>
                        <Button.Or />
                        <Button negative onClick={this._onFalse}>False</Button>
                    </Button.Group>
                </Segment>
            </Segment.Group>
        );
    }
}
