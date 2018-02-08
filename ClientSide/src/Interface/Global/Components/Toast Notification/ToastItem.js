// libs
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

//Component
import {Icon} from 'semantic-ui-react';
// styles
import './ToastItem.scss';

export default class ToastItem extends React.Component {

    constructor() {
        super();        
    }

   

    // prop types and default values
    static propTypes = {
        status: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onClose: PropTypes.func
    };

    _onClick = () => {
        if (this.props.onClose) {
            this
                .props
                .onClose(this.props.index);
        }
    }
    
    // component render method
    render() {
    
        let liClasses = ClassNames({
            success: this.props.status == 'success'
        }, {
            error: this.props.status == 'error'
        }, {
            info: this.props.status == 'info'
        }, {
            warning: this.props.status == 'warning'
        })

        let iconSelector;
        if (this.props.status == 'success') {
            iconSelector = <Icon name='check circle'/>;
        } else if (this.props.status == 'error') {
            iconSelector = <Icon name='hand paper'/>;
        } else if (this.props.status == 'info') {
            iconSelector = <Icon name='info circle'/>;
        } else if (this.props.status == 'warning') {
            iconSelector = <Icon name='warning circle'/>
        }

        return (
            <li className={'toast ' + liClasses}>
                {iconSelector}
                <p className='toast-body'>
                    {this.props.text}
                </p>
                <Icon name='remove' onClick={this._onClick}/>
            </li>
        );
    }
}
