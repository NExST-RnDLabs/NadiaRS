import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import {Icon , Menu , Item } from 'semantic-ui-react';

//style
import './MenuTop.scss'

//images
import NadiaNanoLogo from 'src/Infrastructure/Images/NadiaNanoLogo.png';

//components

export default class MenuTop extends React.Component {
    constructor(props) {
      super(props);
    }

    _onClick=()=>{
        if(this.props.onClick){

            this.props.onClick();
        }
    }

    // component render method
    render() {
        return (
            <Menu className="fixed inverted large">
                <Item type="link" onClick={this._onClick}>
                    <Icon className="content" />
                </Item>
                <Item className='nadia-logo'>
                    <Item.Image size='mini' src={NadiaNanoLogo} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header><strong className='Nadia'>Nadia</strong><strong>-R.S</strong></Item.Header>
                    </Item.Content>
                </Item>
                <Item className="active" type="link" as={Link} to='/'>
                    <Icon className="home" /> Home
                </Item>
                <Item type="link">
                    <Icon className="mail"/> Messages
                </Item>
            </Menu>
        );
    }
}
