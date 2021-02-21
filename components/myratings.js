import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function myRatings(props) {
    
    const [myratings, setMyratings] = useState([]);

    let token = null;

    useEffect(() => {
        getToken();
    }, []);


    const getToken = async () => {
        token = await AsyncStorage.getItem('MR_TOKEN');
        if (token) {
            getRatings();
        } else {
            props.navigation.navigate('Auth')
        }
    }



    const getRatings = () => {
            fetch('http://192.168.29.235:8000/api/ratings/',{
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(jsonresp => setMyratings(jsonresp))
            .catch(error => console.log(error))
    }


       
    return (
        
        <View style={styles.container}>
        <Text style={styles.heading}>Your Previous Ratings</Text>
        <FlatList 
            data={myratings}
            renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text>Movie: {item.movie_name}</Text>
                        <Text>Rating: {item.stars}</Text>
                    </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        <StatusBar style="auto" />
        </View>
    );
}


myRatings.navigationOptions = screenProps => ({
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
