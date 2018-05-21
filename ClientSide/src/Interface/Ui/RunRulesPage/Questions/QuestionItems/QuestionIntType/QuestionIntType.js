import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment, Message, Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';

//style
import './QuestionIntType.scss';

export default class QuestionIntType extends React.Component {
    constructor(props) {
      super(props);
    }


    state ={
        answered: false,
        inputValue: '',
    }

    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    _onChange=(event, newValue)=>{
        let regEx = /\d+(?!\w|\W)/;
        let temp = regEx.test(newValue.value);
        if(!regEx.test(newValue.value))
        {
            this.setState({inputError: true});
        }
        else
        {
            this.setState({inputValue: newValue.value, inputError: false});
        }
        
    }

    _onSave=()=>{
        if(this.props.onSave){
            this.props.onSave(this.props.question, {answer:this.state.inputValue, type:'integer'});
            this.setState({answered: !this.state.answered});
        }
    }

    _onCancel=()=>{
        this.setState({inputValue:{}, answered: !this.state.answered});
    }
     
    // component render method
    render() {
        let question = this.props.question+'?';
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                {this.state.answered?
                    <Message className='intType-bottom-message' attached='bottom' color='olive'>
                        <Header floated='right' size = 'large'>{this.state.inputValue}</Header>
                    </Message>
                    :
                    <Segment attached='bottom'>
                        {this.state.inputError?
                            <div>
                                <Input error iconPosition='left' size='large' placeholder='Please enter numerics' value={this.state.inputValue} onChange={this._onChange}>
                                    <Icon name='sort numeric ascending' />
                                    <input />
                                </Input>
                                <Button.Group size='large' className='question-int-type-buttons'>
                                    <Button positive disabled>Save</Button>
                                    <Button.Or />
                                    <Button negative onClick={this._onCancel}>Cancel</Button>
                                </Button.Group>
                            </div>
                            :
                            <div>
                                <Input iconPosition='left' size='large' placeholder='Please enter numerics' value={this.state.inputValue} onChange={this._onChange}>
                                    <Icon name='sort numeric ascending' />
                                    <input />
                                </Input>
                                <Button.Group size='large' className='question-int-type-buttons'>
                                    <Button positive onClick={this._onSave}>Save</Button>
                                    <Button.Or />
                                    <Button negative onClick={this._onCancel}>Cancel</Button>
                                </Button.Group>
                            </div>}
                    </Segment>}
            </Segment.Group>
        );
    }
}
