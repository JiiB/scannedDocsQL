import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Container from "./container";
import { SERVER_URL } from "./constants";

const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`
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
