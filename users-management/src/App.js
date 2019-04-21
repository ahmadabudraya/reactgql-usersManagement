import React, { Component,Fragment } from 'react';
import {Route,Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import './App.css';
import Users from './components/Users'
import AddUser from './components/AddUser';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import UserDetails from './components/UserDetails';

const client = new ApolloClient({
  uri:'http://127.0.0.1:8000/graphql',
  
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Fragment>
          
            
          
          <Header/>
            <Switch>
              <Route exact path="/" component={Users} />
              <Route path="/add-user" component={AddUser}/>
              <Route path="/users/:user_id" component={UserDetails}/>
            </Switch>
          
          
          <ToastContainer/>
        </Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
