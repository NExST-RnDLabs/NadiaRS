import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';



export default class QuestionIntType extends React.Component {
    constructor(props) {
      super(props);
    }


    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    // _onChange=(e)={
    //     console.log(e.target);
        
        
    // }
    _onChange=(newValue)=>{
        let regEx = /\d/;
        if(regEx.test(newValue))
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
            this.props.onSave(this.props.question, this.state.inputValue);
        }
    }

    _onCancel=()=>{
        this.setState({inputValue:''});
    }
     
    // component render method
    render() {
        return (
            <Segment.Group raised className='questionIntItem'>
                <Segment color='orange'><strong>{this.props.question+' ?'}</strong></Segment>
                <Segment>
                    {this.state.inputError?
                        <Input error iconPosition='left' placeholder='enter numerics' onChange={this._onChange}>
                            <Icon name='sort numeric ascending' />
                            <input />
                        </Input>
                        :
                        <Input iconPosition='left' placeholder='enter numerics' onChange={this._onChange}>
                            <Icon name='sort numeric ascending' />
                            <input />
                        </Input>}
                        <Button.Group>
                            <Button onClick={this._onSave}>Save</Button>
                            <Button.Or />
                            <Button onClick={this._onCancel}>Cancel</Button>
                        </Button.Group>
                </Segment>
            </Segment.Group>
        );
    }
}
