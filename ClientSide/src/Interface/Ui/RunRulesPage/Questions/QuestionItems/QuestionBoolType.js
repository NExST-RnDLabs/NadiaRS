import React from 'react';
import ReactDOM from 'react-dom';
import {Button , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';



export default class QuestionBoolType extends React.Component {
    constructor(props) {
      super(props);
    }


    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    _onTrue=()=>{
        if(this.props.onSave){
            this.props.onSave(this.props.question, true);
        }
    }

    _onFalse=()=>{
        this.props.onSave(this.props.question, false);
    }
     
    // component render method
    render() {
        return (
            <Segment.Group raised className='questionIntItem'>
                <Segment color='orange'><strong>Is the following statement true?</strong></Segment>
                <Segment>
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
