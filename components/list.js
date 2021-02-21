import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieList(props) {
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState('true');

    let token = null;


    const getToken = async () => {
        token = await AsyncStorage.getItem('MR_TOKEN');
        if (token) {
            getMovies();
        } else {
            props.navigation.navigate('Auth')
        }
    }

    useEffect(() => {
        getToken();
    }, []);



    const getMovies = () => {
            fetch('http://192.168.29.235:8000/api/movies/',{
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(jsonresp => setMovies(jsonresp))
            .then(() => setLoading('false'))
            .catch(error => console.log(error))
    }


    const logout = () => {
        AsyncStorage.removeItem('MR_TOKEN');
        props.navigation.navigate('Auth');
    }


    const movieClicked = (item) => {
        props.navigation.navigate('Details', {movie: item, title: item.title})

    }


       
    if(loading === 'true') return <Text style={styles.loading}>Loading...</Text>
    return (
        
        <View style={styles.container}>
        <Image source={require('../assets/icon.png')} 
        style={{width: '100%', height: 100}}
        resizeMode='contain'
        />
        <Text style={styles.heading}>Movies</Text>
        <FlatList 
            data={movies}
            renderItem={({item}) => (
                <TouchableHighlight onPress={() => movieClicked(item)}>
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                    </View>
                </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        <Button title="Profile" onPress={() => props.navigation.navigate('Profile')} />
        <Button title="logout" onPress={() => logout()}/>
        <StatusBar style="auto" />
        </View>
    );
}


MovieList.navigationOptions = screenProps => ({
    headerStyle: {
        backgroundColor: 'orange',
        
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerRight: () => 
            <Button title="MyRatings" onPress={() => screenProps.navigation.navigate('MyRatings')} />,
    
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

  item: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  loading: {
    textAlign: 'center',
    paddingTop: 100,
  },
});
