import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Label} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Moment from 'moment';




export default class DateInputFields extends React.Component {
    constructor(props) {
      super(props);
    }


    // prop types 
    static propTypes = {
        dayIsDirty: PropTypes.bool.isRequired,
        monthIsDirty: PropTypes.bool.isRequired,
        yearIsDirty: PropTypes.bool.isRequired,
        dateInvalid: PropTypes.bool.isRequired,
        onDayChange: PropTypes.func.isRequired,
        onMonthChange: PropTypes.func.isRequired,
        onYearChange: PropTypes.func.isRequired,
    }

   
    _onDayChange=(dayNewValue)=>{
        if(this.props.onDayChange){
           this.props.onDayChange(dayNewValue);
        }
    }

    _onMonthChange=(monthNewValue)=>{
        if(this.props.onMonthChange){
            this.props.onMonthChange(monthNewValue);
         }
    }
   
    _onYearChange=(yearNewValue)=>{
        if(this.props.onYearChange){
            this.props.onYearChange(yearNewValue);
         }
    }
   
     
    // component render method
    render() {
        return (
                this.props.dateInvalid?
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Label size='small'>Day</Label>
                                <Form.Input error fluid value={this.props.dayInputValue} placeholder='DD' onChange={this._onDayChange}/>
                            </Form.Field>
                            /
                            <Form.Field>
                                <Label size='small'>Month</Label>
                                <Form.Input error fluid value={this.props.monthInputValue} placeholder='MM' onChange={this._onMonthChange}/>
                            </Form.Field>
                            /
                            <Form.Field>
                                <Label size='small'>Year</Label>
                                <Form.Input error fluid value={this.props.yearInputValue} placeholder='YYYY' onChange={this._onYearChange}/>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                    :
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Label size='small'>Day</Label>
                                <Form.Input fluid value={this.props.dayInputValue} placeholder='DD' onChange={this._onDayChange}/>
                            </Form.Field>
                            /
                            <Form.Field>
                                <Label size='small'>Month</Label>
                                <Form.Input fluid value={this.props.monthInputValue} placeholder='MM' onChange={this._onMonthChange}/>
                            </Form.Field>
                            /
                            <Form.Field>
                                <Label size='small'>Year</Label>
                                <Form.Input fluid value={this.props.yearInputValue} placeholder='YYYY' onChange={this._onYearChange}/>
                            </Form.Field>
                        </Form.Group>
                    </Form>
        );
    }
}
