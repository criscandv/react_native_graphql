import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks'

const GET_DOGS = gql`
    query getDocs {
      dogs {
        name
        type
      }
    }
`;

const CREATE_DOG = gql`
  mutation addDog($type: String!, $name: String!){
      createDog(data: {type: $type, name: $name}){
          id
          name
      }
  }
`;

const DogComponent = () => {
    const { loading, error, data } = useQuery(GET_DOGS);
    if(error) { return <Text>{ error }</Text> }
    if(loading){ return <Text>Loading...</Text> }

    return (
        <View>
            {data.dogs.map(dog => {
                return <Text key={dog.name}>{dog.name}</Text>;
            })}
        </View>
    );
}

export default function App() {
  const [creDo, { data }] = useMutation(CREATE_DOG, {
      refetchQueries: ["getDocs"]
  });
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);


  const registerDog = event => {
    event.preventDefault();
    creDo({ variables: {type: type, name: name}}).then(res => console.log(res)).catch(err => console.log(err))
  };

  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Dogs data:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setName(text)}
            value={name}
            placeholder="name"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setType(text)}
            value={type}
            placeholder="type"
          />
          <Button
            onPress={registerDog}
            title="Add dog"
          />
        </View>
        <Text style={styles.welcome}>Aquí están los canes perro:</Text>
        <DogComponent />

        <Text style={styles.welcome}>Traidos con gql:</Text>
      </View>
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


