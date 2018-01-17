
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'; 
//Style
import 'semantic-ui-css/semantic.min.css';

//Component
import App from './Interface/Ui/App';


ReactDOM.render(
<Router>
    <App />
</Router>
, document.getElementById('content'));
