import React from 'react';
import ReactDOM from 'react-dom';
import {Button , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';



export default class QuestionBoolType extends React.Component {
    constructor(props) {
      super(props);
    }

    state ={
        answered: false,
    }
    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    defaultProps = {
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
     
    // component render method
    render() {
        return (
            this.state.answered?
                this.state.answer?
                <Segment.Group raised className='questionIntItem'>
                    <Message attached='top' info header='Is the following statement true?'/>
                    <Segment attached='bottom' inverted color='green'>
                        <p>&nbsp;&nbsp;&nbsp;{this.props.question}</p>
                    </Segment>
                </Segment.Group>
                :
                <Segment.Group raised className='questionIntItem'>
                    <Message attached='top' info header='Is the following statement true?'/>
                    <Segment attached='bottom' inverted color='red'>
                        <p>&nbsp;&nbsp;&nbsp;{this.props.question}</p>
                    </Segment>
                </Segment.Group>

            :
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header='Is the following statement true?'/>
                <Segment attached='bottom'>
                    <p>&nbsp;&nbsp;&nbsp;{this.props.question}</p>
                    <Button.Group>
                        <Button positive onClick={this._onTrue}>True</Button>
                        <Button.Or />
                        <Button negative onClick={this._onFalse}>False</Button>
                    </Button.Group>
                </Segment>
            </Segment.Group>
        );
    }
}
