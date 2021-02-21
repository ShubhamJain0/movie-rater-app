import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

export default function Profile(props) {
    
    const [details, setDetails] = useState([]);
    const [username, setUsername] = useState('');

    let token = null;

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        token = await AsyncStorage.getItem('MR_TOKEN');
        if (token) {
            getUser();
        } else {
            props.navigation.navigate('Auth')
        }
    }

    const getUser = () =>{
            fetch('http://192.168.29.235:8000/api/me/',{
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                    
                },
            })

            .then(resp => resp.json())
            .then(jsonresp => setDetails(jsonresp))
            .catch(error => console.log(error))
    }

    const updateUser = async () => {
        token = await AsyncStorage.getItem('MR_TOKEN');
        if (token && username) {
            fetch('http://192.168.29.235:8000/api/me/',{
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({name: username})
            })
    
            .then(resp => resp.json())
            .then(() => props.navigation.goBack())
            .catch(error => console.log(error))
        }else{
            Alert.alert("", 'Please fill in the required fields.');
        }

    }


    return (
        
        <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={{textAlign:'center', padding: 10}}>Name: {details.name}</Text>
        <Text style={{textAlign: 'center', padding: 10}}>Email: {details.email}</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput 
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
        />

        <Button title="Save" onPress={() => updateUser()} />
  
        <StatusBar style="auto" />
        </View>
    );
}


Profile.navigationOptions = screenProps => ({
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
  item: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
