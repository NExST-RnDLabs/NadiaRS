import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';




export default class QuestionStringType extends React.Component {
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
        
        this.setState({inputValue: newValue});
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
     
    // component render method
    render() {
        let question = this.props.question+'?';
        return (
            <Segment.Group raised className='questionIntItem'>
                <Message attached='top' info header= {question}/>
                {this.state.answered?
                    <Segment attached='bottom' inverted color='green'>
                        <Input iconPosition='left' placeholder='Please enter alphabetical characters' value={this.state.inputValue}>
                            <Icon name='sort alphabet ascending' />
                            <input />
                        </Input>
                    </Segment>
                        :
                    <Segment attached='bottom'>
                        <Input iconPosition='left' placeholder='Please enter alphabetical characters' value={this.state.inputValue} onChange={this._onChange}>
                            <Icon name='sort alphabet ascending' />
                            <input />
                        </Input>
                        <Button.Group>
                            <Button positive onClick={this._onSave}>Save</Button>
                            <Button.Or />
                            <Button negative onClick={this._onCancel}>Cancel</Button>
                        </Button.Group>
                    </Segment>}
                
            </Segment.Group>
        );
    }
}
