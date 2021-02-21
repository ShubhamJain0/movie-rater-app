import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { StackRouter } from 'react-navigation';
import MovieList from './list';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieDetails(props) {

    const clickedMovie = props.navigation.getParam('movie', null)

    const [highlight, setHighlight] = useState(0);

    let token = null;


    const getToken = async () => {
        token = await AsyncStorage.getItem('MR_TOKEN');
        if (token) {
            rateClicked();
        } else {
            alert('Please login to rate!')
        }
    }

    const rateClicked = () => {
        if(highlight > 0 && highlight < 6){
            fetch(`http://192.168.29.235:8000/api/movies/${clickedMovie.id}/rate_movie/`,{
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ stars: highlight })
            })
            .then(resp => resp.json())
            .then(jsonresp => {
                setHighlight(0);
                Alert.alert(jsonresp.message);
            })
            .then(() => getDetails())
            .catch(error => console.log(error));
        }
    }

    const getDetails = () => {
        fetch(`http://192.168.29.235:8000/api/movies/${clickedMovie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then( resp => resp.json())
        .then( jsonresp => props.navigation.navigate('Details', {movie: jsonresp}))
        .catch( error => alert(error))
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={clickedMovie.avg_ratings > 0 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={clickedMovie.avg_ratings > 1 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={clickedMovie.avg_ratings > 2 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={clickedMovie.avg_ratings > 3 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={clickedMovie.avg_ratings > 4 ? styles.orange : styles.white} icon={faStar} />
                <Text>({clickedMovie.no_of_ratings})</Text>
            </View>
            <Text style={styles.description}>Description - {clickedMovie.description}</Text>
            
            <View style={{borderBottomColor: 'black', borderBottomWidth: 2, marginTop: 50, marginBottom: 50}} />
            <Text style={styles.description}>Rate it !</Text>
            <View style={styles.starContainer2}>
                <FontAwesomeIcon style={highlight > 0 ? styles.purple : styles.white} icon={faStar} size={30} onPress={() => setHighlight(1)}/>
                <FontAwesomeIcon style={highlight > 1 ? styles.purple : styles.white} icon={faStar} size={30} onPress={() => setHighlight(2)}/>
                <FontAwesomeIcon style={highlight > 2 ? styles.purple : styles.white} icon={faStar} size={30} onPress={() => setHighlight(3)}/>
                <FontAwesomeIcon style={highlight > 3 ? styles.purple : styles.white} icon={faStar} size={30} onPress={() => setHighlight(4)}/>
                <FontAwesomeIcon style={highlight > 4 ? styles.purple : styles.white} icon={faStar} size={30} onPress={() => setHighlight(5)}/>
            </View>
            <Button title="submit" onPress={() => getToken()}/>
        <StatusBar style="auto" />
        </View>
    );
}

MovieDetails.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
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
  },
  description: {
    textAlign: 'center',
  },
  starContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
      marginBottom: 20,
  },
  starContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  orange: {
      color: 'orange',
  },
  white: {
      color: 'black',
  },
  purple: {
    color: 'purple'
  },    
  
});
