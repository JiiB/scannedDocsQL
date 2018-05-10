import React, { Component } from "react";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Container from "./container";


const client = new ApolloClient({
  uri: 'http://192.168.1.128:4000/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        
        <Container />
      </ApolloProvider>
    );
  }
}

export default App;
