import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import HomeScreen from "./src/HomeScreen";

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://eu1.prisma.sh/cristian-cano/database/dev',
    headers: {
      authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkYXRhYmFzZUBkZXYiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTcwMDE0NDQ2LCJleHAiOjE1NzA2MTkyNDZ9.w0kehsJRG7azW5SNytwI9evWr3M12Lkmt0KiS0l_5NI"
    }
  }),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomeScreen/>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
