import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';




export default class QuestionHashType extends React.Component {
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

    _onChange=(event, newValue)=>{
        
        let regEx = /^([-]?)([0-9a-f]{10,}$)(?!\\-)*/;
        if(!regEx.test(newValue))
        {
            this.setState({inputError: !this.state.inputError});
        }
        else
        {
            this.setState({inputValue: newValue, inputError: !this.state.inputError});
        }
    }

    _onSave=()=>{
        if(this.props.onSave){
            this.props.onSave(this.props.question, {answer:this.state.inputValue, type:'hash'});
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
                    <Segment attached='bottom' inverted color='green'>
                        <Input disabled iconPosition='left' placeholder='Please enter hashed values' value={this.state.inputValue}>
                            <Icon name='sort alphabet ascending' />
                            <input />
                        </Input>
                    </Segment>
                    :
                    <Segment attached='bottom'>
                        {this.state.inputError?
                            <div>
                                <Input error iconPosition='left' placeholder='Please enter hashed values' value={this.state.inputValue} onChange={this._onChange}>
                                    <Icon name='sort alphabet ascending' />
                                    <input />
                                </Input>
                                <Button.Group>
                                    <Button positive disabled>Save</Button>
                                    <Button.Or />
                                    <Button negative onClick={this._onCancel}>Cancel</Button>
                                </Button.Group>
                            </div>
                            :
                            <div>
                                <Input iconPosition='left' placeholder='Please enter hashed values' value={this.state.inputValue}  onChange={this._onChange}>
                                    <Icon name='sort alphabet ascending' />
                                    <input />
                                </Input>
                                <Button.Group>
                                    <Button positive onClick={this._onSave}>Save</Button>
                                    <Button.Or />
                                    <Button negative onClick={this._onCancel}>Cancel</Button>
                                </Button.Group>
                            </div>}
                    </Segment>
                }
            </Segment.Group>
        );
    }
}
