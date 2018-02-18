import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import {Form, Icon , Button, Segment , Header , Divider} from 'semantic-ui-react';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/chrome';

//application
import Nadia from 'src/Application/Nadia';

//style
// import './ViewRulesPage.scss';


export default class RuleEditorPage extends React.Component {
    constructor(props) {
      super(props);
      
    }

    componentDidMount = () => {

      this.setState({ruleName: this.props.ruleName});
      
      Nadia.query.findRuleTextByName(this.props.ruleName,(res)=>{
        if(res){
          this.setState({ruleText : res.ruleText});
        }
      })
    }

    // componentWillReceiveProps=(nextProps)=>{
    //   this.setState({ruleName: nextProps.ruleName})
    // }

    // initialise component state
    state = {
      ruleName:'',
      ruleText:'',
      edit: false,
      save: false,
    }

    // prop types and default values
    static propTypes = {
      ruleName: PropTypes.string,
    }
   

    _onChange=(newValue)=>{
      this.setState({ruleText: newValue});
    }
   
    _onEdit=()=>{
      this.setState({edit:!this.state.edit});
    }

    

    _onSave=()=>{
      // this.setState({save: true});
      Nadia.command.saveRuleText(this.state.ruleName, this.state.ruleText);
      this.setState({edit:!this.state.edit});

    }

    _onCancel=()=>{
      this.setState({edit:!this.state.edit});
    }

    _createEditor=()=>{
      return(
        this.state.edit?
          <AceEditor
              mode='javascript'
              theme="chrome"
              onChange={this._onChange}
              name="UNIQUE_ID_OF_DIV"
              readOnly = {false}
              width="100%"
              fontSize={18}
              value={this.state.ruleText}
              editorProps={{
                  $blockScrolling: true
              }}
              onLoad={(editor) => {
                editor.focus();
                // editor.getSession().setValue(this.state.ruleText);
                editor.getSession().setUseWrapMode(true);
              }}
          />
          :
          <AceEditor
              mode='javascript'
              theme="chrome"
              name="UNIQUE_ID_OF_DIV"
              readOnly = {true}
              width="100%"
              fontSize={18}
              value={this.state.ruleText}
              editorProps={{
                  $blockScrolling: true
              }}
              onLoad={(editor) => {
                editor.focus();
                editor.getSession().setUseWrapMode(true);
              }}
          />
      );
    }
    _createButtonGroup=()=>{
      return(
        this.state.edit?
          this.state.save?
            <Form.Group widths='equal' className='buttonField'>
              <Button negative loading floated='right'/>
              <Button positive loading floated='right'/>
              <Button loading floated='right'/>
            </Form.Group>
            :
            <Form.Group widths='equal' className='buttonField'>
              <Button floated='right' onClick={this._onCancel}>
                <Icon name='cancel'/>
                Cancel
              </Button>
              <Button floated='right' color='blue' onClick={this._onSave}>
                <Icon name='save'/>
                Save
              </Button>
              <Button negative floated='right' onClick={this._onAdd}>
                <Icon corner name='undo' />
                Revert
              </Button>                
            </Form.Group>
          :
          <Button positive floated='right' onClick= {this._onEdit}>
            <Icon name='edit'/>
            Edit 
          </Button>

      );
    }
    
    // component render method
    render() {
        return (
          <div>
            <Segment basic size='mini' className='runRuleSegment'>
              <Header as='h3'>
                <Icon circular inverted color='teal' name='database' size='tiny' />
                <Header.Content>
                  View Rule Set - {this.state.ruleName}
                </Header.Content>
              </Header>
              <Divider />
              {this._createButtonGroup()}
            </Segment>
            <Segment basic className= 'ruleEditor'>
                {this._createEditor()}
            </Segment>
          </div>
        );
    }
}
