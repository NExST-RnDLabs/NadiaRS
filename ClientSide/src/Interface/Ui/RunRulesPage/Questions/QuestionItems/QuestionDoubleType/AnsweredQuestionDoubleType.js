import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Icon , Segment, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';



export default class AnsweredQuestionDoubleType extends React.Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }


    

    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,    

    }

    componentWillMount=()=>{
        this.setState({question: this.props.question, answer: this.props.answer});
    }
   
    _onEditAnswer=()=>{
        if(this.props.onEditAnswer){
            this.props.onEditAnswer(this.state.question);
        }
    }
     
    // component render method
    render() {
        let question = this.props.question+'?';
        return (
            <Segment.Group raised className='questionDoubleItem'>
                <Message attached='top' info header= {question}/>
                <Segment attached='bottom' inverted color='green'>
                    <Message className='answered-doubleType-bottom-message' attached='bottom' color='olive'>
                        <Header floated='right' size = 'large'>{this.state.answer}</Header>
                    </Message>
                    <Button color='yellow' floated='right' onClick={this._onEditAnswer}>Edit</Button>
                </Segment>   
            </Segment.Group>
        );
    }
}
