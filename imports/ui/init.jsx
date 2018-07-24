import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import '/imports/api/grapher';

const App = props =>
    <BrowserRouter>
        <Router />
    </BrowserRouter>;

ReactDOM.render(
    <App />,
    document.getElementById("app")
);