import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';




export default class QuestionUuidType extends React.Component {
    constructor(props) {
      super(props);

      state = {
        answered: false,
      }
    }


    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    _onChange=(newValue)=>{
        
        let regEx = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/;
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
            this.props.onSave(this.props.question, this.state.inputValue);
            this.setState({answered: !this.state.answered});
        }
    }

    _onCancel=()=>{
        this.setState({inputValue:'', answered: !this.state.answered});
    }
     
    // component render method
    render() {
        this.state.answered?

        
    }
}
