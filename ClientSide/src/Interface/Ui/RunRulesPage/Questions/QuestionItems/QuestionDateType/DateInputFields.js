import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';





export default class DateInputFields extends React.Component {
    constructor(props) {
      super(props);
    }


    // prop types 
    static propTypes = {
        dayIsDirty: PropTypes.bool,
        monthIsDirty: PropTypes.bool,
        yearIsDirty: PropTypes.bool,
        dateInvalid: PropTypes.bool,
        onDayChange: PropTypes.func,
        onMonthChange: PropTypes.func,
        onYearChange: PropTypes.func,
        readOnly: PropTypes.bool,
    }

   componentWillReceiveProps=(newProps)=>{
       this.setState({
           dateInvalid: newProps.dateInvalid,
           dayInputValue: newProps.dayInputValue,
           monthInputValue: newProps.monthInputValue,
           yearInputValue: newProps.yearInputValue,
        });
   }
   componentWillMount=()=>{
       this.setState({dateInvalid: this.props.dateInvalid});
   }
    _onDayChange=(event, dayNewValue)=>{
        if(this.props.onDayChange){
           this.props.onDayChange(dayNewValue.value);
        }
    }

    _onMonthChange=(event, monthNewValue)=>{
        if(this.props.onMonthChange){
            this.props.onMonthChange(monthNewValue.value);
         }
    }
   
    _onYearChange=(event, yearNewValue)=>{
        if(this.props.onYearChange){
            this.props.onYearChange(yearNewValue.value);
         }
    }
   
     
    // component render method
    render() {
        return (
                this.props.readOnly?
                <Form className='dateField'>
                    <Form.Group >
                        <Form.Field width='6'>
                            <Label size='small'>Day</Label>
                            <Form.Input readOnly fluid size='large' value={this.props.dayInputValue} placeholder='DD' onChange={this._onDayChange}/>
                        </Form.Field>
                        <Header size = 'large'>/</Header>
                        <Form.Field width='6'>
                            <Label size='small'>Month</Label>
                            <Form.Input readOnly fluid size='large' value={this.props.monthInputValue} placeholder='MM' onChange={this._onMonthChange}/>
                        </Form.Field>
                        <Header size = 'large'>/</Header>
                        <Form.Field width='9'>
                            <Label size='small'>Year</Label>
                            <Form.Input readOnly fluid size='large' value={this.props.yearInputValue} placeholder='YYYY' onChange={this._onYearChange}/>
                        </Form.Field>
                    </Form.Group>
                </Form>
                :
                this.state.dateInvalid?
                    <Form className='dateField'>
                        <Form.Group >
                            <Form.Field width='6'>
                                <Label size='small'>Day</Label>
                                <Form.Input error fluid size='large' value={this.props.dayInputValue} placeholder='DD' onChange={this._onDayChange}/>
                            </Form.Field>
                            <Header size = 'large'>/</Header>
                            <Form.Field width='6'>
                                <Label size='small'>Month</Label>
                                <Form.Input error fluid size='large' value={this.props.monthInputValue} placeholder='MM' onChange={this._onMonthChange}/>
                            </Form.Field>
                            <Header size = 'large'>/</Header>
                            <Form.Field width='9'>
                                <Label size='small'>Year</Label>
                                <Form.Input error fluid size='large' value={this.props.yearInputValue} placeholder='YYYY' onChange={this._onYearChange}/>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                    :
                    <Form className='dateField'>
                        <Form.Group >
                            <Form.Field width='6'>
                                <Label size='small'>Day</Label>
                                <Form.Input fluid size='large' value={this.props.dayInputValue} placeholder='DD' onChange={this._onDayChange}/>
                            </Form.Field>
                            <Header size = 'large'>/</Header>
                            <Form.Field width='6'>
                                <Label size='small'>Month</Label>
                                <Form.Input fluid size='large' value={this.props.monthInputValue} placeholder='MM' onChange={this._onMonthChange}/>
                            </Form.Field>
                            <Header size = 'large'>/</Header>
                            <Form.Field width='9'>
                                <Label size='small'>Year</Label>
                                <Form.Input fluid size='large' value={this.props.yearInputValue} placeholder='YYYY' onChange={this._onYearChange}/>
                            </Form.Field>
                        </Form.Group>
                    </Form>
        );
    }
}
