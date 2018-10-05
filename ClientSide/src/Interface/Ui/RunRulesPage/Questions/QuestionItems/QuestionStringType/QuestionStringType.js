import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment, Message, Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';


//style
import './QuestionStringType.scss';

export default class QuestionStringType extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            answered: false,
            inputValue:'',
        }
    }


    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    _onChange=(event, newValue)=>{
        this.setState({inputValue: newValue.value});
    }

    _onSave=()=>{
        if(this.props.onSave){
            this.props.onSave(this.props.question, {answer:this.state.inputValue, type:'string'});
            this.setState({answered: !this.state.answered});

        }
    }

    _onCancel=()=>{
        this.setState({inputValue:{}, answered: !this.state.answered});
    }

    _onEditAnswer=()=>{
        debugger;
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.state.question);
        }
    }
     
    // component render method
    render() {
        let question = this.props.question+'?';
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                {this.state.answered?
                    <Message className='stringType-bottom-message' attached='bottom' color='olive'>
                        <Header floated='right' size = 'large'>{this.state.inputValue}</Header>
                        <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>                
                    </Message>
                    :
                    <Segment attached='bottom'>
                        <Input iconPosition='left' size='large' floated='right' placeholder='Please enter alphabetical characters' value={this.state.inputValue} onChange={this._onChange}>
                            <Icon name='sort alphabet ascending' />
                            <input />
                        </Input>
                        <Button.Group size='large' floated='right' className='queston-string-type-buttons'>
                            <Button positive onClick={this._onSave}>Save</Button>
                            <Button.Or />
                            <Button negative onClick={this._onCancel}>Cancel</Button>
                        </Button.Group>
                    </Segment>}
                
            </Segment.Group>
        );
    }
}
