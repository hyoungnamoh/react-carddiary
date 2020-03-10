import React, {useEffect, useState, memo, useCallback} from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route, Link, Switch} from 'react-router-dom';
import Customer from "./components/Customer";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";
import CustomerAdd from "./components/CustomerAdd";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Main from './pages/Main';
import SignUp from './pages/SignUp';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Main}/>
            <Switch>
                <Route path="/main/signUp" component={SignUp}/>
            </Switch>
        </BrowserRouter>
  );
};

export default App;
