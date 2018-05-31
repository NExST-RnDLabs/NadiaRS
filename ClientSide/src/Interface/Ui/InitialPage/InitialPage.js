import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import {Segment , Item , Icon , Card } from 'semantic-ui-react';

//style
import './InitialPage.scss'

//images
import NadiaLogo from 'src/Infrastructure/Images/NadiaLogo.png';


export default class InitialPage extends React.Component {
    constructor(props) {
      super(props);
    }
   
    // component render method
    render() {
        return (
            <div>
            <Segment className="basic center aligned">
                <Item className ='welcome'>
                    <Item.Content verticalAlign='middle'>
                    <Item.Header as='h2'><strong >Welcome to</strong></Item.Header>
                    </Item.Content>
                </Item>
                <Item className ='Nadia-Logo-Item'>
                <Item.Image size='tiny' src={NadiaLogo} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header as='h2'><span className='Nadia'>NADIA</span><strong>-R.S</strong></Item.Header>
                </Item.Content>
                </Item>
            </Segment>

            <Segment className="basic">
                <Card.Group className='cards group' stackable itemsPerRow ={3}>
                    <Card as= {Link} to='/RunRulesPage'>
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
                    <Card as= {Link} to='/ViewRulesPage'>
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
                    <Card as= {Link} to='/TextMessagePage'>
                        <Card.Content textAlign='center'>
                            <Card.Header>
                                Text Message Nadia
                            </Card.Header>
                            <Card.Description>
                                <Icon color='blue' name='comments' size='massive' />
                            </Card.Description>
                            <Card.Meta>
                                Dialogue
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
                    <Card as= {Link} to='/MachineLearningOnPage'>
                        <Card.Content textAlign='center'>
                            <Card.Header>
                                Thumbs UP!
                            </Card.Header>
                            <Card.Description>
                                <Icon color='blue' name='thumbs up' size='massive' />
                            </Card.Description>
                            <Card.Meta>
                                Demonstration
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                </Card.Group> 
            </Segment>
            </div>
        );
    }
}
