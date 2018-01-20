import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import {Sidebar, Segment, Button, Menu, Icon, Header} from 'semantic-ui-react';

// import NadiaLogo from 'src/Infrastructure/Images/NadiaLogo.png';


// import RunRulesPage from './RunRulesPage/RunRulesPage'

export default class MenuSideBarComponent extends React.Component {
    constructor(props) {
      super(props);
    }
  // initialise component state
  state = {
    visible: false,
    }

    componentWillReceiveProps=(nextProps)=>{
      this.setState({visible: nextProps.visible})
    }

   
    // component render method
    render() {
      let component = this;
        return (
            <Sidebar as={Menu} animation='slide out' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
              <Menu.Item name='Run Rules' as={Link} to='/RunRulesPage' onClick={this.props.onSelection}>
                <Icon name='cogs' />
                Run Rules
              </Menu.Item>
              <Menu.Item name='View Rule Sets' as={Link} to='/' onClick={this.props.onSelection}>
                <Icon name='database' />
                View Rule Sets
              </Menu.Item>
              <Menu.Item name='Learn Nadia' as={Link} to='/' onClick={this.props.onSelection}>
                <Icon name='student' />
                Learn Nadia
              </Menu.Item>
              <Menu.Item name='Nadia Demo' as={Link} to='/' onClick={this.props.onSelection}>
                <Icon name='browser' />
                Nadia Demo
              </Menu.Item>
            </Sidebar>
        );
    }
}
