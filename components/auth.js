import { text } from '@fortawesome/fontawesome-svg-core';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

export default function Auth(props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const login = () =>{
        fetch('http://192.168.29.235:8000/auth/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: email, password: password})
        })

        .then(resp => resp.json())
        .then(jsonresp => {
            saveToken(jsonresp.token);
            props.navigation.navigate('MovieList');
        })
        .catch(error => console.log(error))
    }

    const saveToken = async (token) => {
        await AsyncStorage.setItem('MR_TOKEN', token)
    }

    useEffect(() => {
      props.navigation.addListener('didFocus', () => {
        getToken();
      })
    }, []);

    const getToken = async () => {
        const token = await AsyncStorage.getItem('MR_TOKEN');
        if (token) props.navigation.navigate('MovieList');

    }

    const regPage = () => {
      props.navigation.navigate('Register')
    }



    return (
        
        <View style={styles.container}>
        <Image source={require('../assets/icon.png')} 
        style={{width: '100%', height: 100}}
        resizeMode='contain'
        />
        <Text style={styles.heading}>Login</Text>
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

        <Button title="Login" onPress={() => login()} />
        <TouchableHighlight style={{alignItems: 'center', paddingTop: 15,}} onPress={() => regPage()}><Text>Don't have an account? Click here</Text></TouchableHighlight>
  
        <StatusBar style="auto" />
        </View>
    );
}

Auth.navigationOptions = screenProps => ({
  title: 'Login',
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
