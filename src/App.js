import React, { Component } from  "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "./global.css"
import firebase from "./firebase"

import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Register from "./components/Register"
import Home from "./components/Home"
import Header from "./components/Header"
import New from "./components/New"


export default class App extends Component{

  state = {
    firebaseInitialized: false
  }

  componentDidMount(){
    firebase.isInitialized().then(result => {
      this.setState({firebaseInitialized: result})
    })
  }

  render(){
    return this.state.firebaseInitialized != false ? (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard/new" component={New}/>
        </Switch>
      </BrowserRouter>
    ) : ( <h1>Carregando...</h1>)
  }
}
