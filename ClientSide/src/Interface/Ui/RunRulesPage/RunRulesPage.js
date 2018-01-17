import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import {Icon , Card , Segment, Item , Image} from 'semantic-ui-react';

import NadiaLogo from 'src/Infrastructure/Images/NadiaLogo.png';

import '../App.scss'

export default class App extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {

    }


    // initialise component state
    state = {

    }

    // prop types and default values
    static propTypes = {
    }

    static defaultProps = {

    }

    // private methods
    _onClick = () => {


    }
    
    _createdCards=()=>{
        
      return(
      <Card.Group className='cards group' stackable itemsPerRow ={3}>
        <Card as= {Link} to='/'>
          <Card.Content textAlign='center'>
            <Card.Header>
              Run Rules
            </Card.Header>
            <Card.Description>
              <Icon color='blue' name='cogs' size='massive' />
            </Card.Description>
            <Card.Meta>
              Assessment
            </Card.Meta>
          </Card.Content>
        </Card>
        <Card as= {Link} to='/'>
          <Card.Content textAlign='center'>
            <Card.Header>
              View Rule Sets
            </Card.Header>
            <Card.Description>
              <Icon color='blue' name='database' size='massive' />
            </Card.Description>
            <Card.Meta>
              Management
            </Card.Meta>
          </Card.Content>
        </Card>
        <Card as= {Link} to='/'>
          <Card.Content textAlign='center'>
            <Card.Header>
              Learn Nadia
            </Card.Header>
            <Card.Description>
              <Icon color='blue' name='student' size='massive' />
            </Card.Description>
            <Card.Meta>
              Assistance
            </Card.Meta>
          </Card.Content>
        </Card>
        <Card as= {Link} to='/'>
          <Card.Content textAlign='center'>
            <Card.Header>
              Nadia Demo
            </Card.Header>
            <Card.Description>
              <Icon color='blue' name='browser' size='massive' />
            </Card.Description>
            <Card.Meta>
              Demonstration
            </Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
     );
    }

    // component render method
    render() {
      let component = this;
        return (
          <div>
            <Segment className="basic center aligned">
              <Item className ='welcome'>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='h2'><strong >this is run rules page</strong></Item.Header>
                  </Item.Content>
              </Item>
              <Item className ='Nadia-Logo-Item'>
                <Item.Image size='tiny' src={NadiaLogo} />
                <Item.Content verticalAlign='middle'>
                  <Item.Header as='h2'><strong className='Nadia'>Nadia</strong><strong>-R.S</strong></Item.Header>
                </Item.Content>
              </Item>
            </Segment>

            <Segment className="basic">
              {component._createdCards()}
            </Segment>
          </div>
        );
    }
}
