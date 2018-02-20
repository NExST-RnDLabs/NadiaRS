import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';



export default class Questionnaire extends React.Component {
    constructor(props) {
      super(props);

      state ={
          questionList:[],
      }
    }


    // prop types and default values
    static propTypes = {

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
                        <Input error iconPosition='left' placeholder='Please enter numerics' onChange={this._onChange}>
                            <Icon name='sort numeric ascending' />
                            <input />
                        </Input>
                        :
                        <Input iconPosition='left' placeholder='Please enter numerics' onChange={this._onChange}>
                            <Icon name='sort numeric ascending' />
                            <input />
                        </Input>}
                        <Button.Group>
                            <Button positive onClick={this._onSave}>Save</Button>
                            <Button.Or />
                            <Button negative onClick={this._onCancel}>Cancel</Button>
                        </Button.Group>
                </Segment>
            </Segment.Group>
        );
    }
}
