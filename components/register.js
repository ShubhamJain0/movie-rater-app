import { text } from '@fortawesome/fontawesome-svg-core';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

export default function Register(props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');



    const register = () =>{
        fetch('http://192.168.29.235:8000/api/createuser/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password, name: username})
        })

        .then(resp => resp.json())
        .then(() => props.navigation.navigate('Auth'))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        const token = await AsyncStorage.getItem('MR_TOKEN');
        if (token) props.navigation.navigate('MovieList');

    }



    return (
        
        <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput 
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput 
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize={'none'}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize={'none'}
            secureTextEntry={true}
        />

        <Button title="Register" onPress={() => register()} />
        <TouchableHighlight style={{alignItems: 'center', paddingTop: 15,}} onPress={() => props.navigation.navigate('Auth')}><Text>Already have an account? Click here to login</Text></TouchableHighlight>
  
        <StatusBar style="auto" />
        </View>
    );
}


Register.navigationOptions = screenProps => ({
    headerStyle: {
        backgroundColor: 'orange',
        
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },

  heading: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    padding: 10,
    fontSize: 20,
  },
  input: {
    fontSize: 18,
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    color: 'white',
  },
});
