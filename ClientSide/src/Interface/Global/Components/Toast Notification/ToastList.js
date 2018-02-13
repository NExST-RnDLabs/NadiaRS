// libs
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Clone from 'clone';

// infrastructure
import Bus from 'src/Infrastructure/Bus'

//component
import ToastItem from 'src/Interface/Global/Components/Toast Notification/ToastItem'

// styles
import './ToastList.scss';

export default class ToastList extends React.Component {

    constructor() {
        super();
        this.state = {
            toastList: [],
        };
    }
    // prop types and default values
    static propTypes = {
        top: PropTypes.bool,
        bottom: PropTypes.bool,
        center: PropTypes.bool,
        left: PropTypes.bool,
        right: PropTypes.bool,
        toast: PropTypes.object,
    };

    componentDidMount=()=> {
        Bus.subscribe('Toast', (Toast,data) => {
            let tempToastList = Clone(this.state.toastList);
            tempToastList.push(data);
            this.setState({toastList: tempToastList});

            setTimeout(()=>{let tempToastList = Clone(this.state.toastList);
                            tempToastList.shift();
                            this.setState({toastList: tempToastList});}
                        , 1000000) 
        })
    }

    componentWillUnmount=()=> {
        Bus.unregister('Toast');
    }
 
    _onClose=(selectedIndex)=>{
        this.setState({toastList: this.state.toastList.filter((item, index)=>{if(index != selectedIndex){return(item)};})});
    }
    // component render method
    render() {
        let ulClasses = ClassNames({
            top: this.props.top
        }, {
            bottom: this.props.bottom
        }, {
            center: this.props.center
        }, {
            left: this.props.left
        }, {right: this.props.right})
        if (this.state.toastList.length != 0) {
            return (
                <ul className={'toast-container ' + ulClasses}>
                    {this
                        .state
                        .toastList
                        .map((item, index) => {
                            return (<ToastItem 
                                        key={index} 
                                        index={index} 
                                        status={item.status} 
                                        text={item.text}
                                        onClose={this._onClose}
                                    />)
                        })
}
                </ul>
            );
        } else {
            return (null);
        }

    }
}
